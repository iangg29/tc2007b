// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLError } from "graphql";
import { UserType } from "./UserType";
import { DocumentTypeType } from "./DocumentTypeType";
import { DOCUMENT_TABLE_NAME, DOCUMENT_TYPE_TABLE_NAME } from "../database/utils/database_constants";
import { db } from "../database/database";

export const DocumentType = new GraphQLObjectType({
  name: "Document",
  description: "Document type, contains all the specifications of the documents uploaded by the users",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Document's ID",
    },
    user: {
      type: GraphQLNonNull(UserType),
      description: "User that uploaded the document",
    },
    file_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document's name",
    },
    documentType: {
      type: GraphQLNonNull(DocumentTypeType),
      description: "Document's type",
      async resolve({ id }) {
        const Document = await db
          .select("file_type_id")
          .from(DOCUMENT_TABLE_NAME)
          .where({ id: id })
          .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });
        
        const DocumentType = await db
          .select()
          .from(DOCUMENT_TYPE_TABLE_NAME)
          .where({ id: Document[0].file_type_id })
          .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });

        return DocumentType[0];
      },
    },
    url: {
      type: GraphQLNonNull(GraphQLID),
      description: "Document's URL",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document's creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time document got updated",
    },
  },
});
