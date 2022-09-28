// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "./ApplicationType";
import { DocumentType } from "./DocumentType";


export const ApplicationDocumentType = new GraphQLObjectType({
  name: "ApplicationDocument",
  description:
    "Application - Document model, contains all the information related to application's documentation",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "ApplicationDocument ID",
    },
    // application: {
    //   type: GraphQLNonNull(ApplicationType),
    //   description: "Application associated with the documents",
    // },
    // document: {
    //   type: GraphQLNonNull(DocumentType),
    //   description: "Documents associated to an specific application",
    // },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Date in which document was assigned to the application",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Date in which document was last updated",
    },
     // Foreign keys
    application_id: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application ID",
    },
    document_id: {
      type: GraphQLNonNull(GraphQLString),
      description: "Document ID",
    }
  },
});