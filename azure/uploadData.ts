import { CosmosClient, BulkOperationType } from "@azure/cosmos";
import { createNewDatabaseAndContainer } from "./azureCosmosdb";
import { readFile } from "fs/promises";
import { CONSTANTS } from "../shared/constants";

async function uploadData() {
  // Get container
  const container = await createNewDatabaseAndContainer();

  // Get data - ready for batch
  const dataFromFile = JSON.parse(await readFile("./trivia.json", "utf-8"));

  // Wrap each item with bulk upload information
  const questions = dataFromFile.map((q: Record<string, string | number>) => ({
    operationType: BulkOperationType.Create,
    resourceBody: q,
  }));

  try {
    // Batch data into container in 10 batches of 10 questions, total is 100
    const batchSize: number = CONSTANTS.MAX_ITEMS_BATCH_UPLOAD;

    for (let i = 0; i < batchSize; i++) {
      const begin = i * batchSize;
      const end = begin + batchSize;

      // Get subset of data
      const questionsBatch = questions.slice(begin, end);

      // Upload data to Cosmos DB NoSql container
      await container.items.bulk(questionsBatch);
    }
  } catch (e) {
    console.error(e);
  }
}

uploadData();
