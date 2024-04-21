import React, { useEffect, useState } from "react";
import { View, Text } from "tamagui";
import { Button, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import useAutoAuth from "../hooks/useAutoAuth";

const Index = () => {
    const dicks = [1, 2, 3, 4, 5];
    const [posts, setPosts] = useState([]);

    useAutoAuth();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text>Hello, World! Ебать рот я рпрограмит</Text>
                <Link href="/(authentication)/sign-in" asChild>
                    <Button title="хуй" />
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default Index;
