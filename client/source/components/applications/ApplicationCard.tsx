// (c) Tecnologico de Monterrey 2022, rights reserved.
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Modal } from "react-native";

import ApplicationStatusView from "./ApplicationStatusView";
import { getRandomImage } from "../utils/imageHelper";
interface Props {
  title: string;
  status: {
    name;
  };
  citation: {
    title;
  };
}

const ApplicationCard = ({ title, status, citation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleStatus = () => {
    setModalVisible(!modalVisible);
    //console.log("OPEN MODAL");
  };
  return (
    <View className="max-w my-2 mx-4 bg-white rounded-xl shadow-md overflow-hidden border ">
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
        <Image className="h-32 w-full object-cover" source={{ uri: getRandomImage() }} />
      </View>
      <View className="p-4">
        <Text className=" tracking-wide text-md  dark:text-white">Solicitud:</Text>
        <Text className=" text-lg font-medium text-slate-600">{title}</Text>
        <Text className="tracking-wide text-md  dark:text-white">Convocatoria</Text>
        <Text className=" text-lg font-medium text-slate-600">{citation.title}</Text>
        <View className="flex flex-row justify-between ">
          <TouchableOpacity onPress={handleStatus}>
            <Text className="text-lg mt-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold  px-4 border border-gray-400 rounded shadow">
              Dar seguimiento{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApplicationCard;
