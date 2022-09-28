// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationDocumentType} from "../../types/ApplicationDocumentType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { APPLICATION_DOCUMENTS_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";


export default {

  uploadApplicationDocument: {
    type: ApplicationDocumentType,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      document_id: {
        type: GraphQLNonNull(GraphQLID),
      }
    },
    resolve: async (_: any, { application_id, document_id }: any) => {
      const id = uuid();
      await db(APPLICATION_DOCUMENTS_TABLE_NAME)
        .insert({
          id,
          application_id,
          document_id
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newApplicationDocument = await db.select().from(APPLICATION_DOCUMENTS_TABLE_NAME).where("id", id);
      return newApplicationDocument[0];
    },
  },

};