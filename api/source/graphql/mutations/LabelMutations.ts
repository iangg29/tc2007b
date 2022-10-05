// (c) Tecnologico de Monterrey 2022, rights reserved.

import { LabelType } from "../../types/LabelType";
import { GraphQLError, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { LABEL_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createLabel: {
    type: LabelType,
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async  (_: any, { name, description }: any) => {
      const id = uuid();
      await db(LABEL_TABLE_NAME)
        .insert({
          id,
          name,
          description,
        })
        .catch((error: Error) =>{
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const  newLabel = await  db.select().from(LABEL_TABLE_NAME).where({ id });
      return newLabel[0];
    },
  },
}