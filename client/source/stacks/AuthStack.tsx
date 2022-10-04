// (c) Tecnologico de Monterrey 2022, rights reserved.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/general/Landing";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} />
    </Stack.Navigator>
  );
};
