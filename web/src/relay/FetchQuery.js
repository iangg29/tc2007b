// (c) Tecnologico de Monterrey 2022, rights reserved.

/**
 * Sends a POST request to the GraphQL endpoint.
 * @param text Request query
 * @param variables Request variables
 */
const genFetchQuery = async (text, variables) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });
  return await response.json();
};

export default genFetchQuery;
