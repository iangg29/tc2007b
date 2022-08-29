import React, {type PropsWithChildren} from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import {NavigationContainer} from "@react-navigation/native";

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  return (
    <View className="mt-8 px-2">
      <Text className="text-2xl text-black dark:text-white">{title}</Text>
      <Text className="mt-2 text-lg text-black dark:text-white">
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = "bg-neutral-300 dark:bg-slate-900";

  return (
    <NavigationContainer>
      <SafeAreaView className={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className={backgroundStyle}>
          <Header />
          <View className="bg-white dark:bg-black">
            <Section title="Step One">
              Edit <Text className="font-bold">App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
