// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ApplicationsScreen from "../../screens/applications/ApplicationsScreen";
import ChatScreen from "../../screens/chat/ChatScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 78,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-home" size={30} color="#111932" />,
        }}
      />

      <Tab.Screen
        name="Mis solicitudes"
        component={ApplicationsScreen}
        options={{
          tabBarIcon: () => <Ionicons name="document-text" size={30} color="#111932" />,
        }}
      />

      <Tab.Screen
        name="ChatBot"
        component={ChatScreen}
        options={{
          tabBarIcon: () => <Ionicons name="chatbubbles" size={30} color="#111932" />,
        }}
      />

      <Tab.Screen
        name="Mi Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Ionicons name="person-circle" size={30} color="#111932" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
