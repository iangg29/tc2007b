// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, TouchableOpacity, Linking } from "react-native";

interface Props {
  data_citation: {
    id: string;
    citation_title: string;
    citation_description: string;
    citation_document: string;
    end_date: string;
  };
}

const CitationCard = ({ data_citation }: Props) => {
  const navigation = useNavigation();

  const handleApply = () => {
    navigation.navigate("ApplicationForm", { itemId: data_citation.id });
  };

  return (
    <View className="max-w my-2 mx-4 bg-white rounded-xl overflow-hidden border border-gray-300">
      <View>
        <Image
          className="h-32 w-full object-cover"
          source={{
            uri: data_citation.citation_description,
          }}
        />
      </View>
      <View className="m-2 flex-row justify-between space-x-2">
        <View className="text-left">
          <Text className="tracking-wide text-xs text-gray-600  dark:text-gray-100">Convocatoria: </Text>
          <Text className="text-lg font-semibold text-gray-700 mb-2">{data_citation.citation_title}</Text>
          <Text className="tracking-wide text-xs text-gray-600 dark:text-gray-100">Fecha límite: </Text>
          <Text className="text-base font-semibold text-gray-700">{data_citation.end_date.split(" ")[0]}</Text>
        </View>
      </View>

      <View className="mx-2 flex-row content-center justify-center space-x-5 mb-5">
        <TouchableOpacity
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
          onPress={() => Linking.openURL(data_citation.citation_document)}>
          <Text className="text-lg text-gray-800 font-semibold px-4 py-1">Ver documento</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-main-100 border border-gray-200 rounded-lg shadow-sm" onPress={handleApply}>
          <Text className="text-lg text-gray-100 font-semibold px-4 py-1">Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CitationCard;
