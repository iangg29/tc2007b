// (c) Tecnologico de Monterrey 2022, rights reserved.

import { RoleType } from "../../types/RoleType";
import { GraphQLBoolean, GraphQLError, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { ROLE_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createRole: {
    type: RoleType,
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
      is_default: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (_: any, { name, description, is_default }: any) => {
      const id = uuid();
      await db(ROLE_TABLE_NAME)
        .insert({
          id,
          name: name.toUpperCase(),
          description,
          default: is_default ?? false,
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
