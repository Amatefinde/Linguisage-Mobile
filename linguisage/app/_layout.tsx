import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { Provider } from "react-redux";
import "../tamagui-web.css";

import { config } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { store } from "../store";

export { ErrorBoundary } from "expo-router";
export const unstable_settings = {
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [interLoaded, interError] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    useEffect(() => {
        if (interLoaded || interError) {
            // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
            SplashScreen.hideAsync();
        }
    }, [interLoaded, interError]);

    if (!interLoaded && !interError) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="training" options={{ headerShown: false }} />
                        <Stack.Screen name="(authentication)" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="modal-add-word" options={{ title: "Add word" }} />
                        <Stack.Screen
                            name="modal-word-added-success"
                            options={{ title: "Word added success" }}
                        />
                        <Stack.Screen
                            name="modal-full-sense-card"
                            options={{ headerShown: false }}
                        />
                    </Stack>
                </ThemeProvider>
            </TamaguiProvider>
        </Provider>
    );
}
