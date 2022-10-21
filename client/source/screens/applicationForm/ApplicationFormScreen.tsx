// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Feather, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
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
  id?: string | null;
  type_name?: string | null;
  data?: any;
};

const ApplicationFormScreen = ({ route }: any): JSX.Element => {
  const { itemId } = route.params;

  const user: any = useAppSelector(selectUser);
  const user_id = user.id;

  const data: ApplicationFormScreenQuery$data = useLazyLoadQuery<ApplicationFormScreenQuery>(
    graphql`
      query ApplicationFormScreenQuery($id: ID!, $user_id: ID!) {
        findDocumentsByUserID(user_id: $user_id) {
          id
          file_name
          url
          documentType {
            id
            type_name
          }
        }

        labels {
          id
          label_name
        }

        citationDocuments(id: $id) {
          id
          type_name
        }
      }
    `,
    { id: itemId, user_id: user_id },
    { fetchPolicy: "network-only" },
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
          application_title
        }
      }
    `,
  );

  const { citationDocuments, labels, findDocumentsByUserID } = data;
  const UserDocuments = findDocumentsByUserID;
  const UserDocumentsTypeID: Array<string> = findDocumentsByUserID.map((d) => d.documentType.id);

  const docTypes: any = citationDocuments?.map((item: any): any => {
    const flag = UserDocumentsTypeID.indexOf(item.id);

    // No document
    let Field = null;
    let Data = null;

    if (flag > -1) {
      // User has the document
      const document = UserDocuments[flag];
      Field = document.url;
      Data = null;
    }

    const newItem: any = { ...item, field: Field, data: Data };
    return newItem;
  });

  const [documents, setDocuments] = useState(docTypes);

  const pickDocument = async (id) => {
    let result = await DocumentPicker.getDocumentAsync({});
    const idx = documents.findIndex((x) => x.id === id);
    documents[idx].data = result;
    setDocuments([...documents]);
  };

  const sendFiles = async (files): Promise<any> => {
    const formData = new FormData();
    files.forEach((element): any => formData.append(element.id, element.data));

    try {
      const res = await axios.post("/upload/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: AsyncStorage.getItem("token") as unknown as string,
        },
      });
      return res.data.paths;
    } catch (error: any) {
      console.error(error);
    }
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

  const [date, setDate] = useState(new Date());

  const today = new Date();
  const todayDate =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  // Show / Hide DatePicker
  const [deadline, setDeadline] = useState(todayDate);
  const [show, setShow] = useState(false);
  const showDatePicker = () => {
    setShow(true);
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      support: "",
      deadline: todayDate,
    },
  });

  const navigation = useNavigation();

  const onSubmitForm = async () => {
    const myLabels = list
      ?.filter((element: any) => element.color === "#d1d5db")
      .map((filteredElement: any) => {
        const newElement: any = filteredElement.id;
        return newElement;
      });

    const myTitle = getValues("title");
    const myDescription = getValues("description");
    const mySupport = getValues("support");
    const myDeadline = getValues("deadline");

    const myDocumentsData = documents
      .map((element): any => {
        return { data: element.data, id: element.id };
      })
      .filter((filteredElement: any) => filteredElement.data != null);
    const myDocumentsURL = documents
      .map((element): any => element.field)
      .filter((filteredElement: any) => filteredElement != null);

    let res;
    let myDocuments: documentsInfo[];

    if (myLabels?.length !== 0 && documents.length !== 0) {
      if (myDocumentsData.length + myDocumentsURL.length >= documents.length) {
        if (myDocumentsData.length > 0) {
          res = await sendFiles(myDocumentsData);
          let myNewDocuments: documentsInfo[] = res.map((element: any) => {
            return {
              field: element.path,
              id: element.id,
              type_name: "",
            };
          });

          const myDocumentsIDs = documents.map((element: any) => element.id);

          if (res.length < documents.length) {
            myNewDocuments = [
              ...documents
                .filter((element: any) => myDocumentsIDs.includes(element.id) && element.field != null)
                .map((myElement: any) => {
                  return {
                    field: myElement.field,
                    id: myElement.id,
                    type_name: myElement.type_name,
                  };
                }),
              ...myNewDocuments,
            ];
          }
          myDocuments = [...myNewDocuments];
        } else {
          myDocuments = [...documents];
        }

        commitMutation({
          variables: {
            title: myTitle as unknown as string,
            description: myDescription as unknown as string,
            support: mySupport as unknown as string,
            deadline: myDeadline as unknown as string,
            user_id: user.id as unknown as string,
            citation_id: itemId as unknown as string,
            documents: myDocuments as unknown as [documentsInfo],
            labels: myLabels as unknown as [string],
          },
          onCompleted: () => {
            Alert.alert("Creación de solicitud", "Tu solicitud fue creada con éxito", [
              {
                text: "Cerrar",
                onPress: () => console.debug("Cancel Pressed"),
                style: "cancel",
              },
              { text: "Aceptar", onPress: () => console.debug("OK Pressed") },
            ]);
            navigation.goBack();
          },
          onError: () => {
            console.debug("Error on mutation");
          },
        });
      } else {
        console.debug("Error 1");
      }
    } else {
      console.debug("Missing documents and/or labels");
    }
  };

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
            pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
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
            pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
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
            pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
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
              <View className="bg-gray-200 px-5 py-4 rounded-lg border border-gray-300">
                <TouchableOpacity onPress={showDatePicker}>
                  <Text className="text-gray-900 dark:text-gray-50 dark:bg-gray-700">{deadline}</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode="date"
                    value={date}
                    onChange={(event, selectedDate) => {
                      setShow(false);

                      const currentDate = selectedDate;
                      setDate(currentDate);

                      const myDate =
                        currentDate.getFullYear().toString() +
                        "-" +
                        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
                        "-" +
                        currentDate.getDate().toString().padStart(2, "0");

                      value = myDate;
                      setDeadline(value);
                      onChange(value);
                    }}
                  />
                )}
              </View>
            )}
          />
          <View className="px-3 py-2">
            {errors.deadline && <Text className="text-red-500">Ingresa una fecha válida.</Text>}
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={documents}
          extraData={documents}
          className="px-3"
          style={{ width: 500 }}
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
                  {documents[index].field != null || documents[index].data != null ? (
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
                    }}>
                    {item.label_name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <View className="px-3 py-2">
          {myLabels.length < 1 && <Text className="text-red-500">Selecciona una etiqueta.</Text>}
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
