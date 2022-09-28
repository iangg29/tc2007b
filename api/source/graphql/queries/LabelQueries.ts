// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { db } from "../../database/database";
import { LABEL_TABLE_NAME } from "../../database/utils/database_constants";
import { LabelType } from "../../types/LabelType";

export default {
  labels: {
    type: GraphQLList(LabelType),
    resolve: () => {
      return db.select().table(LABEL_TABLE_NAME);
    },
  },
};
