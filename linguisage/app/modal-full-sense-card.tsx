import React, { useState } from "react";
import { View, Card, Image, H2, Button, XStack, Paragraph, ScrollView, Spinner } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import SoundBlock from "../components/SoundBlock";
import WordService from "../http/services/WordService";
import { removeUserSense } from "../store/userSenses/userSensesSlice";
import { IWordImage } from "../types/WordInterface";

const ModalFullSenseCard = () => {
    const sense = useSelector((state: RootState) => state.pickedSense.pickedSense);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    async function handleDelete() {
        setIsSubmitting(true);
        try {
            if (sense?.id) {
                await WordService.deleteSense(sense.id);
                dispatch(removeUserSense(sense.id));
                router.back();
            }
        } catch (error) {
            console.log("Во время удаления слова ");
        }
        setIsSubmitting(false);
    }

    if (sense) {
        const renderImage = ({ item }: { item: IWordImage }) => (
            <Card flex={1} paddingTop={40}>
                <View flex={1}>
                    <ScrollView>
                        <Image
                            src={item.img}
                            borderRadius={10}
                            width="100%"
                            maxWidth="100%"
                            onLoad={(event) => {
                                const { width, height } = event.nativeEvent.source;
                                event.currentTarget.setNativeProps({
                                    aspectRatio: width / height,
                                });
                            }}
                        />
                        <Card.Header padding={20} paddingBottom={8} gap={10}>
                            <XStack alignItems="center" gap={20}>
                                <H2>{sense.word.word}</H2>
                            </XStack>
                            <XStack gap={10}>
                                <SoundBlock label={"US"} soundUrl={sense.word.sound_us} />
                                <SoundBlock label={"UK"} soundUrl={sense.word.sound_uk} />
                                {sense.part_of_speech && (
                                    <Paragraph fontSize={18} theme="alt2">
                                        {sense.part_of_speech}
                                    </Paragraph>
                                )}
                                <Paragraph fontSize={18} theme="alt2">
                                    {sense.lvl}
                                </Paragraph>
                            </XStack>
                        </Card.Header>

                        <View marginLeft={20} marginRight={10}>
                            <Paragraph margin={10} theme="alt1" fontSize={18}>
                                {sense.definition}
                            </Paragraph>
                            <Paragraph theme="alt2" marginLeft={5}>
                                {sense.examples.map((example, i) => (
                                    <Paragraph
                                        key={example.id}
                                        margin={10}
                                    >{`\u2022 ${example.example}\n`}</Paragraph>
                                ))}
                            </Paragraph>
                        </View>
                    </ScrollView>
                    <Card.Footer margin={20} marginTop={5} gap={20}>
                        <XStack flex={1} />
                        <Button theme={"active"} onPress={() => router.back()}>
                            Back
                        </Button>
                        <Button
                            theme={"active"}
                            onPress={handleDelete}
                            icon={isSubmitting ? () => <Spinner /> : undefined}
                        >
                            Delete
                        </Button>
                    </Card.Footer>
                </View>
            </Card>
        );

        return (
            <Carousel
                data={sense.word_images}
                renderItem={renderImage}
                itemWidth={Math.floor(Dimensions.get("window").width)}
                sliderWidth={Dimensions.get("window").width}
                layout={"default"}
            />
        );
    }
};

export default ModalFullSenseCard;
