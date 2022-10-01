// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLSchema } from "graphql";
import UserQueries from "./queries/UserQueries";
import RoleQueries from "./queries/RoleQueries";
import RoleMutations from "./mutations/RoleMutations";
import ApplicationStatusQueries from "./queries/ApplicationStatusQueries";
import FAQQueries from "./queries/FAQQueries";
import FAQMutations from "./mutations/FAQMutations";
import DocumentTypeQueries from "./queries/DocumentTypeQueries";
import DocumentQueries from "./queries/DocumentQueries";
import CitationQueries from "./queries/CitationQueries";
import LabelQueries from "./queries/LabelQueries";
import ApplicationQueries from "./queries/ApplicationQueries";
import ApplicationMutation from "./mutations/ApplicationMutation";

import CitationMutation from "./mutations/CitationMutation";
import DocumentMutation from "./mutations/DocumentMutation";
import DocumentTypeMutation from "./mutations/DocumentTypeMutation";
/**
 * GraphQLObject that unifies every query that the application uses.
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Application's GraphQL root query.",
  fields: {
    ...UserQueries,
    ...RoleQueries,
    ...ApplicationStatusQueries,
    ...FAQQueries,
    ...DocumentTypeQueries,
    ...CitationQueries,
    ...DocumentQueries,
    ...LabelQueries,
    ...ApplicationQueries,
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
    ...ApplicationMutation,
    ...CitationMutation,
    ...DocumentMutation,
    ...DocumentTypeMutation,
    ...FAQMutations,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default schema;
