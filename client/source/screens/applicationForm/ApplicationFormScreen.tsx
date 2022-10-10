// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { graphql, useLazyLoadQuery } from "react-relay";

import {
  ApplicationFormScreen2Query,
  ApplicationFormScreen2Query$data,
} from "./__generated__/ApplicationFormScreen2Query.graphql";
import {
  ApplicationFormScreenQuery,
  ApplicationFormScreenQuery$data,
} from "./__generated__/ApplicationFormScreenQuery.graphql";

const ApplicationFormScreen = ({ route }: any): JSX.Element => {
  const { itemId } = route.params;

  const data: ApplicationFormScreenQuery$data = useLazyLoadQuery<ApplicationFormScreenQuery>(
    graphql`
      query ApplicationFormScreenQuery($id: ID!) {
        citationDocuments(id: $id) {
          id
          type_name
        }
      }
    `,
    { id: itemId },
  );

  const labelsData: ApplicationFormScreen2Query$data = useLazyLoadQuery<ApplicationFormScreen2Query>(
    graphql`
      query ApplicationFormScreen2Query {
        labels {
          id
          label_name
        }
      }
    `,
    {},
  );

  const { citationDocuments } = data;
  const { labels } = labelsData;
  console.debug(citationDocuments);
  console.debug(labels);

  const handlePress = () => {
    //console.log("Redirect to apply route");
  };

  return (
    <SafeAreaView>
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
      <TextInput className="bg-gray-200 px-5 py-4 mx-2 mb-3 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300" />
      <FlatList
        data={data?.citationDocuments}
        renderItem={({ item }) => (
          <>
            <View className="flex-row content-between justify-between space-x-10">
              <View className="flex-1 space-y-2 mb-2">
                <Text className="text-base text-gray-800 font-medium m-2"> Sube tu {item.type_name} </Text>
              </View>
              <View className="flex-1 space-y-2 py-2">
                <Feather name="upload" size={24} color="black" onPress={handlePress} />
              </View>
            </View>
          </>
        )}
      />
      <Text className="text-base text-gray-800 font-medium m-2 mt-5"> Agrega etiquetas</Text>
      <View className="flex-row mx-4 content-center justify-center">
        <FlatList
          horizontal
          initialNumToRender={3}
          data={labelsData?.labels}
          renderItem={({ item }) => (
            <Text
              className="bg-gray-500 text-gray-50 px-3 py-1 mx-5 border-gray-500"
              style={{ borderRadius: 10, overflow: "hidden" }}
              onPress={handlePress}>
              {item.label_name}
            </Text>
          )}
        />
      </View>
      <View className="flex-row mx-4 mt-6 content-center justify-center space-x-10">
        <Text
          className="text-lg bg-main-100 text-gray-50 px-5 py-1 mx-2 border-gray-500"
          style={{ borderRadius: 20, overflow: "hidden" }}
          onPress={handlePress}>
          Enviar
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;
