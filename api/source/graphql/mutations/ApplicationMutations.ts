// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationType } from "../../types/ApplicationType";
import knex, { Knex } from "knex";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { v4 as uuid } from "uuid";
import {
  APPLICATION_LABEL_TABLE_NAME,
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  CITATION_TABLE_NAME,
  USER_TABLE_NAME,
  DOCUMENT_TABLE_NAME,
  LABEL_TABLE_NAME,
} from "../../database/utils/database_constants";
import { db } from "../../database/database";
import { LabelType } from "../../types/LabelType";
import errorController from "../../controllers/errorController";

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
          image,
          description,
          support,
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

      const newApplication = await db.select().from(APPLICATION_TABLE_NAME).where("id", id)
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

  // Update the status of an application
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

      const newStatusID = await db
        .select("id")
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ order: next_status })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const new_date = new Date().toISOString().split(/[T.]+/, 2).join(' ');

      await db
      .table(APPLICATION_TABLE_NAME)
      .update({application_status_id: newStatusID[0].id, updated_at: new_date})
      .where({id:application_id})
      .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      return "Successful status update";
    },
  },

  attachApplicationDocument: {
    type: ApplicationType,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      document_id: {
        type: GraphQLNonNull(GraphQLID),
      }
    },
    resolve: async (_: any, { application_id, document_id }: any) => {
      const id = uuid();

      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_DOCUMENTS_TABLE_NAME)
        .insert({
          id,
          application_id,
          document_id
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .from(APPLICATION_DOCUMENTS_TABLE_NAME)
        .where("id", id);

      return {
        ...myApplication[0]
      };
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

  updateAplicationLabels: {
    type: ApplicationType,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      label_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_id, label_id }: any) => {
      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .table(LABEL_TABLE_NAME)
        .where('id', label_id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_LABEL_TABLE_NAME)
        .insert({
          application_id,
          label_id
        })
        .catch((error: Error) => {
          console.error(error);
          throw  new GraphQLError(error.name);
        });

      return myApplication[0];
    },
  },
};
