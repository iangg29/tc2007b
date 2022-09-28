// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const FAQType = new GraphQLObjectType({
  name: "FAQ",
  description: "Frequent question & answer.",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "FAQ ID",
    },
    question: {
      type: GraphQLNonNull(GraphQLString),
      description: "FAQ Question",
    },
    answer: {
      type: GraphQLNonNull(GraphQLString),
      description: "FAQ Answer",
    },
    visible: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "FAQ visibility",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "FAQ creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time FAQ was updated.",
    },
  },
});
