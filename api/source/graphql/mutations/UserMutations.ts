import { UserType } from "../../models/UserModel";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";
import { GraphQLError, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";

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
      cellphone: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
    },

    resolve: async (_: any, { name, first_lastname, second_lastname, cellphone, email }: any) => {
      const id = uuid();
      const role_id: string = "artista";
      const password: string = "mypass1234";
      await db(USER_TABLE_NAME)
        .insert({
          id,
          role_id,
          name,
          first_lastname,
          second_lastname,
          password,
          cellphone,
          email,
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
