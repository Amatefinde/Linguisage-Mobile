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
    Slider,
    YStack,
    Paragraph,
    ToggleGroup,
    Text,
} from "tamagui";
import { CheckedState } from "@tamagui/checkbox-headless/src/useCheckbox";

const YourWords = () => {
    const [exerciseTypes, setExerciseTypes] = useState<"build_sentence"[]>([]);
    const [repeatWordPercentage, setRepeatWordPercentage] = useState<number>(20);
    const [numberOfWords, setNumberOfWords] = useState<number>(10);

    console.log(exerciseTypes);
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
                <XStack alignItems="center" gap={10} marginBottom={5}>
                    <Paragraph>Learned Words Percentage</Paragraph>
                    <Slider
                        onValueChange={setRepeatWordPercentage}
                        max={100}
                        step={1}
                        flex={1}
                        value={[repeatWordPercentage]}
                        theme={"blue"}
                    >
                        <Slider.Track>
                            <Slider.TrackActive />
                        </Slider.Track>
                        <Slider.Thumb index={0} circular scale={0.6} elevate />
                    </Slider>
                    <Paragraph>{repeatWordPercentage}%</Paragraph>
                </XStack>
                <XStack alignItems="center" gap={10}>
                    <Paragraph>Number of words</Paragraph>
                    <Slider
                        onValueChange={setNumberOfWords}
                        value={[numberOfWords]}
                        max={30}
                        min={3}
                        step={1}
                        flex={1}
                        theme={"blue"}
                    >
                        <Slider.Track>
                            <Slider.TrackActive />
                        </Slider.Track>
                        <Slider.Thumb index={0} circular scale={0.6} elevate />
                    </Slider>
                    <Paragraph>{numberOfWords}</Paragraph>
                </XStack>
            </YStack>
            <CardFooter>
                <View flex={1}></View>
                <Button margin={20}>Start now</Button>
            </CardFooter>
        </Card>
    );
};

export default YourWords;
