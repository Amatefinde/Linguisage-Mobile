import React, { useEffect, useState } from "react";
import { View, Text } from "tamagui";
import { Button, SafeAreaView } from "react-native";
import { Link } from "expo-router";

import AuthService from "../http/services/AuthService";
import $api from "../http";

const Index = () => {
    const dicks = [1, 2, 3, 4, 5];
    const [posts, setPosts] = useState([]);

    function doLogin() {
        AuthService.login("x-burunduc-x@yandex.ru", "qwerty123")
            .then((e) => console.log(e))
            .catch((err) => console.log(err));
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text>Hello, World! Ебать рот я рпрограмит</Text>
                {/*<Link href="/(authentication)/sign-in" asChild>*/}
                <Button title="хуй" onPress={doLogin} />
                {/*</Link>*/}
            </View>
        </SafeAreaView>
    );
};

export default Index;
