// (c) Tecnologico de Monterrey 2022, rights reserved.

import { CitationType } from "../../types/CitationType";
import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME } from "../../database/utils/database_constants";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";
import { CITATION_DOCUMENTS_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  createCitation: {
    type: CitationType,
    args: {
      title: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
      end_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      document_types: {
        type: GraphQLList(GraphQLID)
      }
    },
    resolve: async (_: any, { title, description, end_date, document_types }: any) => {
      const id = uuid();

      await db.transaction(async (trx) => {
        await trx(CITATION_TABLE_NAME).insert({
          id,
          title,
          description,
          end_date,
        });

        console.log(document_types);

        await Promise.all (document_types.map(async (element: any) => (
          await trx(CITATION_DOCUMENTS_TABLE_NAME).insert({
            citation_id: id,
            document_type_id: element,
          }))
        ));

      }).catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newCitation = await db.select().from(CITATION_TABLE_NAME).where({ id });
      //const myDocumentTypes = await db.select().from(CITATION_DOCUMENTS_TABLE_NAME).where({ citation_id: id });
      //const myDocument = await db.select().from(DOCUMENT_TABLE_NAME).where({ id: document_id });

      return {
        ...newCitation[0],

        //document: myDocument[0],
      };
    },
  },
};
