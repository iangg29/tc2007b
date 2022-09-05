// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLError, GraphQLFormattedError } from "graphql";

export const handleGraphQLError = (error: GraphQLError): GraphQLFormattedError => {
  if (!error.originalError) return error;
  const message = error.message || "[GRAPHQL] An error occurred.";
  //const code = error.originalError || 500;
  return {
    message,
    path: error.path,
    locations: error.locations,
  };
};
