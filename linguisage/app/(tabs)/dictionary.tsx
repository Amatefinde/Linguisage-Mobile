import { ScrollView, Text, View } from "tamagui";
import DictionaryManagement from "../../components/Dictionary/DictionaryManagement/DictionaryManagement";
import DictionaryContent from "../../components/Dictionary/DictionaryContent/DictionaryContent";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import WordService from "../../http/services/WordService";

export default function DictionaryScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updateSignal, setUpdateSignal] = useState<boolean>(false);
    return (
        <View marginTop={25} alignItems="center">
            <DictionaryManagement setIsLoading={setIsLoading} updateSignal={updateSignal} />
            <DictionaryContent isLoading={isLoading} setUpdateSignal={setUpdateSignal} />
        </View>
    );
}
