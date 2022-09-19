import { GraphQLList } from "graphql";
import { ApplicationLabelType } from "../../models/ApplicationLabelType";
import { db } from "../../database/database";
import { APPLICATION_LABEL_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  applicationLabel: {
    type: GraphQLList(ApplicationLabelType),
    resolve: () => {
      return db.select().table(APPLICATION_LABEL_TABLE_NAME);
    },
  },
};
