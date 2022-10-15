// (c) Tecnologico de Monterrey 2022, rights reserved.
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

import { graphql, useLazyLoadQuery, useMutation } from "react-relay";

import { ApplicationEditScreenQuery, ApplicationEditScreenQuery$data} from "./__generated__/ApplicationEditScreenQuery.graphql";

// Screen to edit an application [send to corrections]
const ApplicationEditScreen = ({route}: any): JSX.Element => {
  const { itemId } = route.params;
  
  const data: ApplicationEditScreenQuery$data = useLazyLoadQuery<ApplicationEditScreenQuery>(
    graphql`
      query ApplicationEditScreenQuery($id: ID!) {
        applicationByID(id: $id) {
          id
          title
          description
          support
          deadline
        }
      }
    `,
    { id: itemId },
  );

  const { applicationByID } = data;

  // Today'S Date / SET Date
  const [date, setDate] = useState(new Date()); // Date
  const [deadline, setDeadline] = useState(applicationByID.deadline); // String
  
  const today = new Date();
  const todayDate =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  
  // Show / Hide DatePicker
  const [show, setShow] = useState(false);
  const showDatePicker = () => {
    setShow(true);
  };

  // ------------------------------------------
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: applicationByID.description,
      support: applicationByID.support,
      deadline: todayDate,
    },
  });

  const navigation = useNavigation();

  const onSubmitForm = () => {
    // FOR LATER
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Editable attributes of the application */}
        <Text className="text-xl text-main-100 font-bold mx-2 mb-2">Edita tu solicitud</Text>
        <Text className="text-base text-gray-600 text-sm text-justify pr-4 pl-2">Tu solicitud fue enviada a correciones. Revisa y haz los cambios que consideres necesarios. Y, <Text className="font-bold">asegúrate que la información de tus documentos esté actualizada</Text> o sea la correcta.</Text>
        {/* Title */}
        <Text className="text-base text-gray-800 font-medium m-3">Título del proyecto</Text>
        <TextInput
          className="bg-gray-200 px-5 py-4 mx-3 rounded-lg text-gray-500 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
          value={applicationByID.title} editable={false}
        />
        {/* Description */}
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
              style={{ height: 100 }}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <View className="px-3 py-2">
          {errors.description && <Text className="text-red-500">Es necesario llenar este campo.</Text>}
        </View>
        {/* Support */}
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
              multiline
              numberOfLines={3}
              className="bg-gray-200 px-5 py-4 mx-3 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border border-gray-300"
              style={{ height: 100 }}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <View className="px-3 py-2">
          {errors.support && <Text className="text-red-500">Es necesario llenar este campo.</Text>}
        </View>
        {/* Deadline */}
        <Text className="text-base text-gray-800 font-medium m-3 mt-3">Fecha límite</Text>
        <View className="px-3 pb-2">
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
                  <Text className="text-gray-900 dark:text-gray-50 dark:bg-gray-700">{deadline? deadline : "Sin fecha límite"}</Text>
                </TouchableOpacity>
                {show && <DateTimePicker
                  testID="dateTimePicker"
                  mode="date"
                  value={new Date(value)}
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
                    setDeadline(myDate);
                    onChange(value);
                  }}
                />}
              </View>
            )}
          />
          <View className="px-3 py-2">
            {errors.deadline && <Text className="text-red-500">Ingresa una fecha válida.</Text>}
          </View>
        </View>
        <View className="pb-6">
          <TouchableOpacity
            className="flex-row mx-4 mt-2 content-center justify-center space-x-10"
            onPress={handleSubmit(onSubmitForm)}>
            <Text
              className="text-lg bg-main-100 text-gray-50 px-5 py-1 mx-2 border-gray-500"
              style={{ borderRadius: 20, overflow: "hidden" }}>
              Guardar cambios
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default ApplicationEditScreen;
