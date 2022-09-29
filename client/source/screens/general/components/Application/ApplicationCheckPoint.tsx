import { Text, View, Image } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ApplicationListQuery, ApplicationListQuery$data } from "../__generated__/ApplicationListQuery.graphql";

interface Props {
  isTurnOn: boolean;
  labelText: string;
}

const ApplicationCheckPoint = ({ isTurnOn, labelText }: Props) => {
  return (
    <View className="flex flex-row">
      <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">{isTurnOn ? "On" : "Off"}</Text>
      <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">{labelText}</Text>
    </View>
  );
};

export default ApplicationCheckPoint;
