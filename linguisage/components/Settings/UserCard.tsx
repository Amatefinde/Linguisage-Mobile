import React from "react";
import { View, Text, Avatar, XStack } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LogOut, UserRound } from "@tamagui/lucide-icons";
import AuthService from "../../http/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const UserCard = () => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    async function handleLogOut() {
        try {
            await AuthService.logout();
            await AsyncStorage.removeItem("token");
            router.replace("/(authentication)/sign-in");
        } catch (error) {
            console.log("произошла ошибка при выходе из аккаунта");
        }
    }

    return (
        <View marginLeft={5}>
            <XStack alignItems="center">
                <UserRound margin={15} />
                <Text fontSize={20}>{user?.userData?.username}</Text>
                <View flex={1}></View>
                <LogOut margin={15} onPress={handleLogOut} />
            </XStack>
        </View>
    );
};

export default UserCard;
