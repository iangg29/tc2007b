import { API_URL } from "@env";
import { CacheConfig, GraphQLResponse, RequestParameters, Variables } from "relay-runtime";

export type FetchArgProps = {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  token?: string | null;
};

const fetchGraphQL = async (args: FetchArgProps): Promise<GraphQLResponse> => {
  const { request, variables, token } = args;
  const fetchConfig = {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  console.debug(`[FETCHING] ${API_URL + "/graphql"} endpoint.`);
  return fetch(API_URL + "/graphql", fetchConfig).then((response) => response.json());
};

export default fetchGraphQL;
