// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { db } from "../database/database";
import { ROLE_TABLE_NAME } from "../database/utils/database_constants";
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
      async resolve({ role_id }) {
        const newRole = await db.select().table(ROLE_TABLE_NAME).where({ id: role_id });
        return { ...newRole[0] };
      },
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
      type: GraphQLString,
      description: "User's second lastname",
    },
    cellphone: {
      type: GraphQLNonNull(GraphQLString),
      description: "User's phone",
    },
    profile_img: {
      type: GraphQLString,
      description: "User's profile picture",
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
