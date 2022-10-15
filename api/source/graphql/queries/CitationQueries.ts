// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { db } from "../../database/database";
import { CITATION_DOCUMENTS_TABLE_NAME, CITATION_TABLE_NAME, DOCUMENT_TYPE_TABLE_NAME } from "../../database/utils/database_constants";
import { CitationType } from "../../types/CitationType";
import {DocumentTypeType} from "../../types/DocumentTypeType"

export default {
  citations: {
    type: GraphQLList(CitationType),
    resolve: async () => {
      const mycitations = await db.select().table(CITATION_TABLE_NAME).orderBy("citation_title", "asc");

      const citationsActive = await Promise.all(
        mycitations.map(async (citation) => {
          return {
            ...citation,
          };
        }),
      );

      return [...citationsActive];
    },
  },

  citationDocuments: {
    type: GraphQLList(DocumentTypeType),
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      const myCitationDocuments = await db.select().table(CITATION_DOCUMENTS_TABLE_NAME).where({ citation_id: id });

      console.log(myCitationDocuments);

      const newCitationDocuments = await Promise.all(
        myCitationDocuments?.map(async (citation_documents) => {
          const { document_type_id } = citation_documents;
          const documentType = await db.select().table(DOCUMENT_TYPE_TABLE_NAME).where({ id: document_type_id });

          return {
            ...documentType[0],
          };
        }),
      );

      return [...newCitationDocuments];
    },
  },
};
