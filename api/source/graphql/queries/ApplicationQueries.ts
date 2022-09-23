// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { ApplicationType } from "../../models/ApplicationType";
import { db } from "../../database/database";
import { APPLICATION_TABLE_NAME, USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  },
  application: {
    type: ApplicationType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id, user_id }: any) => {
      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const myUser = await db
        .select()
        .from(USER_TABLE_NAME)
        .where({ id: user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      
      return{
        ...myApplication[0],
        user: myUser[0]
      };
    },
  },
};

// ID - "0287ac91-09bf-4db7-a6ae-47283cec0ca4"
// USER_ID - "44931aea-7f8f-4bc4-858b-e9607c7f3c2f"
// IMAGEN: https://infolibros.org/wp-content/uploads/2021/06/Libros-de-Artes-Visuales.jpg?ezimgfmt=ng%3Awebp%2Fngcb33%2Frs%3Adevice%2Frscb33-1