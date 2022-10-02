// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Landing = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const user: any = useAppSelector(selectUser);

  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
  };

  const logout = () => {
    try {
      (async () => {
        dispatch(setToken(""));
        dispatch(setUser({ name: "", first_lastname: "", second_lastname: "", cellphone: "", email: "" }));
        dispatch(setIsLoggedIn(false));
        await removeToken();
      })();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Text>This is the landing page</Text>
      <View className="text-center mx-10 ">
        <Text>Your user is </Text>
        <Text>{`${user?.name}`}</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;
