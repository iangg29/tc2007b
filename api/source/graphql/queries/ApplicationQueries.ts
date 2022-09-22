// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
import { ApplicationType } from "../../types/ApplicationType";
import { db } from "../../database/database";
import { APPLICATION_TABLE_NAME } from "../../database/utils/database_constants";


export default {
  applications: {
    type: GraphQLList(ApplicationType),
    resolve: () => {
      return db.select().table(APPLICATION_TABLE_NAME);
    },
  }, 
};

