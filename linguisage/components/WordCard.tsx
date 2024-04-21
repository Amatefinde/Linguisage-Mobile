import React from "react";
import { XStack, Card, H4, Paragraph } from "tamagui";
import type { CardProps } from "tamagui";
import { IUserSense } from "../types/UserSensesInterface";

interface IWordCardProps {
    sense: IUserSense;
    cardProps?: CardProps;
}

function WordCard({ sense, cardProps }: IWordCardProps) {
    const { word, definition } = sense;

    return (
        <Card size="$4" {...cardProps} borderRadius={20} padding={5}>
            <Card.Header paddingTop={0}>
                {word && <H4>{word.word}</H4>}
                {definition && <Paragraph theme="alt2">{definition}</Paragraph>}
            </Card.Header>
        </Card>
    );
}

export default WordCard;
