// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Modal } from "react-native";

import ApplicationStatusView from "./ApplicationStatusView";

interface Props {
  id: string;
  title: string;
  status: {
    name;
    order;
  };
}

const ApplicationCard = ({ id, title, status }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleStatus = () => {
    setModalVisible(!modalVisible);
    //console.log("OPEN MODAL");
  };

  const handleEdit = () => {
    navigation.navigate("Editar solicitud" as never, { itemId: id } as never);
  };

  return (
    <View className=" rounded-xl shadow-md overflow-hidden ">
      <Modal
        className="w-full h-full rounded-xl m-8 "
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ApplicationStatusView status={status.name} title={title} />
      </Modal>
      <View>
        <Image className="h-32 w-full object-cover" source={{ uri: "https://reactjs.org/logo-og.png" }} />
      </View>
      <View className="p-4">
        <Text className=" tracking-wide text-lg text-indigo-500 font-semibold">Solicitud: {title}</Text>
        <View className="flex flex-row justify-between ">
          <Text className="text-lg mt-1 text-slate-500">Convocatoria</Text>

          {/* Si está en correciones mostrar forma para editar */}
          {status.order == 0? <TouchableOpacity onPress={handleEdit}>
            <Text className="text-lg mt-1 text-slate-500">Editar</Text>
          </TouchableOpacity>:<TouchableOpacity onPress={handleStatus}>
            <Text className="text-lg mt-1 text-slate-500">Dar seguimiento </Text>
          </TouchableOpacity>}

        </View>
      </View>
    </View>
  );
};

export default ApplicationCard;
