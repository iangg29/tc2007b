// (c) Tecnologico de Monterrey 2022, rights reserved.

import { API_URL } from "@env";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { PersistGate } from "redux-persist/integration/react";
import { NavigatorHandler } from "./source/containers/NavigatorHandler";
import relayEnvironment from "./source/relay/RelayEnvironment";
import { persistor, store } from "./source/store/store";

axios.defaults.baseURL = API_URL;

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
            <StatusBar style="dark" />
            <NavigatorHandler />
          </PersistGate>
        </Provider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
