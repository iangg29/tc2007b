// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Text, View, Image } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

interface Props {
  id: string;
  title: string;
}

const CitationCard = ({ id, title }: Props) => {
  return (
    <View className="max-w mb-4 bg-white rounded-xl shadow-md overflow-hidden ">
      <View>
        <Image className="h-32 w-full object-cover" source={{ uri: "https://reactjs.org/logo-og.png" }} />
      </View>
      <View className="p-4">
        <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">Solicitud: {title}</Text>
        <View className="flex flex-row justify-between ">
          <Text className="text-lg mt-1 text-slate-500">Convocatoria</Text>
          <Text className="text-lg mt-1 text-slate-500">Estado:</Text>
        </View>
      </View>
    </View>
  );
};

export default CitationCard;