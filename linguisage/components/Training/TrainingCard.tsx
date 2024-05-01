import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Card, H2, Image, H4, Paragraph, Button } from "tamagui";
import { IUserSense } from "../../types/UserSensesInterface";
import pickRandomImage from "../../utils/pickRandomImage";
import { maskWordInSenseExamples } from "../../utils/maskWordInSenseExamples";
import { Rocket } from "@tamagui/lucide-icons";
import { KeyboardAvoidingView } from "react-native";

interface ITrainingCardProps {
    sense: IUserSense;
}

const TrainingCard: React.FC<ITrainingCardProps> = ({ sense }) => {
    const [pickedImageUrl, setPickedImageUrl] = useState<string | null>(null);
    const [imageType, setImageType] = useState<"horizontal" | "vertical" | "noImage" | "loading">(
        "loading",
    );
    const [numHints, setNumHints] = useState<number>(0);

    sense = maskWordInSenseExamples(sense, numHints);

    useEffect(() => {
        const randomImageUrl = pickRandomImage(sense);
        if (randomImageUrl === null) {
            setImageType("noImage");
        } else {
            setPickedImageUrl(randomImageUrl);
        }
    }, [sense.definition]);

    useEffect(() => {
        setNumHints(0);
    }, [sense.definition]);

    return (
        <View>
            <Card borderRadius={20} overflow="hidden">
                <View alignItems="center">
                    <Image
                        src={pickedImageUrl}
                        borderRadius={10}
                        width="100%"
                        maxHeight={350}
                        onLoad={(event) => {
                            const { width, height } = event.nativeEvent.source;
                            event.currentTarget.setNativeProps({
                                aspectRatio: width / height,
                            });
                        }}
                    />
                </View>
                <Card.Header>
                    <H4>{sense.definition}</H4>
                </Card.Header>
                <Paragraph theme="alt2" marginLeft={25}>
                    {sense.examples.splice(0, 3).map((example, i, all) => (
                        <Paragraph
                            key={example.id}
                            margin={10}
                        >{`\u2022 ${example.example}\n`}</Paragraph>
                    ))}
                </Paragraph>
                <Button
                    margin={20}
                    borderRadius={15}
                    disabled={sense.word.word.length - 1 === numHints}
                    iconAfter={<Rocket />}
                    onPress={() => setNumHints((e) => e + 1)}
                >
                    Get a Hint
                </Button>
            </Card>
        </View>
    );
};

export default TrainingCard;
