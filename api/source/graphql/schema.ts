// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import FAQQueries from "./queries/FAQQueries";
import UserQueries from "./queries/UserQueries";
import RoleQueries from "./queries/RoleQueries";
import CitationQueries from "./queries/CitationQueries";
import LabelQueries from "./queries/LabelQueries";
import ApplicationQueries from "./queries/ApplicationQueries";
import ApplicationStatusQueries from "./queries/ApplicationStatusQueries";
import ApplicationDocumentsQueries from "./queries/ApplicationDocumentsQueries";
import DocumentQueries from "./queries/DocumentQueries";
import DocumentTypeQueries from "./queries/DocumentTypeQueries";

// Mutations
import FAQMutations from "./mutations/FAQMutations";
import RoleMutations from "./mutations/RoleMutations";
import CitationMutations from "./mutations/CitationMutations";
import ApplicationMutations from "./mutations/ApplicationMutations";
import ApplicationStatusMutations from "./mutations/ApplicationStatusMutations";
import ApplicationDocumentsMutations from "./mutations/ApplicationDocumentsMutations";
import DocumentMutations from "./mutations/DocumentMutations";
import DocumentTypeMutations from "./mutations/DocumentTypeMutations";

/**
 * GraphQLObject that unifies every query that the application uses.
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Application's GraphQL root query.",
  fields: {
    ...UserQueries,
    ...RoleQueries,
    ...ApplicationQueries,
    ...ApplicationStatusQueries,
    ...FAQQueries,
    ...DocumentTypeQueries,
    ...CitationQueries,
    ...DocumentQueries,
    ...LabelQueries,
    ...ApplicationDocumentsQueries
  },
});

/**
 * GraphQLObject that unifies every mutation that the application uses.
 */
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Application's GraphQL root mutations",
  fields: {
    ...RoleMutations,
    ...ApplicationMutations,
    ...ApplicationStatusMutations,
    ...FAQMutations,
    ...DocumentMutations,
    ...ApplicationDocumentsMutations,
    ...CitationMutations,
    ...DocumentTypeMutations
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
