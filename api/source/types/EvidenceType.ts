// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "./ApplicationType";
import { DocumentType } from "./DocumentType";

export const EvidenceType = new GraphQLObjectType({
  name: "Evidence",
  description: "Evidence model, contains all the specifications of the evidence of an application",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Evidence's ID",
    },
    impact: {
        type: GraphQLNonNull(GraphQLString),
        description: "Application's impact",
    },
    application: {
      type: GraphQLNonNull(ApplicationType),
      description: "Application associated to the evidence",
    },
    document: {
        type: GraphQLNonNull(DocumentType),
        description: "Evidence's document",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Evidence's creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time evidence got updated",
    },
  },
});
