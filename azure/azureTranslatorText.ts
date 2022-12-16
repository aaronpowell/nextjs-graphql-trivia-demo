import { SECRETS } from "./secretsConfig";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import {
  TranslatorTextClient,
  TranslatorTextModels
} from "@azure/cognitiveservices-translatortext";

export function convertTranslationToStringArray(
  translationResults: TranslatorTextModels.TranslatorTranslateResponse,
  pickStart=0, 
  pickEnd=0,
): string[] {

  // return original if wasn't translated
  if (!translationResults || translationResults.length === 0) return [];

  if(pickStart===0){
      pickEnd=translationResults.length-1;
  }

  // Get translated values out of returned object
  const translatedList: string[] = translationResults.slice(
    pickStart,
    translationResults.length
  ).map(item => {
    if(item?.translations && 
      item?.translations.length>0 &&
      item?.translations?.[0].text){
        return item?.translations?.[0].text as string;
      }
      else {
        return "";
      }
  }) || [];

  return translatedList;
}

export function getTranslatorClient(): TranslatorTextClient {
  const key = SECRETS.AZURE_TRANSLATOR_KEY;
  const endpoint = SECRETS.AZURE_TRANSLATOR_ENDPOINT;

  if (!key) throw new Error("Translator key is missing");
  if (!endpoint) throw new Error("Translator endpoint is missing");

  const credentials = new CognitiveServicesCredentials(key);

  // Create SDK Client
  const client = new TranslatorTextClient(credentials, endpoint);

  return client;
}
export async function getTranslation(
  client: TranslatorTextClient,
  toLanguage: string,
  fromLanguage: string,
  stringList: string[]
): Promise<TranslatorTextModels.TranslatorTranslateResponse> {
  const formattedItems = stringList.map((textItem) => {
    return { text: textItem };
  });

  const list: TranslatorTextModels.TranslatorTranslateResponse = await client.translator.translate([toLanguage], formattedItems, {
    from: fromLanguage,
    // Set your region if you are not using the Global region for your resource
    // customHeaders: {
    //   "Ocp-Apim-Subscription-Region": "centralus",
    // },
  });

  return list
}
