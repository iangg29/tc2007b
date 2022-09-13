import { RelayEnvironmentProvider } from "react-relay/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./source/screens/general/Landing";
import relayEnvironment from "./source/relay/RelayEnvironment";
import React, { Suspense } from "react";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment.getEnvironment()}>
      <Suspense fallback={<Text>Loading application...</Text>}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} />
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
