import { GraphQLList } from "graphql";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME } from "../../database/utils/database_constants";
import { CitationType } from "../../types/CitationType";

export default {
  citations: {
    type: GraphQLList(CitationType),
    resolve: () => {
      return db.select().table(CITATION_TABLE_NAME);
    },
  },
};
