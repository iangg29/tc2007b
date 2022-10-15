// (c) Tecnologico de Monterrey 2022, rights reserved.

import { CitationType } from "../../types/CitationType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";
import { CITATION_DOCUMENTS_TABLE_NAME, CITATION_TABLE_NAME} from "../../database/utils/database_constants";

export default {
  createCitation: {
    type: CitationType,
    args: {
      citation_title: {
        type: GraphQLNonNull(GraphQLString),
      },
      citation_description: {
        type: GraphQLNonNull(GraphQLString),
      },
      end_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      document_types: {
        type: GraphQLList(GraphQLID),
      },
    },
    resolve: async (_: any, { citation_title, citation_description, end_date, document_types }: any) => {
      const id = uuid();

      await db
        .transaction(async (trx) => {
          await trx(CITATION_TABLE_NAME).insert({
            id,
            citation_title,
            citation_description,
            end_date,
          });

          console.log(document_types);

          await Promise.all(
            document_types.map(
              async (element: any) =>
                await trx(CITATION_DOCUMENTS_TABLE_NAME).insert({
                  citation_id: id,
                  document_type_id: element,
                }),
            ),
          );
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newCitation = await db.select().from(CITATION_TABLE_NAME).where({ id });

      return {
        ...newCitation[0],
      };
    },
  },

  updateCitation: {
    type: CitationType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
      citation_title: {
        type: GraphQLNonNull(GraphQLString),
      },
      citation_description: {
        type: GraphQLNonNull(GraphQLString),
      },
      end_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      document_types: {
        type: GraphQLList(GraphQLID),
      },
    },
    resolve: async (_: any, { id, citation_title, citation_description, end_date, document_types }: any) => {
      const citationDocuments = await db.select().table(CITATION_DOCUMENTS_TABLE_NAME).where({ citation_id: id });
      const listCitationDocuments = citationDocuments.map((element: any) => {
        const newElement: any = element.document_type_id;
        return newElement;
      });

      await db
        .transaction(async (trx) => {
          await trx(CITATION_TABLE_NAME).where({ id }).update({ citation_title, citation_description, end_date });

          const docsToBeDeleted = listCitationDocuments
            .filter((element: any) => !document_types.includes(element))
            .map((filteredElement: any) => {
              const newElement: string = filteredElement;
              return newElement;
            });

          const docsToBeAdded = document_types
            .filter((element: any) => !listCitationDocuments.includes(element))
            .map((filteredElement: any) => {
              const newElement: string = filteredElement;
              return newElement;
            });

          await Promise.all(
            docsToBeAdded.map(
              async (element: string) =>
                await trx(CITATION_DOCUMENTS_TABLE_NAME).insert({
                  citation_id: id,
                  document_type_id: element,
                }),
            ),
          );

          await Promise.all(
            docsToBeDeleted.map(
              async (element: any) =>
                await trx(CITATION_DOCUMENTS_TABLE_NAME)
                  .where({ document_type_id: element })
                  .andWhere({ citation_id: id })
                  .delete(),
            ),
          );
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newCitation = await db.select().from(CITATION_TABLE_NAME).where({ id });

      return newCitation[0];
    },
  },

  deleteCitation: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db
        .transaction(async (trx) => {
          await trx(CITATION_TABLE_NAME).where({ id }).delete();
          await trx(CITATION_DOCUMENTS_TABLE_NAME).where({ citation_id: id }).delete();
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return true;
    },
  },
};
