import { GraphQLList } from "graphql";
import { DocumentType } from "../../models/DocumentType";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  document: {
    type: GraphQLList(DocumentType),
    resolve: () => {
      return db.select().table(DOCUMENT_TABLE_NAME);
    },
  },
};
