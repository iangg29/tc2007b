// (c) Tecnologico de Monterrey 2022, rights reserved.

import { API_URL } from "@env";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { LandingQuery, LandingQuery$data } from "./__generated__/LandingQuery.graphql";
import CitationList from "./components/Citation/CitationList";
import UserApplicationView from "../UserApplicationView";
import ApplicationStatusView from "../ApplicationStatusView";
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Landing = () => {
  const navigation = useNavigation();

  return (
    <View>
      <ApplicationStatusView status={"finalizado"}></ApplicationStatusView>
    </View>
  );
};

export default Landing;
