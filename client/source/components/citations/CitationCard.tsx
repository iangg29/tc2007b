// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import AppStack from "../../stacks/AppStack";

interface Props {
  id: string;
  title: string;
}

const CitationCard = ({ id, title }: Props) => {
  const navigation = useNavigation();
  const handleApply = () => {
    //console.log("Redirect to apply route");
    navigation.navigate("ApplicationForm");
  };

  return (
    <View className="max-w mb-4 bg-white rounded-xl shadow-md overflow-hidden ">
      <View>
        <Image className="h-32 w-full object-cover" source={{ uri: "https://reactjs.org/logo-og.png" }} />
      </View>
      <View className="p-4">
        <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">Convocatoria: </Text>
        <View className="flex flex-row justify-between ">
          <Text className="text-lg mt-1 text-slate-500">{title}</Text>
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
