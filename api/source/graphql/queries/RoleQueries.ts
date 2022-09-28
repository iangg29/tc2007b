// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
<<<<<<< HEAD
import { RoleType } from "../../models/RoleType";
=======
import { RoleType } from "../../types/RoleType";
>>>>>>> 39a946ecb6aed87cff4cd50c8990411d63ae5d27
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
