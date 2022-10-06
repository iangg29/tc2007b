// (c) Tecnologico de Monterrey 2022, rights reserved.

import { EvidenceType } from "../../types/EvidenceType";
import { GraphQLBoolean, GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { APPLICATION_TABLE_NAME, DOCUMENT_TABLE_NAME, EVIDENCE_TABLE_NAME } from "../../database/utils/database_constants";
import { v4 as uuid } from "uuid";
import { db } from "../../database/database";

export default {
    // Upload the evidence of an application (accepted)
    uploadEvidence: {
        type: EvidenceType,
        args: {
            impact: {
                type: GraphQLNonNull(GraphQLString),
            },
            application_id: {
                type: GraphQLNonNull(GraphQLID),
            },
            document_id: {
                type: GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_: any, { impact, application_id, document_id }: any) => {
            const id = uuid();

            await db()
                .from(APPLICATION_TABLE_NAME)
                .where({id: application_id})
                .catch((error: Error) => {
                    console.error(error);
                    throw new GraphQLError(error.name);
                });
        
            await db
                .select()
                .from(DOCUMENT_TABLE_NAME)
                .where({ id: document_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
                });

            await db(EVIDENCE_TABLE_NAME)
                .insert({
                id,
                impact,
                application_id,
                document_id
                })
            .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
            });
            
            const newEvidence = await db.select().from(EVIDENCE_TABLE_NAME).where({ id });
            return newEvidence[0];
        },
    },
};
