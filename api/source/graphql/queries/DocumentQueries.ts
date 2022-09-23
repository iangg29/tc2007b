import { GraphQLList, GraphQLID, GraphQLObjectType } from "graphql";
import { DocumentType } from "../../models/DocumentType";
import { UserType } from "../../models/UserModel";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME, USER_TABLE_NAME } from "../../database/utils/database_constants";
import { getDocumentByUserId } from "../helpers/DocumentHelper";

const userDocuments = new GraphQLObjectType({
  name: "userDocuments",
  fields: {
    user: { type: UserType },
    documents: { type: GraphQLList(DocumentType) },
  },
});

export default {
  documents: {
    type: GraphQLList(DocumentType),
    resolve: () => {
      return db.select().table(DOCUMENT_TABLE_NAME);
    },
  },

  findDocumentsByUserID: {
    type: userDocuments,
    args: {
      user_id: {
        type: GraphQLID,
      },
    },
    resolve: async (_: any, { user_id }: any) => {
      const user = await db.select().table(USER_TABLE_NAME).where({ id: user_id });

      return {
        user: user[0],
        documents: await getDocumentByUserId(user_id)
      }
    },
  },
};
