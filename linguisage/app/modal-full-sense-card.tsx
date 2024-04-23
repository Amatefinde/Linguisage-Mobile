import React from "react";
import { View, Card, Image, H2, Button, XStack, Paragraph, ScrollView, YStack } from "tamagui";
import { Volume2 } from "@tamagui/lucide-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import SoundBlock from "../components/SoundBlock";

const ModalFullSenseCard = () => {
    const sense = useSelector((state: RootState) => state.pickedSense.pickedSense);
    if (sense) {
        const renderImage = ({ item }) => (
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
                        <Card.Header padding={20} paddingBottom={8}>
                            <XStack alignItems="center" justifyContent="center" gap={20}>
                                <H2>{sense.word.word}</H2>
                                {sense.part_of_speech && (
                                    <Paragraph theme="alt2">{sense.part_of_speech}</Paragraph>
                                )}
                                <Paragraph theme="alt2">{sense.lvl}</Paragraph>
                                <XStack flex={1}></XStack>
                                <SoundBlock label={"US"} soundUrl={sense.word.sound_us} />
                                <SoundBlock label={"UK"} soundUrl={sense.word.sound_uk} />
                            </XStack>
                        </Card.Header>

                        <View marginLeft={20}>
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
                        <Button theme={"active"}>Delete</Button>
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
