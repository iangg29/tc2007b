// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLErrorExtensions } from "graphql";

export const handleGraphQLError = (error: GraphQLErrorExtensions) => {
  if (!error.originalError) return error;
  const data = error.originalError.data;
  const message = error.message || "[GRAPHQL] An error occurred.";
  const code = error.originalError || 500;
  return {
    message,
    status: code,
    data,
  };
};
