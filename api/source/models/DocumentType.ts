// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./UserModel";
import { DocumentTypeType } from "./DocumentTypeType";

export const DocumentType = new GraphQLObjectType({
  name: "Document",
  description: "Document model, contains all the specifications of the documents uploaded by the users",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Document's ID",
    },
    user: {
      type: GraphQLNonNull(UserType),
      description: "User that uploaded the document",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document's name",
    },
    documentType: {
      type: GraphQLNonNull(DocumentTypeType),
      description: "Document's type",
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
