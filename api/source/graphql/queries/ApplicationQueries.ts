// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { DocumentType } from "../../types/DocumentType";
import { db } from "../../database/database";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  USER_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TABLE_NAME
} from "../../database/utils/database_constants";

export default {
  // FETCH ALL (RELATIONSHIPS) FOR EVERY APPLICATION
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  },

  // FETCH ALL (RELATIONSHIPS) FOR ONE APPLICATIONS
  applicationByID: {
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

      return{
        ...myApplication[0],
        user: myUser[0]
      };
    },
  },

  applicationByStatusID: {
    type: GraphQLList(ApplicationType),
    args: {
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_status_id }: any) => {
      const applications = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({ application_status_id: application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newApplicationById = await Promise.all(
        applications.map(async (application, index) => {
          const user = await db.select().table(USER_TABLE_NAME).where({ id: application.user_id });
          const applicationStatus = await db
            .select()
            .table(APPLICATION_STATUS_TABLE_NAME)
            .where({ id: application.application_status_id })
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
            });
          const citation = await db
            .select()
            .table(CITATION_TABLE_NAME)
            .where({ id: application.citation_id })
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
            });

          const newApplication = {
            ...application,
            applicationStatus: applicationStatus[0],
            user: user[0],
            citation: citation[0],
          };
          return newApplication;
        }),
      );

      return [...newApplicationById];
    },
  },

  applicationDocuments: {
    type: GraphQLList(DocumentType),
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      }
    },
    resolve: async (_: any, { application_id }: any) => {
      const myApplicationDocuments = await db
        .select()
        .from(APPLICATION_DOCUMENTS_TABLE_NAME)
        .where({ application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const result = myApplicationDocuments.map(a => a.document_id);

      const myDocuments = await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .whereIn('id', result)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return myDocuments;
    },
  },
};
