import { Text, View, ScrollView, YStack, Paragraph } from "tamagui";
import { RefreshControl, SafeAreaView, ScrollViewComponent } from "react-native";
import LastLiterature from "../../components/LastLiterature";
import WordCards from "../../components/WordCards";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserCard from "../../components/Settings/UserCard";
export default function SettingsScreen() {
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
