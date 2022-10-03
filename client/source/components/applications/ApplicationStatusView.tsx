import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import ApplicationCheckPoint from "./ApplicationCheckPoint";

interface Props {
  status: string;
}

const ApplicationStatusView = ({ status }: Props) => {
  const [num, setNum] = useState(0);
  const [myData, setMyData] = useState([]);
  const [message, setMessage] = useState("");

  const setStatus = (status: string) => {
    switch (status) {
      case "documentos enviados":
        setNum(1);
        setMessage(
          "Tus documentación se ha enviado con éxito.\nEstamos revisando que correspondan con su descripción.",
        );
        break;
      case "en correccion":
        setNum(2);
        setMessage("Algo salió mal con alguno de tus documentos. Te pedimos los vuelvas a subir.");
        break;
      case "documentos aceptados":
        setNum(3);
        setMessage("Tus documentos parecen en orden. Estamos evaluando tu solicitud.");
        break;
      case "rechazada":
        setNum(4);
        setMessage("Lo sentimos, tu solicitud ha sido rechazada.");
        break;
      case "aceptada":
        setNum(5);
        setMessage("Feliciades, tus solicitud a sido aceptada. Recuerda subir la evidencia para justificar el apoyo.");
        break;
      case "finalizada":
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
        <Text className=" text-4xl text-indigo-500 font-semibold py-4">
          Status: {status}
          Num: {num}
        </Text>

        <FlatList
          data={myData}
          renderItem={({ item }) => (
            <ApplicationCheckPoint
              isTurnOn={item.isOn}
              labelText={item.label}
              isLine={item.line}
              disable={item.disable}></ApplicationCheckPoint>
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
