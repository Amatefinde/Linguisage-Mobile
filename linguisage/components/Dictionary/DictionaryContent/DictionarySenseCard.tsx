import React, { useState } from "react";
import { Card, H2, H3, Paragraph, Accordion, Square, View, Popover, Button, Image } from "tamagui";
import type { CardProps } from "tamagui";
import { StyleSheet } from "react-native";
import { ChevronDown, MoreVertical } from "@tamagui/lucide-icons";
import { IUserSense } from "../../../types/UserSensesInterface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setPickedSense } from "../../../store/pickedSense/pickedSenseSlice";
import { useRouter } from "expo-router";

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
            <Card.Header paddingBottom={5}>
                <H3>{sense.word.word}</H3>
                <Paragraph>{sense.definition}</Paragraph>
            </Card.Header>

            {sense.examples.length > 0 ? (
                <Accordion
                    transform={[{ translateY: 3 }]}
                    scaleX={1.02}
                    overflow="hidden"
                    type="multiple"
                    borderWidth={0}
                >
                    <Accordion.Item value="a2">
                        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                            {({ open }: { open: boolean }) => (
                                <>
                                    <Paragraph marginLeft={5}>Examples:</Paragraph>
                                    <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                                        <ChevronDown size="$1" />
                                    </Square>
                                </>
                            )}
                        </Accordion.Trigger>
                        <Accordion.Content>
                            <Paragraph theme="alt2" marginLeft={5}>
                                {sense.examples.map((example, i) => (
                                    <Paragraph
                                        key={example.id}
                                        margin={10}
                                    >{`\u2022 ${example.example}\n`}</Paragraph>
                                ))}
                            </Paragraph>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
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
