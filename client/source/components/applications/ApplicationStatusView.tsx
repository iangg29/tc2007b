// (c) Tecnologico de Monterrey 2022, rights reserved.

import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";

import ApplicationCheckPoint from "./ApplicationCheckPoint";

interface Props {
  title: string;
  status: string;
}

const ApplicationStatusView = ({ status, title }: Props) => {
  const [num, setNum] = useState(0);
  const [myData, setMyData] = useState([]);
  const [message, setMessage] = useState("");

  const setStatus = (status: string) => {
    switch (status) {
      case "Pendiente de revisión":
        setNum(1);
        setMessage(
          "Tus documentación se ha enviado con éxito.\nEstamos revisando que correspondan con su descripción.",
        );
        break;
      case "En corrección":
        setNum(2);
        setMessage("Algo salió mal con alguno de tus documentos. Te pedimos los vuelvas a subir.");
        break;
      case "Documentos aceptados":
        setNum(3);
        setMessage("Tus documentos parecen en orden. Estamos evaluando tu solicitud.");
        break;
      case "Rechazado":
        setNum(4);
        setMessage("Lo sentimos, tu solicitud ha sido rechazada.");
        break;
      case "Aceptado":
        setNum(5);
        setMessage("Feliciades, tus solicitud a sido aceptada. Recuerda subir la evidencia para justificar el apoyo.");
        break;
      case "Finalizado":
        setNum(6);
        setMessage("Hemos recibido tu evidencia.");
        break;
      default:
        setNum(-1);
    }
  };
  const createData = () => {
    setMyData([
      {
        label: "Documentos enviados",
        isOn: num >= 1,
        line: true,
      },
      {
        label: "Documentos aprobados",
        isOn: num >= 3,
        line: true,
      },
      {
        label: "Resultado de la solicitud",
        isOn: num >= 4,
        line: true,
      },
      {
        label: "Evidencia del apoyo enviada",
        isOn: num == 6,
        line: true,
        disable: num == 4,
      },
      {
        label: "Solicitud terminada",
        isOn: num == 4 || num == 6,
        line: false,
      },
    ]);
  };

  useEffect(() => {
    setStatus(status);
    createData();
  }, [num]);

  return (
    <View>
      <View className="flex flex-col pl-4 justify-start">
        <Text className=" text-4xl text-indigo-500 font-semibold py-4">Solicitud: {title}</Text>

        <FlatList
          data={myData}
          renderItem={({ item }) => (
            <ApplicationCheckPoint
              isTurnOn={item.isOn}
              labelText={item.label}
              isLine={item.line}
              disable={item.disable}
            />
          )}
          keyExtractor={(item) => item.label}
        />
      </View>

      <View className="bg-blue-100  shadow-lg mx-auto rounded-xl m-6 ">
        <Text className="font-semibold text-indigo-500 text-lg m-4 ">{message}</Text>
      </View>
    </View>
  );
};

export default ApplicationStatusView;
