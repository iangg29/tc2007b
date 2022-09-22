// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationType} from "../../types/ApplicationType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { APPLICATION_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";


export default {

  createApplication: {
    type: ApplicationType,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLNonNull(GraphQLString)
      },
      deadline: {
        type: GraphQLString,
      },
      end_time: {
        type: GraphQLString,
      },
      emission_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      response_date: {
        type: GraphQLNonNull(GraphQLString)
      },
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      citation_id: {
        type: GraphQLNonNull(GraphQLID),
      }

    },
    resolve: async (_: any, { user_id,title,deadline, start_time,end_time, emission_date, response_date,
    application_status_id,citation_id }: any) => {
      const id = uuid();
      await db(APPLICATION_TABLE_NAME)
        .insert({
          id,
          user_id,
          title,
          deadline: deadline,
          start_time: start_time,
          end_time: end_time,
          emission_date, 
          response_date,
          application_status_id,
          citation_id, 
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newApplication = await db.select().from(APPLICATION_TABLE_NAME).where("id", id);
      return newApplication[0];
    },
  },

//   updateApplication: {
//     type: ApplicationType,

//     args: {
//         id: {
//             type: GraphQLNonNull(GraphQLID),
//           },
//         applicationStatus: {
//           type: GraphQLNonNull(ApplicationStatusType),
//         },
//         updated_at: {
//           type: GraphQLNonNull(GraphQLString),
//         },
  
//       },
  
  
//     resolve: async (_: any, { id, applicationStatus, updated_at }: any) => {
//       await db(APPLICATION_TABLE_NAME).where("id", id).update({ applicationStatus, updated_at });
//       const results = await db(APPLICATION_TABLE_NAME).select().where("id", id);
//       return results[0];
//     },
//   },

  deleteApplication: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db(APPLICATION_TABLE_NAME).where("id", id).del();
      return true;
    },
  },
};