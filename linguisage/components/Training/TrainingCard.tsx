import React from "react";
import { View, Text, ScrollView, Card, H2 } from "tamagui";
import { IUserSense } from "../../types/UserSensesInterface";

interface ITrainingCardProps {
    sense: IUserSense;
}

const TrainingCard: React.FC<ITrainingCardProps> = ({ sense }) => {
    return (
        <Card>
            <Card.Header>
                <H2>{sense.word.word}</H2>
            </Card.Header>
        </Card>
    );
};

export default TrainingCard;
