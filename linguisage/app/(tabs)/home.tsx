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
                        gap: 15,
                        margin: 10,
                    }}
                >
                    <LastLiterature
                        width={"100%"}
                        animation="bouncy"
                        height={200}
                        isLastBookLoading={isLastBookLoading}
                        setIsLastBookLoading={setIsLastBookLoading}
                        updateSignal={updateSignal}
                    />

                    <WordCards
                        isWordsLoading={isWordsLoading}
                        setIsWordsLoading={setIsWordsLoading}
                        updateSignal={updateSignal}
                    />
                </YStack>
            </ScrollView>
        </SafeAreaProvider>
    );
}
