import React from "react";
import {
    View,
    Text,
    Card,
    Image,
    CardHeader,
    H2,
    Button,
    XStack,
    Paragraph,
    ScrollView,
} from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

const ModalFullSenseCard = () => {
    const sense = useSelector((state: RootState) => state.pickedSense.pickedSense);
    if (sense) {
        const renderImage = ({ item }) => (
            <Card flex={1} paddingTop={40}>
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
                    <Card.Header margin={5} gap={20}>
                        <H2>{sense.word.word}</H2>
                        <Paragraph theme="alt1" fontSize={18}>
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
                    </Card.Header>
                </ScrollView>
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
