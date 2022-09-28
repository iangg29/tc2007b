// (c) Tecnologico de Monterrey 2022, rights reserved.

import { CacheConfig, GraphQLResponse, RequestParameters, Variables } from "relay-runtime";

const _DEV_ = process.env.NODE_ENV !== "production";

export interface FetchArgsProps {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  token?: string | null;
}

/**
 * Sends a POST request to the GraphQL endpoint.
 * @param args Fetching arguments to hit <Query/Mutation> w/token if found.
 */
const genFetchQuery = async (args: FetchArgsProps): Promise<GraphQLResponse> => {
  const { request, variables, token } = args;
  const fetchConfig = {
    method: "POST",
    headers: { Authorization: token ?? "", "Content-Type": "application/json" },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  if (_DEV_) console.debug(`[GRAPHQL] [FETCHING] ${process.env.REACT_APP_API_URL ?? ""}/graphql endpoint.`);
  if (_DEV_) console.debug(`[GRAPHQL] [QUERY] ${request.name}`);
  return await fetch(`${process.env.REACT_APP_API_URL ?? ""}/graphql`, fetchConfig)
    .then(async (response: Response) => await response.json())
    .catch((error) => {
      console.error(error);
    });
};

export default genFetchQuery;
