import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME, DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";
import { CitationType } from "../../types/CitationType";

export default {
  citations: {
    type: GraphQLList(CitationType),
    resolve: async () => {
      const mycitations = await db.select().table(CITATION_TABLE_NAME).orderBy("title", "asc");

      const citationsActive = await Promise.all(
        mycitations.map(async (citation) => {
          const { document_id } = citation;
          const document = await db.select().table(DOCUMENT_TABLE_NAME).where({ id: document_id });

          return {
            ...citation,
            document: document[0],
          };
        }),
      );

      return [...citationsActive];
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
