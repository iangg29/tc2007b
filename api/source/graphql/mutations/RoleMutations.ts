// (c) Tecnologico de Monterrey 2022, rights reserved.

import { RoleType } from "../../models/RoleModel";
import { GraphQLError, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { ROLE_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createRole: {
    type: RoleType,
    args: {
      name: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
    },
    resolve: async (_: any, { name, description }: any) => {
      const id = uuid();
      await db(ROLE_TABLE_NAME)
        .insert({
          id,
          name,
          description,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newRole = await db.select().from(ROLE_TABLE_NAME).where({ id });
      return newRole[0];
    },
  },
};
