import {
  TranslatorTextClient,
  TranslatorTextModels,
} from "@azure/cognitiveservices-translatortext";
import { DataSource } from "apollo-datasource";
import {
  getTranslatorClient,
  getTranslation,
} from "../../../azure/azureTranslatorText";
import type { ApolloContext } from "../context/ApolloContext";
import type { QuestionDbModel } from "./QuestionDbModel";

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
  ):Promise<QuestionDbModel> {
    try {

      if(toLanguage===fromLanguage) return question;

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

      // return original if wasn't translated
      if(!translationResults || translationResults.length===0) return question;

      console.log(`translation results = ${JSON.stringify(translationResults)}`);

      // Get Answers
      // @ts-ignore
      const incorrectAnswers: string[] = translationResults
        .slice(2, translationResults.length)
        .map(
          (translatedObj: TranslatorTextModels.TranslateResultAllItem) =>{
            if(translatedObj?.translations){
              return translatedObj?.translations[0].text;
            }
          });

      const translatedQuestion = {
        ...question,
        question: translationResults![0].translations![0].text as string,
        correct_answer: translationResults![1].translations![0].text as string,
        incorrect_answers: incorrectAnswers
      };

      console.log(`returned question ${JSON.stringify(translatedQuestion)}`);

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

      if(toLanguage===fromLanguage) return answers;

      const translationResults = await getTranslation(
        this.#client,
        toLanguage,
        fromLanguage,
        answers
      );

      // return original if wasn't translated
      if(!translationResults || translationResults.length===0) return answers;

      console.log(`translation results = ${JSON.stringify(translationResults)}`);

      // Get translated values out of returned object
      // @ts-ignore
      const incorrectAnswers: string[] = translationResults
        .slice(2, translationResults.length)
        .map(
          (translatedObj: TranslatorTextModels.TranslateResultAllItem) =>{
            if(translatedObj?.translations){
              return translatedObj?.translations[0].text;
            }
          });

      console.log(`returned question ${JSON.stringify(incorrectAnswers)}`);

      return incorrectAnswers;
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
  
      if(toLanguage===fromLanguage) return correctAnswer;
  
      const translationResults = await getTranslation(
        this.#client,
        toLanguage,
        fromLanguage,
        [correctAnswer]
      );
      // return original if wasn't translated
        if(!translationResults || translationResults.length===0) return correctAnswer;

      // Get translated values out of returned object
      // @ts-ignore
      const translatedCorrectAnswer: string = translationResults[0].translations[0].text;
      console.log(`translatedCorrectAnswer (${toLanguage}) ${translatedCorrectAnswer}`);
  
      return translatedCorrectAnswer;
    } catch (e) {
      console.error(e);
      throw e;
    }
  } 
}

