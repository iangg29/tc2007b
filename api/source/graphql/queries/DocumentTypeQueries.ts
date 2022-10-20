// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME, DOCUMENT_TYPE_TABLE_NAME } from "../../database/utils/database_constants";
import { DocumentTypeType } from "../../types/DocumentTypeType";

export default {
  documentTypes: {
    type: GraphQLList(DocumentTypeType),
    resolve: () => {
      return db.select().table(DOCUMENT_TYPE_TABLE_NAME);
    },
  },
  countDocumetOfType: {
    type: GraphQLInt,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      const countDocs = await db(DOCUMENT_TABLE_NAME).where("id", id).count({ numDoc: "file_type_id" }).first();
      return countDocs?.numDoc;
    },
  },
};
