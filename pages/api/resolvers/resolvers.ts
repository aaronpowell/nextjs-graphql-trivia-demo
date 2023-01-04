import { SqlQuerySpec } from "@azure/cosmos";
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

      if (language !== "en") {
        const tq = await dataSources.translator.translateQuestion(
          question,
          language
        );
        return tq;
      }

      return question;
    },
  },
  Question: {
    //overwrite field resolver
    answers(question: any) {
      return arrayRandomiser(
        question.incorrect_answers.concat(question.correct_answer)
      );
    },
  },

  Mutation: {
    async validateAnswer(
      _: unknown,
      {
        questionId,
        answer,
        language,
      }: { questionId: string; answer: string; language: string },
      { dataSources }: ApolloContext
    ) {
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

      // translate
      return {
        correct: question.correct_answer === answer,
        questionId,
        correctAnswer: question.correct_answer,
      };
    },
  },
};
