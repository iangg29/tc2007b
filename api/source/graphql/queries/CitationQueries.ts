// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLList } from "graphql";
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