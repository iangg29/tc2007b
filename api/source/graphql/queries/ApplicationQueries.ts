// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { db } from "../../database/database";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  USER_TABLE_NAME,
  CITATION_TABLE_NAME,
} from "../../database/utils/database_constants";
import { UserType } from "../../types/UserType";
import { ApplicationStatusType } from "../../types/ApplicationStatusType";
import { CitationType } from "../../types/CitationType";
// import { getStatus } from "../helpers/StatusHelper";

export default {
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  },
  application: {
    type: ApplicationType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const myUser = await db
        .select()
        .from(USER_TABLE_NAME)
        .where({ id: myApplication[0].user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return {
        ...myApplication[0],
        user: myUser[0],
      };
    },
  },

  applicationsByUserID: {
    type: GraphQLList(ApplicationType),
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { user_id }: any) => {
      const applications = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({ user_id: user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return [...applications];
    },
  },
};
