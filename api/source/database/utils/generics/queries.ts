import { GraphQLError } from "graphql";
import { db } from "../../../database/database";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  USER_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TABLE_NAME
} from "../../../database/utils/database_constants";

export const genApplications = async (Applications: any) => {
    const newApplications = await Promise.all(
        Applications.map(async (application: any) => {
          const users = await db
            .select()
            .table(USER_TABLE_NAME)
            .where({ id: application.user_id });

          const applicationStatus = await db
            .select()
            .table(APPLICATION_STATUS_TABLE_NAME)
            .where({ id: application.application_status_id })
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
            });
           
          const citation = await db
            .select()
            .table(CITATION_TABLE_NAME)
            .where({ id: application.citation_id })
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
            });
         
          const docs = await db
            .select()
            .from(APPLICATION_DOCUMENTS_TABLE_NAME)
            .where({ application_id: application.id })
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
          });
   
          const result = docs.map(a => a.document_id);
   
          const documents = await db
            .select()
            .from(DOCUMENT_TABLE_NAME)
            .whereIn('id', result)
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
          });
  
          const newApplication = {
            ...application,
            applicationStatus: applicationStatus[0],
            user: users[0],
            citation: citation[0],
            applicationDocuments: documents
          };
          return newApplication;
        }),
    );
 
    return [...newApplications];
}