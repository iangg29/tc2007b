// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationType } from "../../types/ApplicationType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { APPLICATION_STATUS_TABLE_NAME, APPLICATION_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createApplication: {
    type: ApplicationType,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
      },
      image: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
      support: {
        type: GraphQLNonNull(GraphQLString),
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
        type: GraphQLNonNull(GraphQLString),
      },
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      citation_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (
      _: any,
      {
        user_id,
        title,
        image,
        description,
        support,
        deadline,
        start_time,
        end_time,
        emission_date,
        response_date,
        application_status_id,
        citation_id,
      }: any,
    ) => {
      const id = uuid();
      await db(APPLICATION_TABLE_NAME)
        .insert({
          id,
          user_id,
          title,
          image,
          description,
          support,
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

  updateApplicationStatus: {
    type: GraphQLString,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      next_status: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (_: any, { application_id, next_status }: any) => {
      const application_status_id = await db
        .select("application_status_id")
        .table(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      
      const myOldOrder = await db
        .select("order")
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ id: application_status_id[0].application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newstatusORDER = myOldOrder[0].order + next_status;

      const newStatusID = await db
        .select("id")
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ order: newstatusORDER })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
      .table(APPLICATION_TABLE_NAME)
      .update({application_status_id: newStatusID[0].id})
      .where({id:application_id})
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      return "Successful status update";
    },
  },

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
