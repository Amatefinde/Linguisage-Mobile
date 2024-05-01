import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Paragraph, H4, Spinner, YStack, H3, H2 } from "tamagui";
import { useRouter } from "expo-router";
import TrainService from "../../http/services/TrainService";
import { IUserSense } from "../../types/UserSensesInterface";

interface ITrainingCompleteProps {}

const TrainingComplete: React.FC<ITrainingCompleteProps> = ({}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [masteredSenses, setMasteredSenses] = useState<IUserSense[]>([]);

    useEffect(() => {
        async function calculateProgress() {
            setIsLoading(true);
            try {
                const fetchedMasteredSenses = (await TrainService.calculate()).senses;
                setMasteredSenses(fetchedMasteredSenses);
            } catch (error) {
                console.log("Во время расчёта результатов тренировки произошла ошибка:", error);
            }
            setIsLoading(false);
        }

        calculateProgress();
    }, []);

    return isLoading ? (
        <Spinner />
    ) : (
        <View flex={1} gap={5} justifyContent={"center"} alignItems={"center"}>
            <H2>Training complete!</H2>
            <Paragraph onPress={() => router.back()}>Go back</Paragraph>
            <YStack height={40}></YStack>
            {masteredSenses.length > 0 && <H4>You mastered this words:</H4>}
            {masteredSenses.map((sense) => (
                <Paragraph>{`\u2022 ${sense.word.word}`}</Paragraph>
            ))}
        </View>
    );
};

export default TrainingComplete;
