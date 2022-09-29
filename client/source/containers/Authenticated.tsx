// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useAppSelector } from "../store/hooks";
import { selectIsLoggedIn } from "../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/auth/Login";

export const Authenticated = ({ stack, children }: any): JSX.Element => {
  const isLoggedIn: boolean = useAppSelector<boolean>(selectIsLoggedIn);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn === false || AsyncStorage.getItem("token") === undefined) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  if (isLoggedIn === true && AsyncStorage.getItem("token") !== undefined) {
    return <>{children}</>;
  }

  return <stack.Screen name="Login" component={Login} />;
};
