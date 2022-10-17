// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApplicationType } from "../../types/ApplicationType";
import {
  GraphQLBoolean,
  GraphQLError,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import { v4 as uuid } from "uuid";
import {
  APPLICATION_LABEL_TABLE_NAME,
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  APPLICATION_DOCUMENTS_TABLE_NAME,
  CITATION_TABLE_NAME,
  USER_TABLE_NAME,
  DOCUMENT_TABLE_NAME,
  LABEL_TABLE_NAME,
} from "../../database/utils/database_constants";
import { db } from "../../database/database";

const documentsInfo = new GraphQLInputObjectType({
  name: "documentsInfo",
  fields: {
    id: { type: GraphQLID },
    type_name: { type: GraphQLString },
    field: { type: GraphQLString },
    file_name: { type: GraphQLString },
  },
});

export default {
  createNewApplication: {
    type: ApplicationType,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
      support: {
        type: GraphQLNonNull(GraphQLString),
      },
      deadline: {
        type: GraphQLString,
      },
      citation_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      documents: {
        type: GraphQLList(documentsInfo),
      },
      labels: {
        type: GraphQLList(GraphQLID),
      },
    },
    resolve: async (
      _: any,
      { user_id, title, description, support, deadline, citation_id, documents, labels }: any,
    ) => {
      const applicationId = uuid();

      const userDocuments = await db.select().table(DOCUMENT_TABLE_NAME).where({ user_id: user_id });

      const listUserDocumentTypes = userDocuments.map((element: any) => {
        const newElement: any = element.file_type_id;
        return newElement;
      });


      const listUserDocumentsIDs = userDocuments.map((element: any) => {
        const newElement: any = element.id;
        return newElement;
      });

      const defaultStatus = await db
        .select()
        .from(APPLICATION_STATUS_TABLE_NAME)
        .where({ order: 1 })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .transaction(async (trx) => {
          await trx(APPLICATION_TABLE_NAME).insert({
            id: applicationId,
            title,
            image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
            description,
            support,
            deadline,
            end_time: deadline,
            user_id,
            application_status_id: defaultStatus[0].id,
            citation_id,
          });

          const docsToBeCreated = documents.filter((element: any) => !listUserDocumentTypes.includes(element.id)).map((filteredElement: any) => {
              const newElement: string = filteredElement;
              return newElement;
            }
          );

          const docsToBeUpdated = documents.filter((element: any) => listUserDocumentTypes.includes(element.id)).map((filteredElement: any) => {
            const idx = userDocuments.findIndex((x) => x.file_type_id === filteredElement.id)
            const newElement: any = {
              type_name: filteredElement.type_name,
              field: filteredElement.field,
              file_name: filteredElement.file_name,
              document_id: listUserDocumentsIDs[idx],
            };
              return newElement;
            }
          );

          await Promise.all(
            docsToBeCreated.map(async (element: any) => {
              const myDocumentId = uuid();
              await trx(DOCUMENT_TABLE_NAME).insert({
                id: myDocumentId,
                user_id,
                file_name: element.file_name,
                file_type_id: element.id,
                url: element.field,
              });

              const myId = uuid();
              await trx(APPLICATION_DOCUMENTS_TABLE_NAME).insert({
                id: myId,
                application_id: applicationId,
                document_id: myDocumentId,
              });
            }),
          );

          await Promise.all(
            docsToBeUpdated.map(async (element: any) => {
              await trx(DOCUMENT_TABLE_NAME).update({
                file_name: element.file_name,
                url: element.field,
              }).where({ id: element.document_id });
            }),
          );

          await Promise.all(
            labels.map(async (element: string) => {    
              await trx(APPLICATION_LABEL_TABLE_NAME).insert({
                application_id: applicationId,
                label_id: element,
              });
            }),
          );


        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where("id", applicationId)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return {
        ...newApplication[0],
      };
    },
  },
  // Create application
  createApplication: {
    type: ApplicationType,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLNonNull(GraphQLString),
      },
      image: {
        type: GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLNonNull(GraphQLString),
      },
      support: {
        type: GraphQLNonNull(GraphQLString),
      },
      deadline: {
        type: GraphQLString,
      },
      end_time: {
        type: GraphQLString,
      },
      emission_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      response_date: {
        type: GraphQLNonNull(GraphQLString),
      },
      application_status_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      citation_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (
      _: any,
      {
        user_id,
        title,
        image,
        description,
        support,
        deadline,
        start_time,
        end_time,
        emission_date,
        response_date,
        application_status_id,
        citation_id,
      }: any,
    ) => {
      const id = uuid();

      const myUser = await db
        .select()
        .from(USER_TABLE_NAME)
        .where({ id: user_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const myApplytatus = await db
        .select()
        .from(APPLICATION_STATUS_TABLE_NAME)
        .where({ id: application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const myCitation = await db
        .select()
        .from(CITATION_TABLE_NAME)
        .where({ id: citation_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_TABLE_NAME)
        .insert({
          id,
          title,
          image,
          description,
          support,
          deadline,
          start_time,
          end_time,
          emission_date,
          response_date,
          user_id,
          application_status_id,
          citation_id,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where("id", id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return {
        ...newApplication[0],
        user: myUser[0],
        applicationStatus: myApplytatus[0],
        citation: myCitation,
      };
    },
  },

  // Update the status of an application
  updateApplicationStatus: {
    type: GraphQLString,

    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      next_status: {
        type: GraphQLNonNull(GraphQLInt),
      },
    },

    resolve: async (_: any, { application_id, next_status }: any) => {
      const application_status_id = await db
        .select("application_status_id")
        .table(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const myOldOrder = await db
        .select("order")
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ id: application_status_id[0].application_status_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const newStatusID = await db
        .select("id")
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ order: next_status })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      const new_date = new Date().toISOString().split(/[T.]+/, 2).join(" ");

      await db
        .table(APPLICATION_TABLE_NAME)
        .update({ application_status_id: newStatusID[0].id, updated_at: new_date })
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return "Successful status update";
    },
  },

  // Attach a document to an application
  attachApplicationDocument: {
    type: ApplicationType,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      document_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_id, document_id }: any) => {
      const id = uuid();


      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .from(DOCUMENT_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_DOCUMENTS_TABLE_NAME)
        .insert({
          id,
          application_id,
          document_id,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db.select().from(APPLICATION_DOCUMENTS_TABLE_NAME).where("id", id);

      return {
        ...myApplication[0],
      };
    },
  },

  // Delete an application (inactive)
  deleteApplication: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { id }: any) => {
      await db(APPLICATION_TABLE_NAME).where("id", id).del();
      return true;
    },
  },

  updateAplicationLabels: {
    type: ApplicationType,
    args: {
      application_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      label_id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, { application_id, label_id }: any) => {
      const myApplication = await db
        .select()
        .from(APPLICATION_TABLE_NAME)
        .where({ id: application_id })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db
        .select()
        .table(LABEL_TABLE_NAME)
        .where("id", label_id)
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      await db(APPLICATION_LABEL_TABLE_NAME)
        .insert({
          application_id,
          label_id,
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      return myApplication[0];
    },
  },

  // Update an application
  updateApplication: {
    type: GraphQLString,
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      applicationID: {
        type: GraphQLNonNull(GraphQLID)
      },
      description: {
        type: GraphQLNonNull(GraphQLString)
      },
      support: {
        type: GraphQLNonNull(GraphQLString)
      },
      deadline: {
        type: GraphQLNonNull(GraphQLString)
      },
      documents: {
        type: GraphQLList(documentsInfo),
      },
      labels: {
        type: GraphQLList(GraphQLID),
      }
    },
    resolve: async (_: any, { user_id, applicationID, description, support, deadline, documents, labels }: any) => {
      // Application - NEW DATE
      const new_date = new Date().toISOString().split(/[T.]+/, 2).join(' ');

      // Application - NEW STATUS
      const newStatusID = await db
        .select()
        .table(APPLICATION_STATUS_TABLE_NAME)
        .where({ order:1 })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

      // Application - OLD DOCUMENTS
      const userDocuments = await db.select().table(DOCUMENT_TABLE_NAME).where({ user_id: user_id });

      const listUserDocumentTypes = userDocuments.map((element: any) => {
        const newElement: any = element.file_type_id;
        return newElement;
      });

      const listUserDocumentsIDs = userDocuments.map((element: any) => {
        const newElement: any = element.id;
        return newElement;
      });

      // Application - UPDATE
      await db
        .transaction(async (trx) => {

          // Application - NEW Status, Description, Support, etc.
          await trx(APPLICATION_TABLE_NAME).update({
              updated_at: new_date, 
              application_status_id: newStatusID[0].id, 
              description: description, 
              support: support, 
              deadline: deadline 
            }).where({id: applicationID});

          // Application - NEW DOCUMENTS
          const docsToBeUpdated = documents.filter((element: any) => listUserDocumentTypes.includes(element.id)).map((filteredElement: any) => {
            const idx = userDocuments.findIndex((x) => x.file_type_id === filteredElement.id)
            const newElement: any = {
              type_name: filteredElement.type_name,
              field: filteredElement.field,
              file_name: filteredElement.file_name,
              document_id: listUserDocumentsIDs[idx],
            };
              return newElement;
            }
          );

          await Promise.all(
            docsToBeUpdated.map(async (element: any) => {
              await trx(DOCUMENT_TABLE_NAME).update({
                file_name: element.file_name,
                url: element.field,
              }).where({ id: element.document_id });
            }),
          );

          // Application - OLD LABELS
          await trx
            .table(APPLICATION_LABEL_TABLE_NAME)
            .where({ application_id: applicationID })
            .del()
            .catch((error: Error) => {
              console.error(error);
              throw new GraphQLError(error.name);
            });

          // Application - NEW LABELS
          await Promise.all(
            labels.map(async (elem: any) => {
                await trx(APPLICATION_LABEL_TABLE_NAME)
                .insert({
                  application_id: applicationID,
                  label_id: elem,
                });
            }),
          );
        })
        .catch((error: Error) => {
          console.error(error);
          throw new GraphQLError(error.name);
        });

        return "Succesful application update";
    },
  },
};
