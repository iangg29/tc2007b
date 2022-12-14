// (c) Tecnologico de Monterrey 2022, rights reserved.

import AsyncStorage from "@react-native-async-storage/async-storage";
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

import fetchGraphQL from "./fetchGraphQL";

const __DEV__ = process.env.NODE_ENV !== "production";

const fetchFunction = async (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): Promise<GraphQLResponse> => {
  const args = { request, variables, cacheConfig };
  return AsyncStorage.getItem("token").then((token: string | null) => {
    return fetchGraphQL({ ...args, token });
  });
};

export type RelayEnvironmentProps = Environment;

class RelayEnvironment {
  config = {
    network: Network.create(fetchFunction),
    store: new Store(new RecordSource()),
  };

  environment: RelayEnvironmentProps = new Environment(this.config);

  constructor() {
    this.resetEnvironment();
  }

  getEnvironment(): RelayEnvironmentProps {
    return this.environment;
  }

  resetEnvironment(): RelayEnvironmentProps {
    if (__DEV__) console.debug("Relay environment instance initialized.");
    this.environment = new Environment(this.config);
    return this.environment;
  }
}

export default new RelayEnvironment();
