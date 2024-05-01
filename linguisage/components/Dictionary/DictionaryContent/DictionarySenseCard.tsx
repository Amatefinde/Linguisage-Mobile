import React, { useState } from "react";
import {
    Card,
    H2,
    H3,
    Paragraph,
    Accordion,
    Square,
    View,
    Popover,
    Button,
    Image,
    XStack,
} from "tamagui";
import type { CardProps } from "tamagui";
import { StyleSheet } from "react-native";
import { ChevronDown, MoreVertical } from "@tamagui/lucide-icons";
import { IUserSense } from "../../../types/UserSensesInterface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setPickedSense } from "../../../store/pickedSense/pickedSenseSlice";
import { useRouter } from "expo-router";
import SoundBlock from "../../SoundBlock";
import AccordionExamples from "../../AccordionExamples";
import WordStatus from "./WordStatus";

const FullSenseCard: React.FC<{ sense: IUserSense; cardProps?: CardProps }> = ({
    sense,
    cardProps,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    function handlePress() {
        dispatch(setPickedSense(sense));
        router.push("/modal-full-sense-card");
    }

    return (
        <Card {...cardProps} overflow={"hidden"} margin={20} marginTop={0} onPress={handlePress}>
            {sense.word_images && sense.word_images.length > 0 && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: sense.word_images[0].img }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            )}
            <Card.Header paddingBottom={5} gap={5}>
                <XStack alignItems="center" gap={20}>
                    <H3>{sense.word.word}</H3>
                </XStack>
                <XStack gap={10}>
                    <SoundBlock label={"US"} soundUrl={sense.word.sound_us} />
                    <SoundBlock label={"UK"} soundUrl={sense.word.sound_uk} />
                    <WordStatus sense={sense} />
                </XStack>

                <Paragraph>{sense.definition}</Paragraph>
            </Card.Header>

            {sense.examples.length > 0 ? (
                <AccordionExamples sense={sense} />
            ) : (
                <Paragraph></Paragraph>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        height: 200,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default FullSenseCard;
