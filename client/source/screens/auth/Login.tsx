// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();

  const login = () => {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center space-y-10 px-10">
        <Text className="font-bold text-2xl">Secretaria de Cultura</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Text>Go Landing</Text>
        </TouchableOpacity>
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
          <Text className="font-semibold text-sky-50">Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
