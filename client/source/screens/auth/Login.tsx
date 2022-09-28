// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-relay";
import { graphql } from "react-relay/hooks";

import { LoginMutation, LoginMutation$data } from "./__generated__/LoginMutation.graphql";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [sendLogin, isInFlight] = useMutation<LoginMutation>(graphql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        success
        error
        user {
          id
          email
        }
      }
    }
  `);

  const login = () => {
    sendLogin({
      variables: {
        email,
        password,
      },
      onCompleted: (data: LoginMutation$data) => {
        // TODO: Modify LoginResponseType to return token.
        // TODO: Set token asynchronously w/AsyncStorage.
        // await AsyncStorage.setItem("token", "Bearer TOKEN");
        // TODO: Set authenticated user in state w/Redux.
        console.debug(data);
        if (data.login.success) {
          console.debug("LOGIN SUCCESSFUL");
        } else {
          console.error("LOGIN FAILED");
          Alert.alert("Error", data.login.error ?? "No se ha podido iniciar sesión.", null, {
            onDismiss: () => {
              setPassword("");
            },
          });
        }
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center space-y-10 px-10">
        <Text className="font-bold text-2xl">Secretaria de Cultura</Text>
        <View className="space-y-5 text-left min-w-[90%]">
          <Text>Correo electronico</Text>
          <TextInput
            onChangeText={(text: string) => setEmail(text)}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            className="bg-gray-100 px-5 py-4 rounded-lg"
          />
          <Text>Contraseña</Text>
          <TextInput
            onChangeText={(text: string) => setPassword(text)}
            textContentType="password"
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="password"
            spellCheck={false}
            secureTextEntry
            className="bg-gray-100 px-5 py-4 rounded-lg"
          />
        </View>
        <TouchableOpacity className="rounded-lg bg-sky-800 px-8 py-3" onPress={login}>
          <Text className="font-semibold text-sky-50">{isInFlight ? "Loading..." : "Iniciar sesión"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;