import type { NextPage } from "next";
import {
  gql,
  NetworkStatus,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import styles from "../styles/Home.module.css";
import type { QuestionModel } from "../models/QuestionModel";
import { QuestionDisplay } from "./QuestionDisplay";
import type { ValidateAnswerModel } from "../models/ValidateAnswerModel";

const GET_QUESTION = gql`
  query getQuestion($lastQuestionId: ID, $upperLimit: Int! = 100) {
    question(lastQuestionId: $lastQuestionId, upperLimit: $upperLimit) {
      id
      question
      answers
    }
  }
`;

const SUBMIT_ANSWER = gql`
  mutation validateAnswer($questionId: ID!, $answer: String!) {
    validateAnswer(questionId: $questionId, answer: $answer) {
      correct
      correctAnswer
    }
  }
`;

export const Question: NextPage<{ count: number }> = ({ count }) => {
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
    variables: { lastQuestionId, upperLimit: count },
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

  if (!called) {
    return <p className={styles.description}>Getting the first question...</p>;
  }

  if (loading || networkStatus === NetworkStatus.refetch || !question) {
    return <Loading />;
  }

  return (
    <>
      <QuestionDisplay
        question={question}
        setAnswer={setAnswer}
        selectedAnswer={answer}
        correctAnswer={correctAnswer}
        wasCorrect={wasCorrect}
      />
      <p className={styles.description}>
        {!correctAnswer && (
          <button
            disabled={!answer || validateAnswerLoading}
            onClick={() =>
              validateAnswer({
                variables: {
                  questionId: question.id,
                  answer,
                },
              })
            }
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
            }}
          >
            Next question
          </button>
        )}
      </p>
    </>
  );
};
