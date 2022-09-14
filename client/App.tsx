import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { Text } from "react-native";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import relayEnvironment from "./source/relay/RelayEnvironment";
import { iRoute, Routes } from "./source/routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <NavigationContainer>
          <Stack.Navigator>
            {Routes.map((route: iRoute, idx: number) => (
              <Stack.Screen key={idx} name={route.name} component={route.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
