import { Text, View, Image } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ApplicationListQuery, ApplicationListQuery$data } from "../__generated__/ApplicationListQuery.graphql";

interface Props {
  isTurnOn: boolean;
  labelText: string;
  isLine: string;
}

const ApplicationCheckPoint = ({ isTurnOn, labelText, isLine }: Props) => {
  return (
    <View>
      <View className="flex-row">
        <Text
          className={
            isTurnOn
              ? "rounded-full text-green-600 text-3xl font-bold bg-green-300"
              : "rounded-full text-gray-600 text-3xl font-bold  bg-slate-300"
          }>
          ✓
        </Text>
        <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">{labelText}</Text>
      </View>
      {!!isLine && (
        <View
          className={
            isTurnOn ? "flex-row border-l-8  border-green-300 h-10 " : "flex-row border-l-8  border-slate-300 h-10 "
          }></View>
      )}
    </View>
  );
};

export default ApplicationCheckPoint;
