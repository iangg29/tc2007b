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
          "¡Tus documentación se han enviado con éxito! \n\nNos encontramos validando que los datos sean correctos.",
        );
        break;
      case "En corrección":
        setNum(2);
        setMessage("Algo salió mal con alguno de tus documentos.\n\nTe pedimos los vuelvas a subir.");
        break;
      case "Documentos aceptados":
        setNum(3);
        setMessage("Tus documentos parecen en orden. \nEstamos evaluando tu solicitud.");
        break;
      case "Rechazado":
        setNum(4);
        setMessage("Lo sentimos, tu solicitud ha sido rechazada.");
        break;
      case "Aceptado":
        setNum(5);
        setMessage(
          "Felicidades, tus solicitud ha sido aceptada. \nRecuerda subir la evidencia para justificar el apoyo.",
        );
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
        isOn: num === 6,
        line: true,
        disable: num === 4,
      },
      {
        label: "Solicitud terminada",
        isOn: num === 4 || num === 6,
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
        <Text className="pt-2 tracking-wide text-base text-gray-500 dark:text-white">Mi solicitud:</Text>
        <Text className="text-2xl font-semibold text-main-100">{title}</Text>
        <FlatList
          className="pt-4"
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

      <View className="flex flex-row content-center justify-center bg-blue-100 shadow-sm mx-auto rounded-xl mt-6 p-4">
        <Text className="font-medium text-cyan-900 text-md">{message}</Text>
      </View>
    </View>
  );
};

export default ApplicationStatusView;
