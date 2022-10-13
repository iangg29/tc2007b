// (c) Tecnologico de Monterrey 2022, rights reserved.

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";

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

  return (
    <View className="flex-1 bg-white">
      <View>
        <View className="flex items-center">
          <Image
            className="rounded-full"
            style={{ width: 150, height: 150 }}
            source={require("../../assets/profile.png")}
          />
          <Text className="text-blue-600 text-xl font-semibold py-2">{`${user?.name} ${user?.first_lastname} ${user?.second_lastname} `}</Text>

          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="mx-16">
          <Text className="text-m font-semibold pt-2">Correo electrónico: </Text>
          <Text className="bg-blue-100 text-slate-600 rounded-lg text-lg font-semibold px-3">{`${user?.email}`} </Text>
        </View>
        <View className="flex items-center">
          {empty ? (
            <Text className="text-blue-600 text-xl text-center font-semibold pt-10">
              No existen documentos relacionados al usuario
            </Text>
          ) : (
            <>
              <Text className="text-blue-600 text-xl font-semibold pt-10">Documentos</Text>
              <FlatList
                data={userDocuments.findDocumentsByUserID}
                renderItem={({ item }) => (
                  <UserDocs filename={item.file_name} updated={item.updated_at} link={item.url} />
                )}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
