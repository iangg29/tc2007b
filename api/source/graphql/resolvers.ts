// (c) Tecnologico de Monterrey 2022, rights reserved.

import { db } from "../database/database";

/**
 * Generates all application resolvers.
 */
export const getResolvers = () => {
  return {
    Query: {
      users: () => {
        return db.select().table("User");
      },
    },
  };
};
