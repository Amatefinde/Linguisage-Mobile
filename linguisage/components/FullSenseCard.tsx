import React from "react";
import { Card, H2, Paragraph } from "tamagui";
import { ISense } from "../types/WordInterface";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const FullSenseCard: React.FC<{ sense: ISense }> = ({ sense }) => {
    const width = Dimensions.get("window").width;
    return (
        <Card>
            <Card.Header>
                <H2>{[sense.part_of_speech, sense.lvl].join(", ")}</H2>
                <Paragraph>{sense.definition}</Paragraph>
            </Card.Header>
        </Card>
    );
};

export default FullSenseCard;
