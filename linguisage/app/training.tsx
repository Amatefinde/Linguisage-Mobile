import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Spinner,
    Input,
    Progress,
    YStack,
    XStack,
    Paragraph,
    Button,
    H3,
    H4,
} from "tamagui";
import TrainingCard from "../components/Training/TrainingCard";
import TrainService from "../http/services/TrainService";
import { IUserSense } from "../types/UserSensesInterface";
import shuffleArray from "../utils/shuffleArray";
import { useSelector } from "react-redux";
import trainingSettings from "../store/trainingSettings/trainingSettings";
import { RootState } from "../store";
import { Rocket, X } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";

interface ITrainingScreenProps {}

const TrainingScreen: React.FC<ITrainingScreenProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trainSenses, setTrainSenses] = useState<IUserSense[]>([]);
    const trainingSettings = useSelector((state: RootState) => state.trainingSettings);
    const router = useRouter();
    const [currentSenseIndex, setCurrentSenseIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const progressValue = (currentSenseIndex / trainingSettings.numberOfSense) * 100;
    useEffect(() => {
        async function fetchTrain() {
            setIsLoading(true);
            try {
                const fetchedCardSenses = await TrainService.getTrain(
                    trainingSettings.numberOfSense,
                    trainingSettings.percentOfLearnedWords,
                );
                setTrainSenses(shuffleArray(fetchedCardSenses.senses));
            } catch (e) {
                console.log(e);
            }
            setIsLoading(false);
        }

        fetchTrain();
    }, []);

    const handleCheck = () => {
        const sense = trainSenses[currentSenseIndex];
        const currentWord = sense.word.word;

        if (userInput.toLowerCase() === currentWord.toLowerCase()) {
            TrainService.addAnswer(sense.id, true).then((e) => e);
            setCurrentSenseIndex((prev) => prev + 1);
            setUserInput("");
        } else {
            TrainService.addAnswer(sense.id, false).then((e) => e);
            setIsCorrect(false);
            setTimeout(() => {
                setIsCorrect(true);
            }, 500);
        }
    };

    const component = (
        <View flex={1} padding={10} paddingTop={45} justifyContent={"center"} alignItems={"center"}>
            <XStack gap={2} alignItems={"center"}>
                <X scale={1} size={40} marginLeft={10} onPress={() => router.back()} />
                <Progress
                    value={isCorrect ? progressValue : progressValue * 0.9}
                    height={30}
                    flex={1}
                    scale={0.93}
                >
                    <Progress.Indicator
                        backgroundColor={isCorrect ? undefined : "#ff4b58"}
                        animation={currentSenseIndex === 0 ? undefined : "superBouncy"}
                    />
                </Progress>
            </XStack>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                <YStack gap={10} padding={10}>
                    <TrainingCard sense={trainSenses[currentSenseIndex]} />

                    <Input
                        borderRadius={15}
                        placeholder={"Enter word"}
                        value={userInput}
                        onChangeText={setUserInput}
                        onSubmitEditing={handleCheck}
                    />
                    <Button borderRadius={15} theme={"active"} themeInverse onPress={handleCheck}>
                        <H4>Check</H4>
                    </Button>
                </YStack>
                <Paragraph></Paragraph>
                <Paragraph></Paragraph>
            </ScrollView>
        </View>
    );

    let renderedComponent;
    if (isLoading) {
        renderedComponent = <Spinner />;
    } else if (!trainSenses.length) {
        renderedComponent = (
            <View flex={1}>
                <Paragraph>Your dictionary is empty</Paragraph>
            </View>
        );
    } else if (trainSenses.length === currentSenseIndex && !!trainSenses.length) {
        renderedComponent = (
            <View flex={1} justifyContent={"center"} alignItems={"center"}>
                <H4>Training complete!</H4>
            </View>
        );
    } else {
        renderedComponent = component;
    }

    return renderedComponent;
};

export default TrainingScreen;
