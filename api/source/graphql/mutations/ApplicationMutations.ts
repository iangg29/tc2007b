// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationType } from "../../types/ApplicationType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  CITATION_TABLE_NAME,
  USER_TABLE_NAME,
} from "../../database/utils/database_constants";
import { db } from "../../database/database";

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

      const newApplication = await db.select().from(APPLICATION_TABLE_NAME).where("id", id)
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      const myUser = await db.select().from(USER_TABLE_NAME).where({ id: user_id })
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      const myApplytatus = await db.select().from(APPLICATION_STATUS_TABLE_NAME).where({ id: application_status_id })
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });
      
      const myCitation = await db.select().from(CITATION_TABLE_NAME).where({ id: citation_id })
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      await db(APPLICATION_TABLE_NAME)
        .insert({
          id,
          title,
          deadline,
          start_time,
          end_time,
          emission_date,
          response_date,
          user_id,
          application_status_id,
          citation_id,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return {
        ...newApplication[0],
        user: myUser[0],
        applicationStatus: myApplytatus[0],
        citation: myCitation,
      };
    },
  },

  updateApplicationStatus: {
    type: ApplicationType,

    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },

    resolve: async (_: any, { id, application_status_id }: any) => {
      await db
        .select()
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ id: application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_TABLE_NAME)
        .where("id", id)
        .update({ application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const results = await db(APPLICATION_TABLE_NAME)
        .select()
        .where("id", id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return results[0];
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
