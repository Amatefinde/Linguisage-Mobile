import React from "react";
import { XStack, Card, H4, Paragraph } from "tamagui";
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
            size="$4"
            {...cardProps}
            borderRadius={20}
            padding={5}
            onPress={() => router.push("/modal-add-word")}
            alignItems={"center"}
        >
            <Plus borderRadius={20} padding={30} />
        </Card>
    );
}

export default AddWordCard;
