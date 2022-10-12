// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Feather, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { graphql, useLazyLoadQuery } from "react-relay";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import {
  ApplicationFormScreen2Query,
  ApplicationFormScreen2Query$data,
} from "./__generated__/ApplicationFormScreen2Query.graphql";
import {
  ApplicationFormScreenQuery,
  ApplicationFormScreenQuery$data,
} from "./__generated__/ApplicationFormScreenQuery.graphql";

interface labelsType {
  id: string;
  label_name: string;
  color: string;
}

const ApplicationFormScreen = ({ route }: any): JSX.Element => {
  const { itemId } = route.params;

  const user: any = useAppSelector(selectUser);

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
  //console.debug(citationDocuments);
  //console.debug(labels);

  const handlePress = () => {
    //console.log("Redirect to apply route");
    //setSelected(!selected);
  };

  const docTypes: any = citationDocuments?.map((item: any): any => {
    const newItem: any = { ...item, field: null, file_name: null };
    return newItem;
  });
  const [documents, setDocuments] = useState(docTypes);

  const pickDocument = async (id) => {
    let result = await DocumentPicker.getDocumentAsync({});
    //console.debug(result);
    const idx = documents.findIndex((x) => x.id === id);
    documents[idx].field = result.uri;
    console.debug(documents);
    setDocuments([...documents]);
  };

  const selected: any = labels?.map((item: any): labelsType | undefined => {
    const newItem: labelsType | undefined = {
      ...item,
      color: "#6b7280",
    };
    return newItem;
  });

  const [list, setList] = useState(selected);

  const changeBackground = (item) => {
    const myList = list;

    for (let x = 0; x < myList.length; x++) {
      if (myList[x].id === item.id) {
        myList[x].color = "#d1d5db";
        console.debug(myList);
        setList([...myList]);
      } else {
        myList[x].color = "#6b7280";
        setList([...myList]);
      }
    }
  };

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
        <Text className="text-base text-gray-800 font-medium m-2">Fecha límite</Text>
        <View className="p-2 pb-6">
          <DateTimePicker testID="dateTimePicker" mode="date" value={date} onChange={onChange} />
        </View>
        <FlatList
          scrollEnabled={false}
          data={documents}
          extraData={documents}
          renderItem={({ item, index }) => (
            <>
              <View className="flex flex-row flex-wrap content-between justify-between space-x-10">
                <View className="flex flex-col basis-1/3">
                  <Text className="text-base text-gray-800 font-medium m-2"> Sube tu {item.type_name} </Text>
                </View>
                <View className="flex flex-col basis-1/5">
                  <Feather name="upload" size={24} color="black" onPress={() => pickDocument(item.id)} />
                </View>
                <View className="flex flex-col basis-1/5">
                  {documents[index].field != null && <AntDesign name="check" size={24} color="green" />}
                </View>
              </View>
            </>
          )}
        />
        <Text className="text-base text-gray-800 font-medium m-2 mt-5"> Agrega etiquetas</Text>
        <View className="flex-row mx-4 pb-2 content-center justify-center">
          <FlatList
            horizontal
            initialNumToRender={3}
            data={list}
            extraData={list}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity onPress={() => changeBackground(item)}>
                  <Text
                    className="text-gray-50 px-3 py-1 mx-5 border-gray-500"
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      backgroundColor: item.color,
                      // backgroundColor: selected ? "#6b7280" : "#d1d5db",
                    }}>
                    {item.label_name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <View className="pb-2">
          <TouchableOpacity className="flex-row mx-4 mt-6 content-center justify-center space-x-10">
            <Text
              className="text-lg bg-main-100 text-gray-50 px-5 py-1 mx-2 border-gray-500"
              style={{ borderRadius: 20, overflow: "hidden" }}
              onPress={handlePress}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;
