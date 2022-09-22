// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { RoleType } from "./RoleType";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "Main application user model, contains all user information w/it's relations.",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "User's ID",
    },
    role: {
      type: RoleType,
      description: "User's role",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's name",
    },
    first_lastname: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's first lastname",
    },
    second_lastname: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's second lastname",
    },
    cellphone: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's phone",
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's email",
    },
    status: {
      type: GraphQLNonNull(GraphQLInt),
      description: "User status",
    },
    active: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "User's active status",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's profile creation date.",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time user profile got updated",
    },
  },
});