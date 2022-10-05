// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { EvidenceType } from "../../types/EvidenceType";
import { db } from "../../database/database";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  USER_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TABLE_NAME,
  EVIDENCE_TABLE_NAME
} from "../../database/utils/database_constants";

export default {
    evidences:{
        type: GraphQLList(EvidenceType),
        resolve: async () => {
            const evidences = await db.select().from(EVIDENCE_TABLE_NAME);
            return evidences;
        },  
    },
    evidenceByApplicationID: {
        type: EvidenceType,
        args: {
        application_id: {
            type: GraphQLNonNull(GraphQLID),
        },
        },
        resolve: async (_: any, { application_id }: any) => {

            // Evidence
            const myEvidence = await db
                .select()
                .from(EVIDENCE_TABLE_NAME)
                .where({ application_id: application_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
                });
            
            // Evidence - Document
            const myEvidenceDoc = await db
                .select()
                .from(DOCUMENT_TABLE_NAME)
                .where({ id: myEvidence[0].document_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
                });
        
            // Application
            const myApplication = await db
                .select()
                .from(APPLICATION_TABLE_NAME)
                .where({ id: application_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
                });

            // Application - User
            const myUser = await db
                .select()
                .from(USER_TABLE_NAME)
                .where({ id: myApplication[0].user_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
                });

            // Application - Status
            const myStatus = await db
                .select()
                .from(APPLICATION_STATUS_TABLE_NAME)
                .where({ id: myApplication[0].application_status_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
            });

            // Application - Citation
            const myCitation = await db
                .select()
                .from(CITATION_TABLE_NAME)
                .where({ id: myApplication[0].citation_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
            });
            
            // Application - Documents
            const myDocs = await db
                .select()
                .from(APPLICATION_DOCUMENTS_TABLE_NAME)
                .where({ application_id: application_id })
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
            });

            const result = myDocs.map(a => a.document_id);

            const myDocuments = await db
                .select()
                .from(DOCUMENT_TABLE_NAME)
                .whereIn('id', result)
                .catch((error: Error) => {
                console.error(error);
                throw new GraphQLError(error.name);
            });

            return {
                ...myEvidence[0],
                document: myEvidenceDoc[0],
                application: {
                    ...myApplication[0],
                    user: myUser[0],
                    citation: myCitation[0],
                    applicationStatus: myStatus[0],
                    applicationDocuments: myDocuments}
            }
        },
    },
};
