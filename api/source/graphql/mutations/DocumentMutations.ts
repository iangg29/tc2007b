// (c) Tecnologico de Monterrey 2022, rights reserved.

import { DocumentType } from "../../types/DocumentType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import {
  DOCUMENT_TABLE_NAME,
  DOCUMENT_TYPE_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME
} from "../../database/utils/database_constants";
import { USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createDocument: {
    type: GraphQLNonNull(DocumentType),
    args: {
      user_id: {
        type: GraphQLID,
      },
      file_name: {
        type: GraphQLNonNull(GraphQLString),
      },
      file_type_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { user_id, file_name, file_type_id }: any) => {
      const id = uuid();

      await db
        .select()
        .from(USER_TABLE_NAME)
        .where({ id: user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .from(DOCUMENT_TYPE_TABLE_NAME)
        .where({ id: file_type_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(DOCUMENT_TABLE_NAME)
        .insert({
          id,
          user_id,
          file_name,
          file_type_id,
          url: "https://www.africau.edu/images/default/sample.pdf",
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newDocument = await db.select().from(DOCUMENT_TABLE_NAME).where({ id });
      const myUser = await db.select().from(USER_TABLE_NAME).where({ id: user_id });
      const myDocumentType = await db.select().from(DOCUMENT_TYPE_TABLE_NAME).where({ id: file_type_id });

      return {
        ...newDocument[0],
        user: myUser[0],
        documentType: myDocumentType[0],
      };
    },
  },

  deleteDocument: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db
        .transaction(async (trx) => {
          await trx(DOCUMENT_TABLE_NAME).where({ id }).delete();
          await trx(APPLICATION_DOCUMENTS_TABLE_NAME).where({ document_id: id }).delete();
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return true;
    },
  },
};
