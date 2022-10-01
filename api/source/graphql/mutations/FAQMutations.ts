// (c) Tecnologico de Monterrey 2022, rights reserved.

import { FAQType } from "../../types/FAQType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { FAQ_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";

export default {
  createFAQ: {
    type: FAQType,
    args: {
      question: {
        type: GraphQLNonNull(GraphQLString),
      },
      answer: {
        type: GraphQLNonNull(GraphQLString),
      },
      visible: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (_: any, { question, answer, visible }: any) => {
      const id = uuid();
      await db(FAQ_TABLE_NAME)
        .insert({
          id,
          question,
          answer,
          visible: visible ?? true,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });
      const newFAQ = await db.select().from(FAQ_TABLE_NAME).where("id", id);
      return newFAQ[0];
    },
  },
  toggleFAQVisibility: {
    type: FAQType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      visible: {
        type: GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async (_: any, { id, visible }: any) => {
      await db(FAQ_TABLE_NAME).where("id", id).update({ visible });
      const result = await db(FAQ_TABLE_NAME).select().where("id", id);
      return result[0];
    },
  },
  updateFAQ: {
    type: FAQType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      question: {
        type: GraphQLNonNull(GraphQLString),
      },
      answer: {
        type: GraphQLNonNull(GraphQLString),
      },
      visible: {
        type: GraphQLNonNull(GraphQLBoolean),
      },
    },
    resolve: async (_: any, { id, question, answer, visible }: any) => {
      await db(FAQ_TABLE_NAME).where("id", id).update({ question, answer, visible });
      const results = await db(FAQ_TABLE_NAME).select().where("id", id);
      return results[0];
    },
  },
  deleteFAQ: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db(FAQ_TABLE_NAME).where("id", id).del();
      return true;
    },
  },
};
