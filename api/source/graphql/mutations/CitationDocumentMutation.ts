// (c) Tecnologico de Monterrey 2022, rights reserved.

import { CitationDocumentType } from "../../types/CitationDocumentType";
import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { db } from "../../database/database";
import { CITATION_DOCUMENTS_TABLE_NAME } from "../../database/utils/database_constants";


export default {
  createCitationDocuments: {
    type: CitationDocumentType,
    args: {
      citation_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      document_type_id: {
        type: GraphQLList(GraphQLID),
      },
    },
    resolve: async (_: any, { citation_id, document_type_id }: any) => {
      await db(CITATION_DOCUMENTS_TABLE_NAME)
        .insert({
            citation_id,
            document_type_id
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newCitation = await db.select().from(CITATION_TABLE_NAME).where({ id });
      const myDocument = await db.select().from(DOCUMENT_TABLE_NAME).where({ id: document_id });

      return {
        ...newCitation[0],
        document: myDocument[0], 
    };
    },
  },
};
