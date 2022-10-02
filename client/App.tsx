// (c) Tecnologico de Monterrey 2022, rights reserved.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { PersistGate } from "redux-persist/integration/react";
import relayEnvironment from "./source/relay/RelayEnvironment";
import { persistor, store } from "./source/store/store";
import axios from "axios";
import { API_URL } from "@env";
import { NavigatorHandler } from "./source/containers/NavigatorHandler";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = API_URL;

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
            <NavigatorHandler />
          </PersistGate>
        </Provider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
