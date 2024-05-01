import { ScrollView, Text, View } from "tamagui";
import DictionaryManagement from "../../components/Dictionary/DictionaryManagement/DictionaryManagement";
import DictionaryContent from "../../components/Dictionary/DictionaryContent/DictionaryContent";
import { useState } from "react";

export default function DictionaryScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateSignal, setUpdateSignal] = useState<boolean>(false);
    return (
        <View paddingTop={50} margin={5} gap={"$3"} alignItems="center">
            <DictionaryManagement setIsLoading={setIsLoading} updateSignal={updateSignal} />
            <DictionaryContent isLoading={isLoading} setUpdateSignal={setUpdateSignal} />
        </View>
    );
}
