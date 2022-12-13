import { SqlQuerySpec } from "@azure/cosmos";
import { QuestionDbModel } from "../datasources/QuestionDbModel";
import type { ApolloContext } from "../context/ApolloContext";

const arrayRandomiser = <T>(array: T[]) =>
  array.sort(() => 0.5 - Math.random());

export const resolvers = {
  Query: {
    async question(
      _: unknown,
      {
        lastQuestionId,
        upperLimit,
        language,
      }: { lastQuestionId: string; upperLimit: number; language: string },
      { dataSources }: ApolloContext
    ) {
      const question = await dataSources.questions.getQuestion(
        lastQuestionId,
        Math.floor(Math.random() * upperLimit)
      );

      if (language === "en") return question;

      const translatedQuestion = await dataSources.translator.translateQuestion(
        question,
        language
      );

      console.log(`${language} question ${JSON.stringify(translatedQuestion)}`);

      return translatedQuestion;
    },
    async answers(
      _: unknown,
      question: QuestionDbModel,
      language: string,
      { dataSources }: ApolloContext
    ) {
      const originalAnswers: string[] = arrayRandomiser(
        question.incorrect_answers.concat(question.correct_answer)
      );

      if (language === "en") return originalAnswers;

      const translatedAnswers = await dataSources.translator.translateAnswers(
        originalAnswers,
        language
      );

      console.log(`${language} question ${JSON.stringify(translatedAnswers)}`);
      return translatedAnswers;
    },
  },
  // Return all answer for the question in the correct language

  // Validate answer - demonstrates changing data which is separated
  // from the Next.js application's state
  Mutation: {
    async validateAnswer(
      _: unknown,
      { questionId, answer, language }: { questionId: string; answer: string,  language: string },
      { dataSources }: ApolloContext
    ) {
      //
      const question = await dataSources.questions.findOneById(questionId);

      if (!question) {
        throw new Error(`Question ${questionId} is invalid`);
      }

      if (language === "en") {
        return {
          correct: question.correct_answer === answer,
          questionId,
          correctAnswer: question.correct_answer,
        };
      }
      const translatedCorrectAnswer =
        await dataSources.translator.translateCorrectAnswer(
          question.correct_answer,
          language
        );
      return {
        correct: translatedCorrectAnswer === answer,
        questionId,
        correctAnswer: translatedCorrectAnswer,
      };
    },
  },
};
