// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const RoleType = new GraphQLObjectType({
  name: "Role",
  description: "Assignable role to users.",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Role ID",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Role name",
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Role description",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Role creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time role was updated.",
    },
  },
});
