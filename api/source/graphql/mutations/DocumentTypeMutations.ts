// (c) Tecnologico de Monterrey 2022, rights reserved.

import { DocumentTypeType } from "../../types/DocumentTypeType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { DOCUMENT_TYPE_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createDocumentType: {
    type: DocumentTypeType,
    args: {
      type_name: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { type_name }: any) => {
      const id = uuid();
      await db(DOCUMENT_TYPE_TABLE_NAME)
        .insert({
          id,
          type_name,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newDocumentTypeType = await db.select().from(DOCUMENT_TYPE_TABLE_NAME).where({ id });
      return newDocumentTypeType[0];
    },
  },

  updateDocumentType: {
    type: DocumentTypeType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      type_name: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { id, type_name }: any) => {
      await db(DOCUMENT_TYPE_TABLE_NAME)
        .update({ type_name })
        .where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newDocumentTypeType = await db.select().from(DOCUMENT_TYPE_TABLE_NAME).where({ id });
      return newDocumentTypeType[0];
    },
  },
};
