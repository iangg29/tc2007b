import { GraphQLList, GraphQLObjectType } from "graphql";
import { CitationType } from "../../models/CitationType";
import { DocumentType } from "../../models/DocumentType";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME, DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

const citationDocuments = new GraphQLObjectType({
  name: "citationDocuments",
  fields: {
    citation: { type: CitationType },
    document: { type: DocumentType },
  },
});

export default {
  citations: {
    type: GraphQLList(CitationType),
    resolve: () => {
      return db.select().table(CITATION_TABLE_NAME);
    },
  },

  activeCitation: {
    type: GraphQLList(citationDocuments),
    resolve: async () => {
      const today = new Date();
      const date = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
      
      const citations = await db.select().table(CITATION_TABLE_NAME).where('end_date', '>=', date);

      const newActiveCitations = await Promise.all(
        citations.map(async (myCitation, index) => {
          const documents = await db.select().table(DOCUMENT_TABLE_NAME).where({ id: myCitation.document_id });

          const newCitation = {
            citation: myCitation,
            document: documents[0],

          };
          return newCitation;
        }),
      );

      console.log(newActiveCitations);
      return [...newActiveCitations]
    },
  },
};