// (c) Tecnologico de Monterrey 2022, rights reserved.

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { useAppDispatch } from "../../store/hooks";
import { setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";

export const Logout = () => {
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
  return (
    <>
      <TouchableOpacity className="bg-blue-600 rounded-lg text-lg font-semibold px-3" onPress={logout}>
        <Text className="text-white text-lg font-semibold px-3">Logout</Text>
      </TouchableOpacity>
    </>
  );
};
