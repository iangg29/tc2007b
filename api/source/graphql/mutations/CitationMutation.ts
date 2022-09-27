import { CitationType } from "../../models/CitationType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { CITATION_TABLE_NAME } from "../../database/utils/database_constants";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";


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
      document_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      end_date: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (_: any, { title, description, document_id, end_date }: any) => {
      const id = uuid();
      await db(CITATION_TABLE_NAME)
        .insert({
          id,
          title,
          description,
          document_id,
          end_date,
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
