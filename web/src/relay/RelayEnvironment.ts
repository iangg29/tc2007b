// (c) Tecnologico de Monterrey 2022, rights reserved.

import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import fetchGraphQL from "./FetchQuery";
import Cookies from "js-cookie";

const _DEV_ = process.env.NODE_ENV !== "production";

const fetchFunction = async (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): Promise<GraphQLResponse> => {
  const args = { request, variables, cacheConfig };
  const token = Cookies.get("token");
  return await fetchGraphQL({ ...args, token });
};

export type RelayEnvironmentProps = Environment;

/**
 * Relay environment helper class.
 */
class RelayEnvironment {
  config = {
    network: Network.create(fetchFunction),
    store: new Store(new RecordSource()),
  };

  environment: RelayEnvironmentProps = new Environment(this.config);

  constructor() {
    this.resetEnvironment();
  }

  /**
   * @return {RelayEnvironmentProps} Current relay environment.
   */
  getEnvironment(): RelayEnvironmentProps {
    return this.environment;
  }

  /**
   * Resets current relay environment.
   * @return {RelayEnvironmentProps} New relay environment
   */
  resetEnvironment(): RelayEnvironmentProps {
    if (_DEV_) console.debug("[RELAY] Environment instance initialized.");
    this.environment = new Environment(this.config);
    return this.environment;
  }
}

export default new RelayEnvironment();
