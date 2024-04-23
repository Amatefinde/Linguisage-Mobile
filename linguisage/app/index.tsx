import React, { useEffect, useState } from "react";
import { View, Text, Spinner } from "tamagui";
import { Button, SafeAreaView } from "react-native";
import useAutoAuth from "../hooks/useAutoAuth";

const Index = () => {
    const dicks = [1, 2, 2, 3, 4, 5];
    const [posts, setPosts] = useState([]);

    useAutoAuth();
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Spinner size="large" scale={2} />
        </SafeAreaView>
    );
};

export default Index;
