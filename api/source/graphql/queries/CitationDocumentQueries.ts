// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { db } from "../../database/database";
import {
  CITATION_DOCUMENTS_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TYPE_TABLE_NAME,
} from "../../database/utils/database_constants";
import { CitationDocumentType } from "../../types/CitationDocumentType";

export default {
  citationDocuments: {
    type: GraphQLList(CitationDocumentType),
    args: {
      id: {
            type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
        const myCitationDocuments = await db.select().table(CITATION_DOCUMENTS_TABLE_NAME).where({citation_id:id});
        
        console.log(myCitationDocuments);

      const newCitationDocuments = await Promise.all(
        myCitationDocuments?.map(async (citation_documents) => {
          const { document_type_id, citation_id } = citation_documents;
          const citation = await db.select().table(CITATION_TABLE_NAME).where({ id: citation_id });
          const documentType = await db.select().table(DOCUMENT_TYPE_TABLE_NAME).where({ id: document_type_id });

          return {
            citation: citation[0],
            documentType: documentType[0],
          };
        }),
      );

      return [...newCitationDocuments];
    },
    },
    
};
