// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Environment, FetchFunction, Network, RecordSource, Store } from "relay-runtime";
import genFetchQuery from "./FetchQuery";

/**
 * Make a request to the APIs GraphQL endpoint.
 * @param params Request parameters.
 * @param variables Request variables.
 */
const fetchRelay = async (params: { name: string; text: string }, variables: any): Promise<any> => {
  console.debug(`[DEBUG] [GRAPHQL] Fetching query ${params.name} with variables: ${JSON.stringify(variables)}`);
  return await genFetchQuery(params.text, variables);
};

/**
 * Creates a new relay environment.
 */
export default new Environment({
  network: Network.create(fetchRelay as unknown as FetchFunction),
  store: new Store(new RecordSource()),
});
