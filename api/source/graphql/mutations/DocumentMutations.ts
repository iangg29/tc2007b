// (c) Tecnologico de Monterrey 2022, rights reserved.

import { DocumentType} from "../../types/DocumentType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";


export default {

  uploadDocument: {
    type: DocumentType,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      file_name: {
        type: GraphQLNonNull(GraphQLString),
      },
      file_type_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      url: {
        type: GraphQLNonNull(GraphQLString),
      }
    },
    resolve: async (_: any, { user_id, file_name, file_type_id, url }: any) => {
      const id = uuid();
      await db(DOCUMENT_TABLE_NAME)
        .insert({
          id,
          user_id,
          file_name,
          file_type_id,
          url
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newDocument = await db.select().from(DOCUMENT_TABLE_NAME).where("id", id);
      return newDocument[0];
    },
  },

};