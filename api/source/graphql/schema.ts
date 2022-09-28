// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import UserQueries from "./queries/UserQueries";
import RoleQueries from "./queries/RoleQueries";
import RoleMutations from "./mutations/RoleMutations";
import ApplicationStatusQueries from "./queries/ApplicationStatusQueries";
import ApplicationDocumentsQueries from "./queries/ApplicationDocumentsQueries";
import ApplicationDocumentsMutations from "./mutations/ApplicationDocumentsMutations";
import FAQQueries from "./queries/FAQQueries";
import DocumentTypeQueries from "./queries/DocumentTypeQueries";
import DocumentQueries from "./queries/DocumentQueries";
import DocumentMutations from "./mutations/DocumentMutations";
import CitationQueries from "./queries/CitationQueries";
import LabelQueries from "./queries/LabelQueries";
import ApplicationQueries from "./queries/ApplicationQueries";
import ApplicationMutation from "./mutations/ApplicationMutations";
import ApplicationStatusMutations from "./mutations/ApplicationStatusMutations";
import AuthMutations from "./mutations/AuthMutations";
import UserMutations from "./mutations/UserMutations";
import FAQMutations from "./mutations/FAQMutations";

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
    ...DocumentQueries,
    ...CitationQueries,
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
    ...UserMutations,
    ...RoleMutations,
    ...ApplicationMutation,
    ...AuthMutations,
    ...ApplicationStatusMutations,
    ...FAQMutations,
    ...DocumentMutations,
    ...ApplicationDocumentsMutations
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
