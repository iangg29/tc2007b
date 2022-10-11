// (c) Tecnologico de Monterrey 2022, rights reserved.
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

interface Props {
  id: string;
  title: string;
  end_date: string;
}

const CitationCard = ({ id, title, end_date }: Props) => {
  const handleApply = () => {
    //console.log("Redirect to apply route");
  };

  return (
    <View className="max-w my-2 mx-4 bg-white rounded-xl shadow-md overflow-hidden border ">
      <View>
        <Image className="h-32 w-full object-cover" source={{ uri: "https://reactjs.org/logo-og.png" }} />
      </View>
      <View className="m-2 flex-row justify-between space-x-2">
        <View className="text-left">
          <Text className=" tracking-wide text-md  dark:text-white">Convocatoria: </Text>
          <Text className="text-lg font-medium text-slate-600">{title}</Text>
          <Text className=" tracking-wide text-md  dark:text-white">Fecha límite: </Text>
          <Text className="text-lg font-medium text-slate-600">{end_date.split(" ")[0]}</Text>
        </View>

        <View className="justify-end ">
          <TouchableOpacity onPress={handleApply}>
            <Text className="text-lg mt-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold  px-4 border border-gray-400 rounded shadow">
              Ver documento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleApply}>
            <Text className="text-lg mt-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold  px-4 border border-gray-400 rounded shadow">
              Aplicar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CitationCard;
