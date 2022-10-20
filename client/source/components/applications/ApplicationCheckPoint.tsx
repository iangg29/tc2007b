// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Text, View } from "react-native";

interface Props {
  isTurnOn: boolean;
  labelText: string;
  isLine: string;
  disable?: boolean;
}

const ApplicationCheckPoint = ({ isTurnOn, labelText, isLine, disable }: Props) => {
  if (disable) {
    return <View />;
  }

  return (
    <View>
      <View className="flex-row">
        <View className={`px-2 py-1 rounded-full ${isTurnOn ? " bg-green-300" : " bg-slate-300"}`}>
          <Text
            className={`rounded-full text-3xl font-bold ${
              isTurnOn ? " text-green-600  bg-green-300" : "text-gray-600  bg-slate-300"
            }`}>
            ✓
          </Text>
        </View>
        <Text className=" tracking-wide text-lg font-medium py-2 pl-2 text-slate-600">{labelText}</Text>
      </View>
      {!!isLine && (
        <View className={`flex-row border-l-8 ml-4 h-10 ${isTurnOn ? "border-green-300" : "border-slate-300 "}`} />
      )}
    </View>
  );
};

export default ApplicationCheckPoint;
