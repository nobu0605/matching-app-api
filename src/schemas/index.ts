import { UserQuery, UserMutation } from "./user";
import { SchemaComposer } from "graphql-compose";
const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
});

export default schemaComposer.buildSchema();
