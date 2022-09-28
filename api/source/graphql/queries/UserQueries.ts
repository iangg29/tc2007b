// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { db } from "../../database/database";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";
import { UserType } from "../../types/UserType";

export default {
  users: {
    type: GraphQLList(UserType),
    resolve: () => {
      return db.select().table(USER_TABLE_NAME);
    },
  },
};
