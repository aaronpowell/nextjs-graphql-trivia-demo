"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRETS = void 0;
var dotenv_flow_1 = require("dotenv-flow");
(0, dotenv_flow_1.config)();
// Export App Config
exports.SECRETS = {
    NODE_ENV: process.env.NODE_ENV,
    AZURE_COSMOSDB_ENDPOINT: process.env.AZURE_COSMOSDB_ENDPOINT || "",
    AZURE_COSMOSDB_KEY: process.env.AZURE_COSMOSDB_KEY || "",
    AZURE_COSMOSDB_DATABASE_NAME: process.env.AZURE_COSMOSDB_DATABASE_ID || "",
    AZURE_COSMOSDB_CONTAINER_NAME: process.env.AZURE_COSMOSDB_CONTAINER_ID || "",
    AZURE_TRANSLATOR_KEY: process.env.AZURE_TRANSLATOR_KEY || "",
    AZURE_TRANSLATOR_ENDPOINT: process.env.AZURE_TRANSLATOR_ENDPOINT || ""
};
if (exports.SECRETS.NODE_ENV.toLowerCase() === 'development') {
    console.log(exports.SECRETS);
}
