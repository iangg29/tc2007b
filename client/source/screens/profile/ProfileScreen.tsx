// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import { Logout } from "../../components/profile/Logout";
import ProfileDocsList from "../../components/profile/ProfileDocsList";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

const ProfileScreen = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);

  return (
    <ScrollView>
      <View className="flex-1 bg-white">
        <View>
          <View className="flex items-end px-8 py-2">
            {/* Logout */}
            <Logout />
          </View>
          <View className="flex items-center">
            <Image
              className="rounded-full"
              style={{ width: 150, height: 150 }}
              source={require("../../assets/profile.png")}
            />
            <Text className="text-blue-600 text-xl font-semibold py-2">{`${user?.name} ${user?.first_lastname} ${user?.second_lastname} `}</Text>
          </View>
          <View className="mx-16">
            <Text className="text-m font-semibold pt-2">Correo electrónico: </Text>
            <Text className="bg-blue-100 text-slate-600 rounded-lg text-lg font-semibold px-3">
              {`${user?.email}`}{" "}
            </Text>
          </View>
          {/* List of user documents  */}
          <ProfileDocsList />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
