import { config } from "dotenv-flow";
import { CosmosClient, BulkOperationType } from "@azure/cosmos";
import { readFile } from "fs/promises"

config();

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

export async function getContainer() {
  await client.databases.createIfNotExists({ id: databaseId });

  const database = client.database(databaseId);

  await database.containers.createIfNotExists({ id: containerId, partitionKey: "/modelType" });
  const container = database.container(containerId);

  return container;
}


async function setupData() {
  const container = await getContainer();

  const questions = JSON.parse(await readFile("./trivia.json")).map(q => ({ operationType: BulkOperationType.Create, resourceBody: q }));

  try {
    const batchSize = 10;
    
    const begin = i * batchSize;
    const end = begin + batchSize;
    
    for (let i = 0; i < batchSize; i++) {
      const questionsBatch = questions.slice(begin, end);
      await container.items.bulk(questionsBatch);
    }

    console.log("All questions imported");
  }
  catch (e) {
    console.error(e);
  }
}

setupData();