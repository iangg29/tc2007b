// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { db } from "../../database/database";
import {
  APPLICATION_TABLE_NAME,
  LABEL_TABLE_NAME,
  APPLICATION_LABEL_TABLE_NAME,
} from "../../database/utils/database_constants";
import { LabelType } from "../../types/LabelType";

export default {
  // Get all aplications
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: async () => {
      // Applications
      const Applications = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return [... Applications];
    },
  },

  // Get an application by ID
  applicationByID: {
    type: ApplicationType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      // Application
      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return { ...myApplication[0] };
    },
  },

  // Get applications by status
  applicationByStatusID: {
    type: GraphQLList(ApplicationType),
    args: {
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_status_id }: any) => {
      const Applications = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({  application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      return [...Applications];
    },
  },
};
