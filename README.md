## Next.js trivia app

This is a Next.js trivia demo application that shows how you can use GraphQL in an API route to talk to [Azure Cosmos DB]() to make an application that can be deployed to [Azure Static Web Apps]() using the [hybrid Next.js app support]().

## Getting Started

### Devcontainer

The simplest way to get started is using a [VSCode devcontainer](), which has been shipped as part of this repository. When VSCode opens it will prompt you to open in the container and that will install the relevant Node.js packages, as well as setting up the [cross-platform Cosmos DB emulator](https://docs.microsoft.com/azure/cosmos-db/linux-emulator?tabs=ssl-netstd21) (to learn more on how that is all setup, check out [this blog post](https://www.aaron-powell.com/posts/2021-05-27-local-dev-with-cosmosdb-and-devcontainers/)).

You'll need to create the `.env.local` file using the `.env.sample` template (which contains the local emulator configuration settings).

### Manual setup

To get started you'll need the following installed:

- Node.js 14 (you can use `nvm use` against the .nvmrc in the repo)
- [Cosmos DB emulator](https://docs.microsoft.com/azure/cosmos-db/local-emulator?tabs=ssl-netstd21) (or you can use Cosmos on Azure)

Clone the repo from GitHub and run `npm install`

### Importing data

A sample dataset, obtained from [OpenTrivia DB](https://opentdb.com/), exists in the `trivia.json` file. You can import this via `npm run import-data`, [using the VSCode extension for Azure Databases](https://github.com/microsoft/vscode-cosmosdb/blob/main/README.md#import-into-cosmos-db) or import using the [data migration tool](https://docs.microsoft.com/en-us/azure/cosmos-db/import-data).

## Deployment

This application can be found at https://nextjs-trivia-demo.aaron-powell.com and is deployed using the [hybrid rendering support on Azure Static Web Apps]().
