// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { PersistGate } from "redux-persist/integration/react";
import relayEnvironment from "./source/relay/RelayEnvironment";
import Login from "./source/screens/auth/Login";
import Landing from "./source/screens/general/Landing";
import { persistor, store } from "./source/store/store";
import axios from "axios";
import { API_URL } from "@env";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = API_URL;

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Landing" component={Landing} />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
