// (c) Tecnologico de Monterrey 2022, rights reserved.

import { FAQType } from "../../types/FAQType";
import { GraphQLList } from "graphql";
import { FAQ_TABLE_NAME } from "../../database/utils/database_constants";
import { db } from "../../database/database";

export default {
  faqs: {
    type: GraphQLList(FAQType),
    resolve: () => {
      return db.select().table(FAQ_TABLE_NAME);
    },
  },
};
