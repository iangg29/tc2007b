// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../../store/hooks";
import { setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    (async () => {
      await axios
        .post(`${API_URL}/auth/login`, { email, password })
        .then((res: AxiosResponse<any>) => {
          const { status, token, user } = res.data;
          if (status === "success") {
            AsyncStorage.setItem("token", `Bearer ${token}`);
            dispatch(setUser(user));
            dispatch(setToken(token));
            dispatch(setIsLoggedIn(true));
          } else {
            Alert.alert("Ooops!", "Something went wrong.");
          }
        })
        .catch((error) => console.error(error));
    })();
  };

  return (
    <SafeAreaView className="dark flex-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <View className="flex-1 items-center justify-center space-y-10 px-10">
        <Text className="font-bold text-2xl text-gray-900 dark:text-white">Secretaria de Cultura</Text>
        <View className="space-y-5 text-left min-w-[90%]">
          <Text className="text-gray-900 dark:text-white">Correo electronico</Text>
          <TextInput
            onChangeText={(text: string) => setEmail(text)}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            className="bg-gray-100 px-5 py-4 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700"
          />
          <Text className="text-gray-900 dark:text-gray-50">Contraseña</Text>
          <TextInput
            onChangeText={(text: string) => setPassword(text)}
            textContentType="password"
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="password"
            spellCheck={false}
            secureTextEntry
            className="bg-gray-100 px-5 py-4 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700"
          />
        </View>
        <TouchableOpacity className="rounded-lg bg-sky-800 px-8 py-3" onPress={login}>
          <Text className="font-semibold text-sky-50">Iniciar sesión</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-gray-700 dark:text-gray-200">Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
