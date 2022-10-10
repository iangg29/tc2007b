// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Scope } from "@babel/traverse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import ProfileDocsList from "../../components/profile/ProfileDocsList";


import UserDocs from "../../components/profile/UserDocs";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectUser, setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import { ProfileScreenQuery, ProfileScreenQuery$data } from "./__generated__/ProfileScreenQuery.graphql";

const ProfileScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
  };

  const logout = () => {
    try {
      (async () => {
        dispatch(setToken(""));
        dispatch(setUser({ id: "", name: "", first_lastname: "", second_lastname: "", cellphone: "", email: "" }));
        dispatch(setIsLoggedIn(false));
        await removeToken();
      })();
    } catch (e) {
      console.error(e);
    }
  };

  const user: any = useAppSelector(selectUser);

  const userDocuments: ProfileScreenQuery$data = useLazyLoadQuery<ProfileScreenQuery>(
    graphql`
      query ProfileScreenQuery($user_id: ID!) {
        findDocumentsByUserID(user_id: $user_id) {
          id
          file_name
          url
          updated_at
        }
      }
    `,
    { user_id: user.id },
    { fetchPolicy: "network-only" },
  );

  const mydata: any = userDocuments;

  const empty = userDocuments.findDocumentsByUserID?.length === 0;

  console.log(userDocuments.findDocumentsByUserID?.length)

  return (
    <ScrollView>
    <View className="flex-1 bg-white">
      <View>
      <View className="flex items-end px-8">
        <TouchableOpacity className="bg-blue-600 rounded-lg text-lg font-semibold px-3" onPress={logout}>
          <Text className="text-white text-lg font-semibold px-3">Logout</Text>
        </TouchableOpacity>
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
          <Text className="bg-blue-100 text-slate-600 rounded-lg text-lg font-semibold px-3">{`${user?.email}`} </Text>
        </View>
        <ProfileDocsList/>
      </View> 
    </View>
    </ScrollView>
    
  );
};

export default ProfileScreen;
