import { ApolloServer } from "apollo-server-nextjs";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { resolvers } from "./resolvers";

const schema = loadSchemaSync(
  join(__dirname, "..", "..", "..", "..", "pages", "api", "schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const apolloServer = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
});

export default apolloServer.createHandler();

export const config = {
  api: {
    bodyParser: false,
  },
};
