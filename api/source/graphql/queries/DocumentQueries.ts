import { GraphQLList } from "graphql";
import { DocumentType } from "../../types/DocumentType";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  documents: {
    type: GraphQLList(DocumentType),
    resolve: () => {
      return db.select().table(DOCUMENT_TABLE_NAME);
    },
  },
};
