import { UserQuery, UserMutation,createUserPost } from "./user";
import { SchemaComposer } from "graphql-compose";
const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  createUserPost:createUserPost
});

export default schemaComposer.buildSchema();
