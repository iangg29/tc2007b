import { UserType } from "../../models/UserModel";
import { GraphQLError, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createUser: {
    type: UserType,
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      first_lastname: {
        type: GraphQLNonNull(GraphQLString),
      },
      second_lastname: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      cellphone: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { name, first_lastname, second_lastname, password, cellphone, email }: any) => {
      const id = uuid();
      await db(USER_TABLE_NAME)
        .insert({
          id,
          name,
          first_lastname,
          second_lastname,
          password,
          cellphone,
          email,
          role_id: "c4e55",
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newUser = await db.select().from(USER_TABLE_NAME).where({ id });
      return newUser[0];
    },
  },
};
