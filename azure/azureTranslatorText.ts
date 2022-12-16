import { SECRETS } from "./secretsConfig";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import {
  TranslatorTextClient,
  TranslatorTextModels,
} from "@azure/cognitiveservices-translatortext";

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
) {
  // @ts-ignore
  const formattedItems = stringList.map((textItem) => {
    return { text: textItem };
  });

  return await client.translator.translate([toLanguage], formattedItems, {
    from: fromLanguage,
    // Set your region if you are not using the Global region for your resource
    // customHeaders: {
    //   "Ocp-Apim-Subscription-Region": "centralus",
    // },
  });
}
