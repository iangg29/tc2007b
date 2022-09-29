import { Text, View, Image } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ApplicationListQuery, ApplicationListQuery$data } from "../__generated__/ApplicationListQuery.graphql";

interface Props {
  isTurnOn: boolean;
  labelText: string;
}

const ApplicationCheckLine = () => {
  return <View className="flex flex-row border-l-8 border-sky-500 h-10 "></View>;
};

export default ApplicationCheckLine;
