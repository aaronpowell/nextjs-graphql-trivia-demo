import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloServer } from "apollo-server-nextjs";
import { join } from "path";
import { container } from "../../cosmos";
import type { ApolloContext } from "./context/ApolloContext";
import { QuestionDataSource } from "./datasources/QuestionDataSource";
import { TranslatorDataSource } from "./datasources/TranslatorDataSource";
import { resolvers } from "./resolvers/resolvers";

const schema = loadSchemaSync(
  join(__dirname, "..", "..", "..", "..", "schema", "schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const dataSources: () => DataSources<ApolloContext> = () => ({
  questions: new QuestionDataSource(container),
  translator: new TranslatorDataSource(
    process.env.TRANSLATOR_KEY || "87bba57923ef46319875fdb6dc042f8f",
    process.env.TRANSLATOR_ENDPOINT || "https://api.cognitive.microsofttranslator.com/"
  ),
});

const apolloServer = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
  dataSources,
});

export default apolloServer.createHandler();

export const config = {
  api: {
    bodyParser: false,
  },
};
