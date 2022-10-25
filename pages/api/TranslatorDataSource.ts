import { TranslatorTextClient } from "@azure/cognitiveservices-translatortext";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { DataSource } from "apollo-datasource";
import type { ApolloContext } from "./ApolloContext";
import type { Question } from "./Question";

export class TranslatorDataSource extends DataSource<ApolloContext> {
  #client: TranslatorTextClient;
  constructor(key: string, endpoint: string) {
    super();
    const creds = new CognitiveServicesCredentials(key);
    this.#client = new TranslatorTextClient(creds, endpoint, {
      withCredentials: true,
    });
  }

  public async translateQuestion(question: Question, language: string) {
    try {
      const translated = await this.#client.translator.translate(
        [language],
        [
          {
            text: question.question,
          },
        ],
        {
          from: "en",
          customHeaders: {
            "Ocp-Apim-Subscription-Region": "centralus",
          },
        }
      );

      const tq = translated![0].translations![0].text;

      if (!tq) {
        return question;
      }

      return {
        ...question,
        question: tq,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
