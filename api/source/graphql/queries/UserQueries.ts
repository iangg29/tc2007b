// (c) Tecnologico de Monterrey 2022, rights reserved.

<<<<<<< HEAD
import { GraphQLError, GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import { UserType } from "../../models/UserType";
=======
import { GraphQLList } from "graphql";
import { UserType } from "../../types/UserType";
>>>>>>> 39a946ecb6aed87cff4cd50c8990411d63ae5d27
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
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      const user = await db.select().from(USER_TABLE_NAME).where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      return user[0];
    },
  }
};
