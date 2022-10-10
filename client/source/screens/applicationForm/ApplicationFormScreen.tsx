// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ApplicationFormScreen = ({ route }: any): JSX.Element => {
  const { itemId } = route.params;
  return (
    <SafeAreaView>
      <Text> {JSON.stringify(itemId)} </Text>
      <Text className="text-xl text-main-100 font-bold mx-2 mb-2">Completa lo siguiente</Text>
      <Text className="text-base text-gray-800 font-medium m-2">Título del proyecto</Text>
      <TextInput className="bg-gray-200 px-5 py-4 mx-2 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300" />
      <Text className="text-base text-gray-800 font-medium m-2">Descripción</Text>
      <TextInput
        multiline
        numberOfLines={3}
        className="bg-gray-200 px-5 py-4 mx-2 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
        style={{ height: 80 }}
      />
      <Text className="text-base text-gray-800 font-medium m-2">Apoyo Requerido</Text>
      <TextInput className="bg-gray-200 px-5 py-4 mx-2 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300" />
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;
