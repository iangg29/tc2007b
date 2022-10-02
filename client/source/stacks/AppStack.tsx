// (c) Tecnologico de Monterrey 2022, rights reserved.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
