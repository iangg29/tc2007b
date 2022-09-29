import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import ApplicationCheckPoint from "./general/components/Application/ApplicationCheckPoint";
import ApplicationCheckLine from "./general/components/Application/ApplicationCheckLine";

interface Props {
  status: any;
}

const ApplicationView = ({ status }: Props) => {
  const [num, setNum] = useState<Number>(0);

  const text_status = ["Documentos enviados", "Documentos Revisados", "Documentos aprobados", "Solicitud aprobada"];
  useEffect(() => {
    if (status == "finalizado") {
      setNum(2);
    }
  }, []);

  return (
    <View className="flex flex-col pl-4 justify-start">
      <Text className=" text-4xl text-indigo-500 font-semibold py-4">Estatus</Text>
      <ApplicationCheckPoint isTurnOn={num >= 1} labelText={text_status[0]}></ApplicationCheckPoint>
      <ApplicationCheckLine></ApplicationCheckLine>
      <ApplicationCheckPoint isTurnOn={num >= 2} labelText={text_status[1]}></ApplicationCheckPoint>
      <ApplicationCheckLine></ApplicationCheckLine>
      <ApplicationCheckPoint isTurnOn={num >= 3} labelText={text_status[2]}></ApplicationCheckPoint>
      <ApplicationCheckLine></ApplicationCheckLine>
      <ApplicationCheckPoint isTurnOn={num >= 4} labelText={text_status[3]}></ApplicationCheckPoint>
    </View>
  );
};

export default ApplicationView;
