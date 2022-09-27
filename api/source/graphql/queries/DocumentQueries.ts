import { GraphQLList, GraphQLID} from "graphql";
import { DocumentType } from "../../models/DocumentType";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME} from "../../database/utils/database_constants";
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

      return await getDocumentByUserId(user_id)
    },
  },
};
