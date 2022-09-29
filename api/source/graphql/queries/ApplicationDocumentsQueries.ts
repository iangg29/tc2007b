// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ApplicationDocumentType } from "../../types/ApplicationDocumentType";
import { DocumentType } from "../../types/DocumentType";
import { db } from "../../database/database";
import { APPLICATION_DOCUMENTS_TABLE_NAME, DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  applicationsdocuments: {
    type: GraphQLList(ApplicationDocumentType),
    resolve: () => {
      return db.select().table(APPLICATION_DOCUMENTS_TABLE_NAME);
    },
  },
  applicationdocuments: {
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

      console.log(myApplicationDocuments);

      const result = myApplicationDocuments.map(a => a.document_id);
      console.log(result);

      const myDocuments = await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .whereIn('id', result)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      console.log(myDocuments);
      return myDocuments;
    },
  },
};