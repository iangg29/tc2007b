// (c) Tecnologico de Monterrey 2022, rights reserved.
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Modal, Pressable } from "react-native";

import { getRandomImage } from "../utils/imageHelper";
import ApplicationStatusView from "./ApplicationStatusView";
interface Props {
  id: string;
  title: string;
  status: {
    status_name;
    order;
  };
}

const ApplicationCard = ({ id, title, status }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleStatus = () => {
    setModalVisible(!modalVisible);
  };

  const handleEdit = () => {
    navigation.navigate("Editar solicitud" as never, { itemId: id } as never);
  };

  return (
    <View className="max-w my-2 mx-4 bg-white rounded-xl overflow-hidden border border-gray-300 shadow">
      <Modal
        className="w-full h-full rounded-xl m-8 "
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex flex-row content-end justify-end">
          <Pressable className="mt-8 mr-5" onPress={() => setModalVisible(!modalVisible)}>
            <AntDesign name="close" size={24} color="gray" />
          </Pressable>
        </View>
        <ApplicationStatusView status={status.status_name} title={title} />
      </Modal>
      <View>
        <Image className="h-32 w-full object-cover" source={{ uri: getRandomImage() }} />
      </View>
      <View className="p-4">
        <Text className="tracking-wide text-xs text-gray-600  dark:text-gray-100">Solicitud:</Text>
        <Text className="text-lg font-semibold text-gray-700 mb-2">{title}</Text>
        <View className="flex flex-row content-center justify-center mt-1">
          {/* Si está en correciones mostrar forma para editar */}
          {status.order == 0 ? (
            <TouchableOpacity className="bg-main-100 border border-gray-200 rounded-lg shadow-sm" onPress={handleEdit}>
              <Text className="text-lg text-gray-100 font-semibold px-4 py-1">Editar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-main-100 border border-gray-200 rounded-lg shadow-sm"
              onPress={handleStatus}>
              <Text className="text-lg text-gray-100 font-semibold px-4 py-1">Dar seguimiento </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ApplicationCard;
