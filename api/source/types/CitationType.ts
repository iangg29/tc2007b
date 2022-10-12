// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { DocumentType } from "./DocumentType";

export const CitationType = new GraphQLObjectType({
  name: "Citation",
  description:
    "Citation model that contains the document and information the users has to follow in order to get their scholarship",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Citation's ID",
    },
    citation_title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation's title",
    },
    citation_description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation's description",
    },
    document: {
      type: GraphQLNonNull(DocumentType),
      description: "Citation's document",
    },
    end_date: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation's end date",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation's creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time citation was updated",
    },
  },
});
