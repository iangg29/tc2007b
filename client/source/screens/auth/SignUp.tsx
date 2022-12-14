// (c) Tecnologico de Monterrey 2022, rights reserved.

import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios, { AxiosResponse } from "axios";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";

import { useAppDispatch } from "../../store/hooks";
import { setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";

const SignUp = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [name, setName] = useState<string>("");
  const [firstLN, setFirstLN] = useState<string>("");
  const [secondLN, setSecondLN] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cellphone, setCellphone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const signup = () => {
    (async () => {
      await axios
        .post(`${API_URL}/auth/signup`, {
          name,
          firstLN,
          secondLN,
          email,
          cellphone,
          gender,
          password,
          confirmPassword,
        })
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
    <SafeAreaView className="dark flex-1 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <ScrollView>
        <KeyboardAvoidingView className="dark flex-1 bg-white dark:bg-gray-900 dark:text-gray-50" behavior="padding">
          <ImageBackground
            className="flex-1 items-center justify-center space-y-10 px-8"
            source={require("../../assets/backSignUp.png")}>
            <View className="flex-1 items-center justify-center px-5">
              <Text className="py-10 font-bold text-2xl">Tramita La Cultura QRO</Text>
              <Text className="py-0 font-semibold text-lg">Creaci??n de cuenta</Text>
              <View className="space-y-5 text-left min-w-[95%]">
                <View className="space-y-2">
                  <Text>Nombre</Text>
                  <TextInput
                    onChangeText={(text: string) => setName(text)}
                    textContentType="name"
                    keyboardType="default"
                    autoComplete="name-given"
                    spellCheck
                    className="bg-gray-100 px-5 py-2 rounded-lg border-2 border-indigo-500/100"
                  />
                </View>
                <View className="flex-row content-between justify-between space-x-10">
                  <View className="flex-1 space-y-2">
                    <Text>Apellido paterno</Text>
                    <TextInput
                      onChangeText={(text: string) => setFirstLN(text)}
                      textContentType="familyName"
                      keyboardType="default"
                      autoComplete="name-family"
                      spellCheck
                      className="bg-gray-100 px-5 py-1 rounded-lg border-2 border-indigo-500/100"
                    />
                  </View>
                  <View className="flex-1 space-y-2">
                    <Text>Apellido Materno</Text>
                    <TextInput
                      onChangeText={(text: string) => setSecondLN(text)}
                      textContentType="familyName"
                      keyboardType="default"
                      autoComplete="name-family"
                      spellCheck
                      className="bg-gray-100 px-5 py-1 rounded-lg border-2 border-indigo-500/100"
                    />
                  </View>
                </View>
                <View className="space-y-2">
                  <Text>Correo electr??nico</Text>
                  <TextInput
                    onChangeText={(text: string) => setEmail(text)}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="bg-gray-100 px-5 py-2 rounded-lg border-2 border-indigo-500/100"
                  />
                </View>
                <View className="space-y-2">
                  <Text>Celular</Text>
                  <TextInput
                    onChangeText={(text: string) => setCellphone(text)}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    className="bg-gray-100 px-5 py-2 rounded-lg border-2 border-indigo-500/100"
                  />
                </View>
                <View className="space-y-2">
                  <Text>G??nero</Text>
                  <TextInput
                    onChangeText={(text: string) => setGender(text)}
                    keyboardType="default"
                    autoComplete="gender"
                    className="bg-gray-100 px-5 py-2 rounded-lg border-2 border-indigo-500/100"
                  />
                </View>
                <View className="flex-row content-between justify-between space-x-10">
                  <View className="flex-1 space-y-2">
                    <Text>Contrase??a</Text>
                    <TextInput
                      onChangeText={(text: string) => setPassword(text)}
                      textContentType="newPassword"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoComplete="password-new"
                      spellCheck={false}
                      secureTextEntry
                      className="bg-gray-100 px-5 py-1 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border-2 border-indigo-500/100"
                    />
                  </View>
                  <View className="flex-1 space-y-2">
                    <Text className="text-xs">Confirmar contrase??a</Text>
                    <TextInput
                      onChangeText={(text: string) => setConfirmPassword(text)}
                      textContentType="newPassword"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoComplete="password-new"
                      spellCheck={false}
                      secureTextEntry
                      className="bg-gray-100 px-5 py-1 rounded-lg text-gray-900 dark:text-gray-50 dark:bg-gray-700 border-2 border-indigo-500/100"
                    />
                  </View>
                </View>
              </View>
              <View className="py-5 pb-10">
                <TouchableOpacity className="rounded-lg bg-sky-800 px-8 py-3" onPress={signup}>
                  <Text className="font-semibold text-sky-50">Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
