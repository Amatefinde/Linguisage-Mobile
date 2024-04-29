import { Text, View, ScrollView, YStack } from "tamagui";
import { RefreshControl, SafeAreaView, ScrollViewComponent } from "react-native";
import LastLiterature from "../../components/Home/LastLiterature";
import WordCards from "../../components/Home/WordCards";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabOneScreen() {
    const [isWordsLoading, setIsWordsLoading] = useState<boolean>(true);
    const [isLastBookLoading, setIsLastBookLoading] = useState<boolean>(true);
    const [updateSignal, setUpdateSignal] = useState<boolean>(false);
    return (
        <SafeAreaProvider>
            <ScrollView
                marginTop={45}
                contentContainerStyle={{ display: "flex", justifyContent: "center" }}
                refreshControl={
                    <RefreshControl
                        refreshing={isWordsLoading || isLastBookLoading}
                        onRefresh={() => setUpdateSignal((prev) => !prev)}
                    />
                }
            >
                <YStack
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <LastLiterature
                        animation="bouncy"
                        size="$4"
                        width="95%"
                        height={200}
                        scale={0.9}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                        isLastBookLoading={isLastBookLoading}
                        setIsLastBookLoading={setIsLastBookLoading}
                        updateSignal={updateSignal}
                    />

                    <WordCards
                        width="95%"
                        isWordsLoading={isWordsLoading}
                        setIsWordsLoading={setIsWordsLoading}
                        updateSignal={updateSignal}
                    />
                </YStack>
            </ScrollView>
        </SafeAreaProvider>
    );
}
