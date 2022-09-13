// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./UserType";

export const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  description: "Login authentication response.",
  fields: {
    success: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: "Is authentication successful.",
    },
    error: {
      type: GraphQLString,
      description: "Authentication error message.",
    },
    user: {
      type: UserType,
      description: "Authenticated user",
    },
  },
});
