// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text } from "react-native";

import CitationList from "../../components/citations/CitationList";

const HomeScreen = (): JSX.Element => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <CitationList />
    </View>
  );
};

export default HomeScreen;
