// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import { UserType } from "../../types/UserType";
import { db } from "../../database/database";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
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
