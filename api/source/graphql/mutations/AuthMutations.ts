// (c) Tecnologico de Monterrey 2022, rights reserved.

import { LoginResponseType } from "../../types/AuthTypes";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { ROLE_TABLE_NAME, USER_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";

export default {
  login: {
    type: LoginResponseType,
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { email, password }: any) => {
      const users = await db.select().from(USER_TABLE_NAME).where("email", email);
      if (users.length <= 0)
        return {
          success: false,
          error: "Por favor, revisa las credenciales.",
          user: null,
        };
      const user = users[0];
      const role = await db.select().from(ROLE_TABLE_NAME).where("id", user.role_id);

      return {
        success: true,
        error: null,
        user: {
          ...user,
          role: role[0],
        },
      };
    },
  },
  register: {
    type: GraphQLBoolean,
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      first_lastname: {
        type: GraphQLNonNull(GraphQLString),
      },
      second_lastname: {
        type: GraphQLNonNull(GraphQLString),
      },
      cellphone: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      confirm_password: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_: any, args: any) => {
      const { name, first_lastname, second_lastname, cellphone, email, password, confirm_password } = args;
      return true;
    },
  },
};
