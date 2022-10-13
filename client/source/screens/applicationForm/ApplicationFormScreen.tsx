// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Feather, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import {
  ApplicationFormScreen2Query,
  ApplicationFormScreen2Query$data,
} from "./__generated__/ApplicationFormScreen2Query.graphql";
import { ApplicationFormScreenMutation } from "./__generated__/ApplicationFormScreenMutation.graphql";
import {
  ApplicationFormScreenQuery,
  ApplicationFormScreenQuery$data,
} from "./__generated__/ApplicationFormScreenQuery.graphql";

interface labelsType {
  id: string;
  label_name: string;
  color: string;
}

type documentsInfo = {
  field?: string | null;
  file_name?: string | null;
  id?: string | null;
  type_name?: string | null;
};

const ApplicationFormScreen = ({ route }: any): JSX.Element => {
  const { itemId } = route.params;
  // console.debug(itemId);

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

  const [commitMutation] = useMutation<ApplicationFormScreenMutation>(
    graphql`
      mutation ApplicationFormScreenMutation(
        $user_id: ID!
        $title: String!
        $description: String!
        $support: String!
        $deadline: String!
        $citation_id: ID!
        $documents: [documentsInfo]!
        $labels: [ID]!
      ) {
        createNewApplication(
          user_id: $user_id
          title: $title
          description: $description
          support: $support
          deadline: $deadline
          citation_id: $citation_id
          documents: $documents
          labels: $labels
        ) {
          id
          title
        }
      }
    `,
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
    documents[idx].file_name = result.name;
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

  const myLabels = list
    ?.filter((element: any) => element.color === "#d1d5db")
    .map((filteredElement: any) => {
      const newElement: any = filteredElement.id;
      return newElement;
    });

  console.debug(myLabels);

  const [date, setDate] = useState(new Date());

  // const onChangeDate = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setDate(currentDate);
  // };

  const today = new Date();
  const todayDate =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      support: "",
      deadline: todayDate,
    },
  });

  const onSubmitForm = (data) => console.debug(data);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-xl text-main-100 font-bold mx-2 mb-2">Completa lo siguiente</Text>
        <Text className="text-base text-gray-800 font-medium m-3">Título del proyecto</Text>
        <Controller
          control={control}
          name="title"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-200 px-5 py-4 mx-3 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <View className="px-3 py-2">
          {errors.title && <Text className="text-red-500">Es necesario llenar este campo.</Text>}
        </View>
        <Text className="text-base text-gray-800 font-medium m-3">Descripción</Text>
        <Controller
          control={control}
          name="description"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline
              numberOfLines={3}
              className="bg-gray-200 px-5 py-4 mx-3 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
              style={{ height: 80 }}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <View className="px-3 py-2">
          {errors.description && <Text className="text-red-500">Es necesario llenar este campo.</Text>}
        </View>
        <Text className="text-base text-gray-800 font-medium m-3">Apoyo Requerido</Text>
        <Controller
          control={control}
          name="support"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-200 px-5 py-4 mx-3 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <View className="px-3 py-2">
          {errors.support && <Text className="text-red-500">Es necesario llenar este campo.</Text>}
        </View>
        <Text className="text-base text-gray-800 font-medium m-3 mt-3">Fecha límite</Text>
        <View className="px-3 pb-4">
          <Controller
            control={control}
            name="deadline"
            rules={{
              required: true,
              validate: {
                date_check: (v) => v >= todayDate,
              },
            }}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                value={date}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate;
                  setDate(currentDate);

                  const myDate =
                    currentDate.getFullYear().toString() +
                    "-" +
                    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
                    "-" +
                    currentDate.getDate().toString().padStart(2, "0");

                  value = myDate;
                  onChange(value);
                  console.debug("today", todayDate);
                  console.debug("selected", value);
                }}
              />
            )}
          />
          <View className="px-3 py-2">
            {errors.deadline && <Text className="text-red-500">Ingresa una fecha válida.</Text>}
          </View>
          {/* <DateTimePicker testID="dateTimePicker" mode="date" value={date} onChange={onChangeDate} /> */}
        </View>
        <FlatList
          scrollEnabled={false}
          data={documents}
          extraData={documents}
          className="px-3"
          renderItem={({ item, index }) => (
            <>
              <View className="flex flex-row flex-wrap content-start justify-start space-x-3 mb-1">
                <View className="flex flex-col basis-1/2">
                  <Text className="text-start text-base text-gray-800 font-medium m-2">Sube tu {item.type_name}</Text>
                </View>
                <View className="flex flex-col basis-1/12 mx-4 my-2">
                  <Feather name="upload" size={24} color="black" onPress={() => pickDocument(item.id)} />
                </View>
                <View className="flex flex-col basis-1/12 my-2">
                  {documents[index].field != null ? (
                    <AntDesign name="check" size={24} color="green" />
                  ) : (
                    <AntDesign name="exclamationcircleo" size={24} color="#f5cb42" />
                  )}
                </View>
              </View>
            </>
          )}
        />
        <Text className="text-base text-gray-800 font-medium m-3 mt-5"> Agrega etiquetas</Text>
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
        <View className="px-3 py-2">
          {myLabels.length < 1 && <Text className="text-red-500">Selecciona una label.</Text>}
        </View>
        <View className="pb-2">
          <TouchableOpacity
            className="flex-row mx-4 mt-6 content-center justify-center space-x-10"
            onPress={handleSubmit(onSubmitForm)}>
            <Text
              className="text-lg bg-main-100 text-gray-50 px-5 py-1 mx-2 border-gray-500"
              style={{ borderRadius: 20, overflow: "hidden" }}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;
