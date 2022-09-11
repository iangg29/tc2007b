// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const ApplicationStatusType = new GraphQLObjectType({
  name: "ApplicationStatus",
  description: "Assignable Application Status",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "ApplicationStatus ID",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "ApplicationStatus name",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "ApplicationStatus creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time applicationStatus was updated.",
    },
  },
});
