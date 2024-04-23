import { Text, View } from "tamagui";
import DictionaryManagement from "../../components/Dictionary/DictionaryManagement/DictionaryManagement";
import DictionaryContent from "../../components/Dictionary/DictionaryContent/DictionaryContent";

export default function DictionaryScreen() {
    return (
        <View marginTop={25} alignItems="center">
            <DictionaryManagement />
            <DictionaryContent />
        </View>
    );
}
