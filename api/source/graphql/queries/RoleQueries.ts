// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { RoleType } from "../../models/RoleModel";
import { db } from "../../database/database";
import { ROLE_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  roles: {
    type: GraphQLList(RoleType),
    resolve: () => {
      return db.select().table(ROLE_TABLE_NAME);
    },
  },
};
