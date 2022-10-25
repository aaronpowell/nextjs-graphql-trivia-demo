import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloServer } from "apollo-server-nextjs";
import { join } from "path";
import { container } from "../../cosmos";
import type { ApolloContext } from "./ApolloContext";
import { QuestionDataSource } from "./QuestionDataSource";
import { resolvers } from "./resolvers";
import { TranslatorDataSource } from "./TranslatorDataSource";

const schema = loadSchemaSync(
  join(__dirname, "..", "..", "..", "..", "pages", "api", "schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const dataSources: () => DataSources<ApolloContext> = () => ({
  questions: new QuestionDataSource(container),
  translator: new TranslatorDataSource(
    process.env.TRANSLATOR_KEY || "",
    process.env.TRANSLATOR_ENDPOINT || ""
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
