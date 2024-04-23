import React from "react";
import { View, Text, ScrollView } from "tamagui";
import FullSenseCard from "../FullSenseCard";
import type { IWordData } from "../../types/WordInterface";

interface IWordDefinitionsProps {
    wordData: IWordData;
    setPickedSenseFId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const WordDefinitions: React.FC<IWordDefinitionsProps> = ({ wordData, setPickedSenseFId }) => {
    return (
        <ScrollView borderRadius={20}>
            <View gap={10}>
                {wordData.senses.map((sense) => (
                    <FullSenseCard
                        sense={sense}
                        key={sense.f_sense_id}
                        cardProps={{ onPress: () => setPickedSenseFId(sense.f_sense_id) }}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default WordDefinitions;
