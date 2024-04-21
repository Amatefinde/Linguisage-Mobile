import { Text, View, ScrollView, YStack } from "tamagui";
import { SafeAreaView, ScrollViewComponent } from "react-native";
import LastLiterature from "../../components/LastLiterature";

export default function TabOneScreen() {
    return (
        <ScrollView
            marginTop={100}
            contentContainerStyle={{ display: "flex", justifyContent: "center" }}
        >
            <YStack style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LastLiterature
                    animation="bouncy"
                    size="$4"
                    width="95%"
                    height={200}
                    scale={0.9}
                    hoverStyle={{ scale: 0.925 }}
                    pressStyle={{ scale: 0.875 }}
                />
            </YStack>
        </ScrollView>
    );
}
