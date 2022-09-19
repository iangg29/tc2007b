import { GraphQLList } from "graphql";
import { LabelType } from "../../models/LabelType";
import { db } from "../../database/database";
import { LABEL_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  label: {
    type: GraphQLList(LabelType),
    resolve: () => {
      return db.select().table(LABEL_TABLE_NAME);
    },
  },
};
