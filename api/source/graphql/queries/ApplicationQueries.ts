// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { db } from "../../database/database";
import { APPLICATION_TABLE_NAME } from "../../database/utils/database_constants";


export default {
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  },

  applicationStatusID: {
    type: GraphQLList(ApplicationType),
    args: {
      application_status_id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { application_status_id }: any) => {
      const applicationList = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({ application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      return applicationList;
    },
  },
}; 


