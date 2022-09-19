import { GraphQLList } from "graphql";
import { DocumentTypeType } from "../../models/DocumentTypeType";
import { db } from "../../database/database";
import { DOCUMENT_TYPE_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  documentTypes: {
    type: GraphQLList(DocumentTypeType),
    resolve: () => {
      return db.select().table(DOCUMENT_TYPE_TABLE_NAME);
    },
  },
};
