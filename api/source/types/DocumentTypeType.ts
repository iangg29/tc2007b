// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const DocumentTypeType = new GraphQLObjectType({
  name: "DocumentType",
  description: "Type of document uploaded",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Document Type ID",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document Type name",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document Type creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time Document Type was updated",
    },
  },
});
