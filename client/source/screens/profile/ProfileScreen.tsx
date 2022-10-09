// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import UserDocs from "../../components/profile/UserDocs";

const ProfileScreen = (): JSX.Element => {
  return (
    <View className="flex-1 bg-white">
      <View>
        <View className="flex items-center">
          <Image
            className="rounded-full"
            style={{ width: 150, height: 150 }}
            source={require("../../assets/profile.png")}></Image>
          <Text className="text-blue-600 text-xl font-semibold py-2">User name</Text>
        </View>

        <View className="mx-16">
          <Text className="text-m font-semibold pt-2">Correo electrónico: </Text>
          <Text className="bg-blue-100 text-slate-600 rounded-lg text-lg font-semibold px-3">Correo </Text>
        </View>
        <View className="flex items-center">
          <Text className="text-blue-600 text-xl font-semibold pt-10">Documentos</Text>
          <FlatList
            data={[
              {
                doc: {
                  filename: "INEjuan.png",
                  updated: "Hoy",
                  linkDoc: "https://listanominal.ine.mx/scpln/images/credencial-modeloD.png",
                },
              },
              {
                doc: {
                  filename: "ComprobanteDomicilioJuan.png",
                  updated: "Hoy",
                  linkDoc: "https://listanominal.ine.mx/scpln/images/credencial-modeloD.png",
                },
              },
            ]}
            renderItem={({ item }) => (
              <UserDocs filename={item.doc.filename} updated={item.doc.updated} link={item.doc.linkDoc}></UserDocs>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;