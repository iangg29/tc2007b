import { API_URL } from "@env";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>This is the landing page</Text>
      <View className="flex-row justify-between mx-10">
        <Text>The env variable is</Text>
        <Text>{`${API_URL}`}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Landing;
