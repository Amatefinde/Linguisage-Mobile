import React from "react";
import { View, Text, ScrollView } from "tamagui";

interface ITrainingScreenProps {}

const TrainingScreen: React.FC<ITrainingScreenProps> = ({}) => {
    return (
        <ScrollView borderRadius={20}>
            <View gap={10}></View>
        </ScrollView>
    );
};

export default TrainingScreen;
