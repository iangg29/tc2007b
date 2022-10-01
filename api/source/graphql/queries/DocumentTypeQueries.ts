// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { db } from "../../database/database";
import { DOCUMENT_TYPE_TABLE_NAME } from "../../database/utils/database_constants";
import { DocumentTypeType } from "../../types/DocumentTypeType";

export default {
  documentTypes: {
    type: GraphQLList(DocumentTypeType),
    resolve: () => {
      return db.select().table(DOCUMENT_TYPE_TABLE_NAME);
    },
  },
};
