// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AppStack } from "../stacks/AppStack";
import { AuthStack } from "../stacks/AuthStack";
import { useAppSelector } from "../store/hooks";
import { selectIsLoggedIn } from "../store/slices/authSlice";

export const NavigatorHandler = (): JSX.Element => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return <NavigationContainer>{isLoggedIn ? <AuthStack /> : <AppStack />}</NavigationContainer>;
};
