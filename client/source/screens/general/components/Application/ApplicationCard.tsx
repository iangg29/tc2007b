import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ApplicationListQuery, ApplicationListQuery$data } from "../__generated__/ApplicationListQuery.graphql";

interface Props {
  id: string;
  title: string;
}

const ApplicationCard = ({ id, title }: Props) => {
  return (
    <View className="flex flex-col justify-center text-center">
      <Text>Card de application</Text>
      <Text>{id}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default ApplicationCard;
