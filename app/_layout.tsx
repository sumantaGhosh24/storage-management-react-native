import "../global.css";

import "react-native-url-polyfill/auto";

import {useEffect} from "react";
import {useFonts} from "expo-font";
import {Stack, useRouter, useSegments} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import "react-native-reanimated";

import GlobalProvider, {useGlobalContext} from "@/context/global-provider";

export {ErrorBoundary} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GlobalProvider>
        <RootLayoutNav />
      </GlobalProvider>
      <StatusBar style="inverted" backgroundColor="#1D4ED8" />
    </>
  );
}

function RootLayoutNav() {
  const {isLogged} = useGlobalContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup1 = segments[0] === "(stacks)";
    const inAuthGroup2 = segments[0] === "(tabs)";

    if (!isLogged && (inAuthGroup1 || inAuthGroup2)) {
      router.replace("/login");
    } else if (isLogged && (inAuthGroup1 || inAuthGroup2)) {
    } else if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged]);

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="(stacks)" options={{headerShown: false}} />
      </Stack>
    </>
  );
}
