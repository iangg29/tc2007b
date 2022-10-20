// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList, GraphQLID, GraphQLError } from "graphql";
import { DocumentType } from "../../types/DocumentType";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";
import { getDocumentByUserId } from "../helpers/DocumentHelper";

export default {
  documents: {
    type: GraphQLList(DocumentType),
    resolve: () => {
      return db.select().table(DOCUMENT_TABLE_NAME);
    },
  },

  findDocumentsByUserID: {
    type: GraphQLList(DocumentType),
    args: {
      user_id: {
        type: GraphQLID,
      },
    },
    resolve: async (_: any, { user_id }: any) => {
      const UserDocuments = await db
        .select()
        .table( DOCUMENT_TABLE_NAME)
        .where({ user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      return [...UserDocuments ];
    },
  },

};
