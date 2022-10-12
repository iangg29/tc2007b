// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Linking } from "react-native";
interface Props {
  filename: string;
  updated: string;
  link: string;
}

const UserDocs = ({ filename, updated, link }: Props): JSX.Element => {
  return (
    <View className="w-80 flex flex-row space-x-4 pt-4 pb-2 border-b-2">
      <View className="w-60 flex flex-row">
        <Text className="text-base">{filename}</Text>
      </View>
      <View className="w-fit flex flex-row pl-0">
        <Ionicons
          className="place-items-end"
          name="eye"
          size={30}
          color="#252d53"
          onPress={() => Linking.openURL(link)}
        />
      </View>
    </View>
  );
};

export default UserDocs;
