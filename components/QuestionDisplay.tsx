import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { QuestionModel } from "../models/QuestionModel";

export const QuestionDisplay: NextPage<{
  question: QuestionModel;
  setAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  wasCorrect: boolean | null;
  currentQuestion: number;
  totalQuestions: number;
}> = ({
  question,
  setAnswer,
  selectedAnswer,
  correctAnswer,
  wasCorrect,
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <>
      <p>
        {currentQuestion} of {totalQuestions}
      </p>
      <p
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></p>
      {correctAnswer && (
        <p className={styles.description}>
          {wasCorrect === null ? null : wasCorrect ? (
            <span>✅ Correct</span>
          ) : (
            <>
              <span>❌</span>
              The correct answer was:{" "}
              <span dangerouslySetInnerHTML={{ __html: correctAnswer }}></span>
            </>
          )}
        </p>
      )}
      <div className={styles.grid}>
        {question.answers.map((answer) => (
          <a
            onClick={() => setAnswer(answer)}
            className={
              answer === selectedAnswer ? styles["card-selected"] : styles.card
            }
            key={answer}
          >
            <h2 dangerouslySetInnerHTML={{ __html: answer }}></h2>
          </a>
        ))}
      </div>
    </>
  );
};
