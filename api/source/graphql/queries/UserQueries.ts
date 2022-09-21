// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
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
  findUser: {
    type: GraphQLList(UserType),
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (_: any, { id }: any) => {
      const currentUser = db.select().table(USER_TABLE_NAME).where("id", id);
      return currentUser;
    },
  },
};
