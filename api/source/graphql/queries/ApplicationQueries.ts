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

// IMAGEN: https://infolibros.org/wp-content/uploads/2021/06/Libros-de-Artes-Visuales.jpg?ezimgfmt=ng%3Awebp%2Fngcb33%2Frs%3Adevice%2Frscb33-1

// CREATE USER AND APPLICATION
// USER ID - "7acb9f11-9073-4d48-b480-dcf68e125d12"
// APPLICATION ID - "c1ffd3d4-e24c-450c-bfd3-e2991d96b68f"

// mutation {
//   createUser(name: "Jose", first_lastname: "De la Garza", second_lastname: "Gónzalez", cellphone: "44424567453", email: "example@example.com") {
//     id
//   }
// }

// mutation {
//   createApplication(user_id: "7acb9f11-9073-4d48-b480-dcf68e125d12", title: "Arte Típico", image: "https://infolibros.org/wp-content/uploads/2021/06/Libros-de-Artes-Visuales.jpg?ezimgfmt=ng%3Awebp%2Fngcb33%2Frs%3Adevice%2Frscb33-1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", support: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", deadline: "23/09/2022", end_time: "23/09/2022", emission_date: "23/09/2022", response_date: "23/09/2022", application_status_id: "Status_ID", citation_id: "Citation_ID") {
//     id
//   }
// }
