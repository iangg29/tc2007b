import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import ApplicationCheckPoint from "./general/components/Application/ApplicationCheckPoint";

interface Props {
  status: any;
}

const ApplicationView = ({ status }: Props) => {
  const [num, setNum] = useState(2);
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    if (status == "finalizado") {
      setNum(2);
    }

    setMyData([
      {
        label: "Documentos enviados",
        isOn: num >= 1,
        line: true,
      },
      {
        label: "Documentos Revisados",
        isOn: num >= 2,
        line: true,
      },
      {
        label: "Documentos aprobados",
        isOn: num >= 3,
        line: true,
      },
      {
        label: "Solicitud aprobada",
        isOn: num >= 4,
        line: false,
      },
    ]);
  }, []);

  return (
    <View className="flex flex-col pl-4 justify-start">
      <Text className=" text-4xl text-indigo-500 font-semibold py-4">Estatus</Text>

      <FlatList
        data={myData}
        renderItem={({ item }) => (
          <ApplicationCheckPoint isTurnOn={item.isOn} labelText={item.label} isLine={item.line}></ApplicationCheckPoint>
        )}
        keyExtractor={(item) => item.label}
      />
    </View>
  );
};

export default ApplicationView;
