// (c) Tecnologico de Monterrey 2022, rights reserved.
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { DocumentTypeType } from "./DocumentTypeType";
import { CitationType } from "./CitationType";

export const CitationDocumentType = new GraphQLObjectType({
  name: "CitationDocuments",
  description:
    "Document types required for a citation",
  fields: {
    citation: {
      type: GraphQLNonNull(CitationType),
      description: "Citation",
      },
    documentType: {
      type: GraphQLNonNull(DocumentTypeType),
      description: "Citation's Document Types",
    },
  },
});
