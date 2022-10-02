// (c) Tecnologico de Monterrey 2022, rights reserved.

import ApplicationStatusView from "../applications/ApplicationStatusView";
import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Landing = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Landing</Text>
      <ApplicationStatusView status={"finalizado"}></ApplicationStatusView>
    </View>
  );
};

export default Landing;
