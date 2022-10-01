// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';


const ApplicationsScreen = ({navigation}): JSX.Element => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center space-y-10 px-10">
          <Text>ApplicationsScreen</Text>
          <TouchableOpacity
     className=" bg-sky-800 px-7 py-3"

            style={{
              borderRadius: 100,
            }}>
            <Text
              style={{
                color: "white",
                fontSize: 40,
                justifyContent: "center",
                alignItems: "center",
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ApplicationsScreen;
