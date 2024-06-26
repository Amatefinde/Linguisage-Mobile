import { Text, View, ScrollView, YStack, Paragraph } from "tamagui";
import { addTheme, updateTheme } from "@tamagui/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserCard from "../../components/Settings/UserCard";
export default function SettingsScreen() {
    function handleButton() {
        updateTheme();
    }

    return (
        <SafeAreaProvider>
            <ScrollView
                marginTop={45}
                contentContainerStyle={{ display: "flex", justifyContent: "center" }}
            >
                <UserCard />
            </ScrollView>
        </SafeAreaProvider>
    );
}
