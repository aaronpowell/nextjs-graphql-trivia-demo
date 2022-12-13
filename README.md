## Next.js trivia app

This is a Next.js trivia demo application that shows how you can use GraphQL in an API route to talk to [Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/?WT.mc_id=javascript-72896-aapowell) to make an application that can be deployed to [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps?WT.mc_id=javascript-72896-aapowell) using the [hybrid Next.js app support]().

## Trivia game 

Once you've uploaded the `trivia.json` data set of 100 questions to Cosmos DB, the game randomly selects 5 questions. You can complete the game in one of several languages. Translations is completed in time (not prerendered or pregenerated). When you complete the game, you score is displayed and you can start a new game. 

![Image of Trivia game]()

## Trivia data

A sample dataset, obtained from [OpenTrivia DB](https://opentdb.com/), exists in the `trivia.json` file. 

## Next.js and Static Web App Architecture

This app demonstrates a Next.js app with server-side rendering (SSR), integrated with GraphQL and Azure services (Translator and Cosmos DB). The architecture is built to show specific integrations and shouldn't be considered best practices.

Learn more: 

* [Next.js]()
* [Static Web Apps]()
* Cosmos DB NoSql
* Translator Text
* TypeScript


## Prerequisites

The following prerequisites should be created or imstalled.

- Docker for the devcontainer 
- Without Docker
    Node.js 14 (you can use `nvm use` against the .nvmrc in the repo)
    - [Cosmos DB emulator](https://docs.microsoft.com/azure/cosmos-db/local-emulator?tabs=ssl-netstd21&WT.mc_id=javascript-72896-aapowell) (or you can use your Azure Cosmos DB resource)
- Azure resources
    - Azure Cosmos DB No Sql resource
        - You need the resource name, and key in your `.env.local` file in the next step.
    - Azure Translator Text resource in Global region
        - You need the resource key in your `.env.local` file in the next step.

## Clone this repo

1. Clone this repo from GitHub. 
2. Run the dependencies:

    ```bash
    npm install
    ```

## Use devcontainer for local development

The simplest way to get started is using a [VSCode devcontainer](), which has been shipped as part of this repository. When VSCode opens it will prompt you to open in the container and that will install the relevant Node.js packages, as well as setting up the [cross-platform Cosmos DB emulator](https://docs.microsoft.com/azure/cosmos-db/linux-emulator?tabs=ssl-netstd21&WT.mc_id=javascript-72896-aapowell) (to learn more on how that is all setup, check out [this blog post](https://www.aaron-powell.com/posts/2021-05-27-local-dev-with-cosmosdb-and-devcontainers/)).



## Environment variables

You'll need to create the `.env.local` file using the `.env.sample` template (which contains the local emulator configuration settings).

```
NODE_ENV=development
AZURE_COSMOSDB_ENDPOINT=https://YOUR-COSMOS-DB-RESOURCE-NAME.documents.azure.com:443/
AZURE_COSMOSDB_KEY=mBTkY4BWkuXrsjITdXACDbaweEFw==
AZURE_COSMOSDB_DATABASE_ID=trivia
AZURE_COSMOSDB_CONTAINER_ID=questions
AZURE_COSMOSDB_API=NoSql
AZURE_TRANSLATOR_KEY=
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/
AZURE_TRANSLATOR_REGION=global
```

## Build the project

Both the upload script to upload the trivia questions into the database and the Next.js web app are TypeScript. You need to build to use them:

```bash
npm run upload:build
npm run build
```

## Upload data into Cosmos DB 

Upload the trivia question data set to the database and container listed in the `.env.local` file. The database and container are created in the script, if they don't exist.

```bash
npm run upload:start
```

## Run trivia game

1. Start the trivia game with 

    ```
    npm run start
    ```

2. Select a language for the game before answering questions.

3. When you've completed the game, start another!

## Deployment

This application can be found at [https://nextjs-trivia-demo.aaron-powell.com](https://nextjs-trivia-demo.aaron-powell.com) and is deployed using the [hybrid rendering support on Azure Static Web Apps](). 

## Original source code

* [Aaron's original project](https://github.com/aaronpowell/nextjs-graphql-trivia-demo)
