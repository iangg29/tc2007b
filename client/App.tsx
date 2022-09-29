// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { Text } from "react-native";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import relayEnvironment from "./source/relay/RelayEnvironment";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./source/store/store";
import { Provider } from "react-redux";
import Login from "./source/screens/auth/Login";
import Landing from "./source/screens/general/Landing";
import { Authenticated } from "./source/containers/Authenticated";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Authenticated stack={Stack}>
                  <Stack.Screen name="Landing" component={Landing} />
                </Authenticated>
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
