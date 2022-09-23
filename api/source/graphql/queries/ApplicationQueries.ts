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
import { getStatus } from "../helpers/StatusHelper";

const applicationsByID = new GraphQLObjectType({
  name: "applicationsByID",
  fields: {
    application: { type: ApplicationType },
    applicationStatus: { type: ApplicationStatusType },
    user: { type: UserType },
    citation: { type: CitationType },
  },
});

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
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id, user_id }: any) => {
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
        .where({ id: user_id })
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

  documents: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  },

  //Array for applications
  applicationByStatusID: {
    type: GraphQLList(applicationsByID),
    args: {
      application_status_id: {
        type: GraphQLString,
      },
    },
    resolve: async (_: any, { application_status_id }: any) => {
      const applications = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({ application_status_id: application_status_id });

      const newApplicationById = await Promise.all(
        applications.map(async (application, index) => {
          const user = await db.select().table(USER_TABLE_NAME).where({ id: application.user_id });
          const applicationStatus = await db
            .select()
            .table(APPLICATION_STATUS_TABLE_NAME)
            .where({ id: application.application_status_id });
          const citation = await db.select().table(CITATION_TABLE_NAME).where({ id: application.citation_id });

          const newApplication = {
            application,
            applicationStatus: applicationStatus[0],
            user: user[0],
            citation: citation[0],
          };
          return newApplication;
        }),
      );

      console.log(newApplicationById);
      return [...newApplicationById]
    },
  },
};
