import { ScrollView, Text, View } from "tamagui";
import YourWords from "../../components/PreTraining/YourWords";

export default function PreTrainingScreen() {
    return (
        <ScrollView marginTop={45}>
            <YourWords />
        </ScrollView>
    );
}
