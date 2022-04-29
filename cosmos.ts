import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT || "https://localhost:8081";
const key =
  process.env.COSMOS_KEY ||
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
const databaseId = process.env.COSMOS_DATABASE_ID || "graphql";
const containerId = process.env.COSMOS_CONTAINER_ID || "graphql";
const client = new CosmosClient({
  endpoint,
  key,
});
const database = client.database(databaseId);
export const container = database.container(containerId);
