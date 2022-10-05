// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { db } from "../../database/database";
import {
  APPLICATION_LABEL_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  LABEL_TABLE_NAME
} from "../../database/utils/database_constants";
import { LabelType } from "../../types/LabelType";
import { ApplicationType } from "../../types/ApplicationType";
import any = jasmine.any;
import { genApplications } from "../../database/utils/generics/queries";

export default {
  labels: {
    type: GraphQLList(LabelType),
    resolve: () => {
      return db.select().table(LABEL_TABLE_NAME);
    },
  },
};