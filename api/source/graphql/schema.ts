// (c) Tecnologico de Monterrey 2022, rights reserved.
import { buildSchema, GraphQLSchema } from "graphql";

/**
 * Generates application schema.
 * @todo Pull each model type by using different files.
 */
export const getSchema = (): GraphQLSchema => {
  return buildSchema(`
  type User {
      id: ID,
      role_id: ID,
      name: String,
      first_lastname: String,
      second_lastname: String,
      password: String,
      cellphone: String,
      email: String,
      status: Int,
      created_at: String,
      updated_at: String
    }
    
  type Query {
    users: [User]
  }
`);
};
