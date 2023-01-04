import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloServer } from "apollo-server-nextjs";
import { join } from "path";
import { getExistingContainer } from "../../azure/azureCosmosdb";
import type { ApolloContext } from "./context/ApolloContext";
import { QuestionDataSource } from "./datasources/QuestionDataSource";
import { TranslatorDataSource } from "./datasources/TranslatorDataSource";
import { resolvers } from "./resolvers/resolvers";
import { DebugPlugin } from "./plugins/debugPlugin";

const schema = loadSchemaSync(
  join(__dirname, "..", "..", "..", "..", "schema", "schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const dataSources: () => DataSources<ApolloContext> = () => {
  return {
    questions: new QuestionDataSource(getExistingContainer()),
    translator: new TranslatorDataSource(),
  };
};

const apolloServer = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  dataSources,
  //plugins: [DebugPlugin],
});

export default apolloServer.createHandler();

export const config = {
  api: {
    bodyParser: false,
  },
};
