import React from "react";
import { XStack, Card, H4, Paragraph, H2, H3 } from "tamagui";
import type { CardProps } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

interface IAddWordProps {
    cardProps?: CardProps;
}

function AddWordCard({ cardProps }: IAddWordProps) {
    const router = useRouter();

    return (
        <Card
            size="$3"
            {...cardProps}
            borderRadius={20}
            padding={5}
            onPress={() => router.push("/modal-add-word")}
            alignItems={"center"}
        >
            <XStack gap={2} alignItems={"center"} padding={10} paddingLeft={20} paddingRight={25}>
                <Plus borderRadius={20} padding={30} scale={0.7} />
                <H3>Add word</H3>
            </XStack>
        </Card>
    );
}

export default AddWordCard;
