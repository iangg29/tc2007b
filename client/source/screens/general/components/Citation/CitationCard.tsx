import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

interface Props {
  id: string;
  title: string;
}

const CitationCard = ({ id, title }: Props) => {
  return (
    <View className="flex flex-col justify-center text-center">
      <Text>Card de Citation</Text>
      <Text>{id}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default CitationCard;
