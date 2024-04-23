import React from "react";
import { View, Text } from "tamagui";
import { useFocusEffect, useRouter } from "expo-router";
import { BackHandler } from "react-native";
import useBack from "../hooks/useBack";
const ModalWordAddedSuccess = () => {
    const router = useRouter();

    useBack(() => router.push("/modal-add-word"));

    return (
        <View>
            <Text>Word has been added success</Text>
        </View>
    );
};

export default ModalWordAddedSuccess;
