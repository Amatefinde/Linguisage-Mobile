import React, { useState } from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
    View,
    Card,
    CardHeader,
    CardFooter,
    Button,
    H2,
    Separator,
    XStack,
    Checkbox,
    Label,
    YStack,
    Paragraph,
    ToggleGroup,
    Text,
} from "tamagui";
import Slider from "@react-native-community/slider";
import { CheckedState } from "@tamagui/checkbox-headless/src/useCheckbox";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
    ITrainingSettings,
    setTrainingSettings,
} from "../../store/trainingSettings/trainingSettings";

const YourWords = () => {
    const [exerciseTypes, setExerciseTypes] = useState<"build_sentence"[]>([]);
    const [repeatWordPercentage, setRepeatWordPercentage] = useState<number>(20);
    const [numberOfSense, setNumberOfSense] = useState<number>(10);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    function handleStartTrain() {
        const trainingSettings: ITrainingSettings = {
            buildSentence: exerciseTypes.includes("build_sentence"),
            numberOfSense: numberOfSense,
            percentOfLearnedWords: repeatWordPercentage,
        };
        dispatch(setTrainingSettings(trainingSettings));
        router.navigate("/training");
    }
    return (
        <Card margin={20} borderRadius={20}>
            <CardHeader>
                <H2 padding={5}>Your words</H2>
            </CardHeader>
            <Separator />
            <YStack gap={15} margin={10} marginLeft={20} marginRight={20}>
                <XStack gap={10}>
                    <Label paddingRight="$0" justifyContent="flex-end" htmlFor={"build_sentence"}>
                        {"Exercises"}
                    </Label>
                    <ToggleGroup
                        onValueChange={setExerciseTypes}
                        value={exerciseTypes}
                        orientation={"horizontal"}
                        id={"build_sentence"}
                        type="multiple"
                    >
                        <ToggleGroup.Item value="word_guesser" aria-label="Center aligned">
                            <Text>Sentence Maker</Text>
                        </ToggleGroup.Item>
                    </ToggleGroup>
                </XStack>
                <XStack alignItems="center" marginBottom={5}>
                    <Paragraph>Learned Words Percentage</Paragraph>
                    <View flex={1}>
                        <Slider
                            value={repeatWordPercentage}
                            onValueChange={setRepeatWordPercentage}
                            step={1}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            style={{ width: "100%" }}
                        />
                    </View>
                    <Paragraph width={37}>{repeatWordPercentage}%</Paragraph>
                </XStack>
                <XStack alignItems="center" gap={10}>
                    <Paragraph>Number of words</Paragraph>
                    <View flex={1}>
                        <Slider
                            value={numberOfSense}
                            onValueChange={setNumberOfSense}
                            step={1}
                            minimumValue={3}
                            maximumValue={30}
                            style={{ width: "100%" }}
                        />
                    </View>
                    <Paragraph>{numberOfSense}</Paragraph>
                </XStack>
            </YStack>
            <CardFooter>
                <View flex={1}></View>
                <Button margin={20} onPress={handleStartTrain}>
                    Start now
                </Button>
            </CardFooter>
        </Card>
    );
};

export default YourWords;
