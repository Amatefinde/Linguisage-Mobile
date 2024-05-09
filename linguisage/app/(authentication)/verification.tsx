import React from "react";
import { Button, H2, H3, Text, View, XStack } from "tamagui";
import { StyleSheet } from "react-native";
import AuthService from "../../http/services/AuthService";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationScreen = () => {
    const router = useRouter();
    async function verify() {
        const user = await AuthService.me();
        if (user.is_verified) {
            router.replace("/(tabs)/home");
        }
    }

    async function handleLogOut() {
        await AuthService.logout();
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("email");
        router.replace("/sign-up");
    }

    return (
        <View justifyContent={"center"} alignItems={"center"} flex={1} gap={20}>
            <H3>Please, follow to the link in email</H3>
            <XStack gap={20}>
                <Button onPress={verify}>I confirm email</Button>
                <Button onPress={handleLogOut}>Use another email</Button>
            </XStack>
        </View>
    );
};

export default VerificationScreen;

const styles = StyleSheet.create({});
