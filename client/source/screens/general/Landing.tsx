// (c) Tecnologico de Monterrey 2022, rights reserved.

import { API_URL } from "@env";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import CitationList from "../Citation/CitationList";
import UserApplicationView from "../applications/UserApplicationView";
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
