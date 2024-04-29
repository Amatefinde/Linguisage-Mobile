import React from "react";
import { View, Text, Paragraph, XStack } from "tamagui";
import { Volume2 } from "@tamagui/lucide-icons";
import { Audio } from "expo-av";

interface ISoundBlockProps {
    soundUrl: string;
    label: string;
}
const SoundBlock: React.FC<ISoundBlockProps> = ({ soundUrl, label }) => {
    const playAudio = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: soundUrl },
                { shouldPlay: true },
            );
            await sound.playAsync();
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };
    return (
        <XStack onPress={playAudio} gap={5}>
            <Volume2 />
            <Paragraph>{label}</Paragraph>
        </XStack>
    );
};

export default SoundBlock;
