import React from "react";
import { XStack, Card, H4, Paragraph } from "tamagui";
import type { CardProps } from "tamagui";
import { IUserSense } from "../types/UserSensesInterface";
import { Plus } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

interface IAddWordProps {
    cardProps?: CardProps;
}

function AddWordCard({ cardProps }: IAddWordProps) {
    return (
        <Card
            size="$4"
            {...cardProps}
            borderRadius={20}
            padding={5}
            onPress={() => console.log("сак")}
            alignItems={"center"}
        >
            <Plus borderRadius={20} padding={30} />
        </Card>
    );
}

export default AddWordCard;
