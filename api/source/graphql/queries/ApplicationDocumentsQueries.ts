// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ApplicationDocumentType } from "../../types/ApplicationDocumentType";
import { db } from "../../database/database";
import { APPLICATION_DOCUMENTS_TABLE_NAME, DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  applicationsdocuments: {
    type: GraphQLList(ApplicationDocumentType),
    resolve: () => {
      return db.select().table(APPLICATION_DOCUMENTS_TABLE_NAME);
    },
  },
  applicationdocs: {
    type: GraphQLList(ApplicationDocumentType),
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

      const myDocuments = await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .where({ id: myApplicationDocuments[0].document_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return{
        ...myApplicationDocuments[0],
        document: myDocuments[0]
      };
    },
  },
};