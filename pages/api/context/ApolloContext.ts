import { QuestionDataSource } from "../datasources/QuestionDataSource";
import { TranslatorDataSource } from "../datasources/TranslatorDataSource";

export type ApolloContext = {
  dataSources: {
    questions: QuestionDataSource;
    translator: TranslatorDataSource;
  };
};
