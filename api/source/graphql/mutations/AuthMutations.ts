// (c) Tecnologico de Monterrey 2022, rights reserved.

import { AuthResponseType } from "../../models/AuthTypes";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { ROLE_TABLE_NAME, USER_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";
import { v4 as uuid } from "uuid";

export default {
  login: {
    type: AuthResponseType,
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
  signup: {
    type: AuthResponseType,
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
      gender: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      confirm_password: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, args: any) => {
      let role = undefined;
      let finalPassword = undefined;
      const roles = await db.select(["id"]).from(ROLE_TABLE_NAME).where("name", "default");
      if (roles.length <= 0) {
        const fallback = await db.select(["id"]).from(ROLE_TABLE_NAME);
        if (fallback.length <= 0) {
          return {
            success: false,
            error: "El sistema no cuenta con ningún rol registrado.",
            user: null,
          };
        } else {
          role = fallback[0];
        }
      } else {
        role = roles[0];
      }

      if (role === undefined)
        return {
          success: false,
          error: "Error cargando roles.",
          user: null,
        };

      const { name, first_lastname, second_lastname, cellphone, email, gender, password, confirm_password } = args;
      if (password !== confirm_password)
        return {
          success: false,
          error: "Las contraseñas no coinciden.",
          user: null,
        };

      finalPassword = password;

      try {
        const id = uuid();
        // TODO: Hash password.
        await db(USER_TABLE_NAME).insert({
          id,
          role_id: role.id,
          name,
          first_lastname,
          second_lastname,
          password: finalPassword,
          cellphone,
          email,
          gender,
        });
        const newUser = await db(USER_TABLE_NAME).select().where("id", id);

        return {
          success: true,
          error: null,
          user: newUser[0],
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message,
          user: null,
        };
      }
    },
  },
};