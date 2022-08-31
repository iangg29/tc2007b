import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="bg-gray-50 dark:bg-gray-900 h-screen">
      <View className="items-center p-10 bg-cyan-100 dark:bg-cyan-800">
        <Text className="font-black text-3xl">Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
