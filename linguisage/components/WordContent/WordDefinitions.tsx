import React from "react";
import { View, Text, ScrollView, Paragraph, H2, H1, XStack } from "tamagui";
import SoundBlock from "../SoundBlock";
import { IWordData } from "../../types/WordInterface";
import FullSenseCard from "../FullSenseCard";

interface IWordDefinitionsProps {
    wordData: IWordData;
    setPickedSenseFId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const WordDefinitions: React.FC<IWordDefinitionsProps> = ({ wordData, setPickedSenseFId }) => {
    return (
        <ScrollView borderRadius={20}>
            <View gap={10}>
                <XStack gap={20}>
                    <H2 marginLeft={10}>{wordData.word}</H2>
                    <View flex={1}></View>
                    <SoundBlock soundUrl={wordData.sound_us} label={"US"} />
                    <SoundBlock soundUrl={wordData.sound_uk} label={"UK"} />
                </XStack>
                {wordData.senses.map((sense) => (
                    <FullSenseCard
                        sense={sense}
                        key={sense.f_sense_id}
                        cardProps={{
                            onPress: sense.in_user_dictionary
                                ? undefined
                                : () => setPickedSenseFId(sense.f_sense_id),
                        }}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default WordDefinitions;
