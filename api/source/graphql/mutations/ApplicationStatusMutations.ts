// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationStatusType } from "../../types/ApplicationStatusType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { APPLICATION_STATUS_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createStatus: {
    type: ApplicationStatusType,
    args: {
          status_name: {
            type: GraphQLNonNull(GraphQLString),
            description: "ApplicationStatus name",
          },
          order: {
            type: GraphQLNonNull(GraphQLInt),
            description: "ApplicationStatus order",
          },
    },
    resolve: async (_: any, { status_name, order }: any) => {
      const id = uuid();
      await db(APPLICATION_STATUS_TABLE_NAME)
        .insert({
          id,
          status_name,
          order,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newStatus = await db.select().from(APPLICATION_STATUS_TABLE_NAME).where({ id });
      return newStatus[0];
    },
  },

  deleteStatus: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db(APPLICATION_STATUS_TABLE_NAME).where("id", id).del();
      return true;
    },
  },
};
