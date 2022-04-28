import { SqlQuerySpec } from "@azure/cosmos";
import { container } from "../../cosmos";

const arrayRandomiser = <T>(array: T[]) =>
  array.sort(() => 0.5 - Math.random());

export const resolvers = {
  Query: {
    async question(
      _: unknown,
      {
        lastQuestionId,
        upperLimit,
      }: { lastQuestionId: string; upperLimit: number }
    ) {
      const random = Math.floor(Math.random() * upperLimit);
      const querySpec = {
        query:
          "SELECT * from c WHERE c.id <> @lastQuestionId OFFSET @offset LIMIT 1",
        parameters: [
          {
            name: "@lastQuestionId",
            value: lastQuestionId == undefined ? null : lastQuestionId,
          },
          {
            name: "@offset",
            value: random,
          },
        ],
      };

      const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

      return items[0];
    },
  },
  Question: {
    answers(question: any) {
      return arrayRandomiser(
        question.incorrect_answers.concat(question.correct_answer)
      );
    },
  },
  Mutation: {
    async validateAnswer(
      _: unknown,
      { questionId, answer }: { questionId: string; answer: string }
    ) {
      const querySpec: SqlQuerySpec = {
        query: "SELECT * from c WHERE c.id = @questionId",
        parameters: [
          {
            name: "@questionId",
            value: questionId,
          },
        ],
      };

      const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

      const question = items[0];

      return {
        correct: question.correct_answer === answer,
        questionId,
        correctAnswer: question.correct_answer,
      };
    },
  },
};
