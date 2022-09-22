import { DocumentType } from "../../models/DocumentType";
import { GraphQLError, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createDocument: {
    type: DocumentType,
    args: {
      file_name: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { file_name }: any) => {
      const id = uuid();
      await db(DOCUMENT_TABLE_NAME)
        .insert({
          id,
          user_id: "deb149b2-da23-4ad7-81ea-570a0a83f11b",
          file_name,
          file_type_id: "565b3a47-85af-4aa5-bec4-eda0d63f1910",
          url: "www.algo.com",
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newDocument = await db.select().from(DOCUMENT_TABLE_NAME).where({ id });
      return newDocument[0];
    },
  },
};
