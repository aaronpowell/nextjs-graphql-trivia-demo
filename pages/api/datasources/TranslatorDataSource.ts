import {
  TranslatorTextClient,
  TranslatorTextModels,
} from "@azure/cognitiveservices-translatortext";
import { DataSource } from "apollo-datasource";
import {
  getTranslatorClient,
  getTranslation,
  convertTranslationToStringArray
} from "../../../azure/azureTranslatorText";
import type { ApolloContext } from "../context/ApolloContext";
import type { QuestionDbModel } from "../../../models/QuestionDbModel";
import { createLROPollerFromPollState } from "@azure/ms-rest-azure-js";

export class TranslatorDataSource extends DataSource<ApolloContext> {
  #client: TranslatorTextClient;
  constructor() {
    super();
    this.#client = getTranslatorClient();
  }

  public async translateQuestion(
    question: QuestionDbModel,
    toLanguage: string,
    fromLanguage: string = "en"
  ): Promise<QuestionDbModel> {
    try {
      if (toLanguage === fromLanguage) return question;

      // Translate the question, correct answer, and all incorrect answers
      // Sent to translation service as an array for bulk translation
      const textToTranslate = [
        question.question,
        question.correct_answer,
        ...question.incorrect_answers,
      ];

      const translationResults = await getTranslation(
        this.#client,
        toLanguage,
        fromLanguage,
        textToTranslate
      );

      // simplify to translated text array
      const translatedList =
        convertTranslationToStringArray(translationResults);

      const translatedQuestion = {
        ...question,
        question: translatedList[0],
        correct_answer: translatedList[1],
        incorrect_answers: translatedList.slice(2),
      };

      return translatedQuestion;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  public async translateAnswers(
    answers: string[], // maintain order, correct answer is last item
    toLanguage: string,
    fromLanguage: string = "en"
  ) {
    try {
      if (toLanguage === fromLanguage) return answers;

      const translationResults = await getTranslation(
        this.#client,
        toLanguage,
        fromLanguage,
        answers
      );

      const translatedList =
        convertTranslationToStringArray(translationResults);

      return translatedList;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async translateCorrectAnswer(
    correctAnswer: string,
    toLanguage: string,
    fromLanguage: string = "en"
  ) {
    try {
      if (toLanguage === fromLanguage) return correctAnswer;

      const translationResults = await getTranslation(
        this.#client,
        toLanguage,
        fromLanguage,
        [correctAnswer]
      );

      const translatedList =
        convertTranslationToStringArray(translationResults);

      return translatedList;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
