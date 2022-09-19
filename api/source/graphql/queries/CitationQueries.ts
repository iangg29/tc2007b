import { GraphQLList } from "graphql";
import { CitationType } from "../../models/CitationType";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  citation: {
    type: GraphQLList(CitationType),
    resolve: () => {
      return db.select().table(CITATION_TABLE_NAME);
    },
  },
};
