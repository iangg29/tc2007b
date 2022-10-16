// (c) Tecnologico de Monterrey 2022, rights reserved.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "../components/navigator/TabsNavigator";
import ApplicationForm from "../screens/applicationForm/ApplicationFormScreen";
import ApplicationEdit from "../screens/applicationEdit/ApplicationEditScreen";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ApplicationForm" component={ApplicationForm} />
      <Stack.Screen name="Editar solicitud" component={ApplicationEdit} />
    </Stack.Navigator>
  );
};
