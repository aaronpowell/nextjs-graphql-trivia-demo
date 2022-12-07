import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT || "https://diberry-cosmosdb-nosql.documents.azure.com:443/" || "https://localhost:8081";
const key =
  process.env.COSMOS_KEY ||
  "m9XZd9qvF2BJKFcTCXYIz6NEcKCLJsMAHCZ8S1agel38oZzwJPvHBbrjnOuONaC3ekQ8TKtzYH6fACDbfn3kVw==";
const databaseId = process.env.COSMOS_DATABASE_ID || "trivia";
const containerId = process.env.COSMOS_CONTAINER_ID || "questions";
const client = new CosmosClient({
  endpoint,
  key,
});
const database = client.database(databaseId);
export const container = database.container(containerId);
