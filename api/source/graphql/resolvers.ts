// (c) Tecnologico de Monterrey 2022, rights reserved.

import { db } from "../database/database";
import { ROLE_TABLE_NAME, USER_TABLE_NAME } from "../database/utils/database_constants";

/**
 * Generates all application resolvers.
 */
export const getResolvers = () => {
  return {
    Query: {
      users: () => {
        return db.select().table(USER_TABLE_NAME);
      },
      roles: () => {
        return db.select().table(ROLE_TABLE_NAME);
      },
    },
  };
};
