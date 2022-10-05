// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { db } from "../../database/database";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  USER_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TABLE_NAME,
  LABEL_TABLE_NAME,
  APPLICATION_LABEL_TABLE_NAME,
} from "../../database/utils/database_constants";
import { genApplications } from "../../database/utils/generics/queries";
import { LabelType } from "../../types/LabelType";

export default {
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

      const applications = await genApplications(Applications);
      return applications;
    },
  },

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

      // Application - User
      const myUser = await db
        .select()
        .from(USER_TABLE_NAME)
        .where({ id: myApplication[0].user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      // Application - Status
      const myStatus = await db
        .select()
        .from(APPLICATION_STATUS_TABLE_NAME)
        .where({ id: myApplication[0].application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      // Application - Citation
      const myCitation = await db
        .select()
        .from(CITATION_TABLE_NAME)
        .where({ id: myApplication[0].citation_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      // Application - Documents
      const myDocs = await db
        .select()
        .from(APPLICATION_DOCUMENTS_TABLE_NAME)
        .where({ application_id: id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const result = myDocs.map((a) => a.document_id);

      const myDocuments = await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .whereIn("id", result)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return {
        ...myApplication[0],
        user: myUser[0],
        citation: myCitation,
        applicationStatus: myStatus,
        applicationDocuments: myDocuments,
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
      const Applications = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where({ application_status_id: application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const applications = await genApplications(Applications);
      return applications;
    },
  },

  applicationLabels: {
    type: GraphQLList(LabelType),
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_id }: any) => {
      const applicationLabels = await db
        .select()
        .table(APPLICATION_LABEL_TABLE_NAME)
        .where("application_id", application_id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const labels = applicationLabels.map((l) => l.label_id);

      const labelsOfApplications = await db
        .select()
        .from(LABEL_TABLE_NAME)
        .whereIn("id", labels)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return labelsOfApplications;
    },
  },

  applicationByUserID: {
    type: GraphQLList(ApplicationType),
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { user_id }: any) => {
      const applicationByUser = await db
        .select()
        .table(APPLICATION_TABLE_NAME)
        .where("user_id", user_id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return applicationByUser;
    },
  },
};
