import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { CitationType } from "../../types/CitationType";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  citations: {
    type: GraphQLList(CitationType),
    resolve: () => {
      return db.select().table(CITATION_TABLE_NAME);
    },
  },

  CitationsByUserID: {
    type: GraphQLList(CitationType),
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { user_id }: any) => {
      const applications = await db
        .select()
        .table(CITATION_TABLE_NAME)
        .where({ user_id: user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return [...applications];
    },
  },
};
