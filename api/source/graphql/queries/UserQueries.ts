// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList, GraphQLNonNull, GraphQLString, GraphQLError } from "graphql";
import { UserType } from "../../models/UserModel";
import { db } from "../../database/database";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  users: {
    type: GraphQLList(UserType),
    resolve: () => {
      return db.select().table(USER_TABLE_NAME);
    },
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { id }: any) => {
      const userlist = await db
        .select()
        .table(USER_TABLE_NAME)
        .where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      return userlist[0];
    },
  },
};
