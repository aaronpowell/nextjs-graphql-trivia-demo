import type { NextPage } from "next";
import { gql, NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import styles from "../styles/Home.module.css";
import type { QuestionModel } from "../models/QuestionModel";
import { QuestionDisplay } from "./QuestionDisplay";
import type { ValidateAnswerModel } from "../models/ValidateAnswerModel";
import { useRouter } from "next/router";
import { CONSTANTS } from "../shared/constants";

const GET_QUESTION = gql`
  query getQuestion(
    $lastQuestionId: ID
    $upperLimit: Int! = ${CONSTANTS.MAX_ITEMS_IN_DATABASE}
    $language: String!
  ) {
    question(
      lastQuestionId: $lastQuestionId
      upperLimit: $upperLimit
      language: $language
    ) {
      id
      question
      answers
    }
  }
`;

const SUBMIT_ANSWER = gql`
  mutation validateAnswer(
    $questionId: ID!
    $answer: String!
    $language: String!
  ) {
    validateAnswer(
      questionId: $questionId
      answer: $answer
      language: $language
    ) {
      correct
      correctAnswer
    }
  }
`;

export const Question: NextPage<{
  count: number;
  gameQuestionCount: number;
}> = ({ count, gameQuestionCount }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<string>("en");
  const [correctQuestionCount, setCorrectQuestionCount] = useState<number>(0);
  const [questionsAskedCount, setQuestionsAskedCount] = useState<number>(1);
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuestionModel | null>(null);
  const [
    validateAnswer,
    { loading: validateAnswerLoading, data: validateAnswerData },
  ] = useMutation<{ validateAnswer: ValidateAnswerModel }>(SUBMIT_ANSWER);

  const { called, loading, data, refetch, networkStatus } = useQuery<{
    question: QuestionModel;
  }>(GET_QUESTION, {
    variables: {
      lastQuestionId,
      upperLimit: count,
      language,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (validateAnswerData) {
      let res = validateAnswerData.validateAnswer;

      setWasCorrect(res.correct);
      setCorrectAnswer(res.correctAnswer);
    }
  }, [validateAnswerData]);

  useEffect(() => {
    if (data) {
      setQuestion(data.question);
    }
  }, [data]);

  useEffect(() => {
    if (router.locale) {
      setLanguage(router.locale);
    }
  }, [router.locale]);

  if (!called) {
    return <p className={styles.description}>Getting the first question...</p>;
  }

  if (loading || networkStatus === NetworkStatus.refetch || !question) {
    return <Loading />;
  }

  return (
    <>
      {questionsAskedCount < gameQuestionCount && (
        <>
          <QuestionDisplay
            question={question}
            setAnswer={setAnswer}
            selectedAnswer={answer}
            correctAnswer={correctAnswer}
            wasCorrect={wasCorrect}
            currentQuestion={questionsAskedCount}
            totalQuestions={gameQuestionCount}
          />
          <p className={styles.description}>
            {!correctAnswer && (
              <button
                disabled={!answer || validateAnswerLoading}
                onClick={() => {
                  validateAnswer({
                    variables: {
                      questionId: question.id,
                      answer,
                      language,
                    },
                  });
                }}
              >
                Submit answer
              </button>
            )}

            {correctAnswer && (
              <button
                key={question.id}
                onClick={async () => {
                  const { data: newData } = await refetch({
                    lastQuestionId: question.id,
                  });
                  setLastQuestionId(question.id);
                  setQuestion(newData.question);
                  setAnswer(null);
                  setCorrectAnswer(null);
                  setWasCorrect(null);
                  setQuestionsAskedCount(questionsAskedCount + 1);
                  setCorrectQuestionCount(correctQuestionCount + 1);
                }}
              >
                Next question
              </button>
            )}
          </p>
        </>
      )}
      {questionsAskedCount >= gameQuestionCount && (
        <div className={styles.endgamecard}>
          <div className={styles.description}>
            {correctQuestionCount} correct answers in {gameQuestionCount}{" "}
            questions
          </div>
          <button
            onClick={async () => {
              setQuestionsAskedCount(0);
              setCorrectQuestionCount(0);
            }}
          >
            New game
          </button>
        </div>
      )}
    </>
  );
};
