// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { ApplicationStatusType } from "../../types/ApplicationStatusType";
import { db } from "../../database/database";
import { APPLICATION_STATUS_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  applicationStatus: {
    type: GraphQLList(ApplicationStatusType),
    resolve: () => {
      return db.select().table(APPLICATION_STATUS_TABLE_NAME);
    },
  },
};
