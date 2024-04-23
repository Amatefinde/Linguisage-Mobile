import { Text, View, ScrollView, YStack } from "tamagui";
import { SafeAreaView, ScrollViewComponent } from "react-native";
import LastLiterature from "../../components/LastLiterature";
import WordCards from "../../components/WordCards";
import { useState } from "react";

export default function TabOneScreen() {
    const [isLiteratureLoading, setIsLiteratureLoading] = useState<boolean>(true);
    const [isLastBookLoading, setIsLastBookLoading] = useState<boolean>(true);

    return (
        <ScrollView
            marginTop={100}
            contentContainerStyle={{ display: "flex", justifyContent: "center" }}
        >
            <YStack
                style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}
            >
                <LastLiterature
                    animation="bouncy"
                    size="$4"
                    width="95%"
                    height={200}
                    scale={0.9}
                    hoverStyle={{ scale: 0.925 }}
                    pressStyle={{ scale: 0.875 }}
                    setIsLiteratureLoading={setIsLiteratureLoading}
                    isLiteratureLoading={isLiteratureLoading}
                />

                <WordCards width="95%" />
            </YStack>
        </ScrollView>
    );
}
