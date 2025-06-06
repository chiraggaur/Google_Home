import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../app/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/image-results"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="screens/music" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/translate"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="screens/scholar" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/SearchResults"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/voiceInput"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/SearchBar"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/open-camera"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* <Stack /> */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
