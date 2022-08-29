import { QuestionDataSource } from "./QuestionDataSource";
import { TranslatorDataSource } from "./TranslatorDataSource";

export type ApolloContext = {
  dataSources: {
    questions: QuestionDataSource;
    translator: TranslatorDataSource
  };
};
