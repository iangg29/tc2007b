import { GraphQLList } from "graphql";
import { CitationType } from "../../models/CitationType";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME, DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

export default {

  citations: {
    type: GraphQLList(CitationType),
    resolve: async () => {
      const mycitations = await db.select().table(CITATION_TABLE_NAME);

      const citationsActive = await Promise.all(
        mycitations.map(async (citation) => {
          const { document_id } = citation
          const document = await db.select().table(DOCUMENT_TABLE_NAME).where({ id: document_id })

          return {
            ...citation,
            document: document[0]
          }
        })
      )

      return [
        ...citationsActive
      ]
    },
  },
};