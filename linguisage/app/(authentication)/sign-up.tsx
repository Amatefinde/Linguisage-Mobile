import React, { useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Form, Input, Text, View } from "tamagui";
import { Link } from "expo-router";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = () => {
        // Здесь можно добавить логику для авторизации
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View flex={1} marginTop={"60%"} alignItems="center">
                <View margin={20}>
                    <Text fontSize={40} fontWeight={"$7"}>
                        Linguisage
                    </Text>
                </View>
                <Form onSubmit={handleLogin} gap={20} marginBottom={24} width={"80%"}>
                    <Input placeholder="Username" value={username} onChangeText={setUsername} />
                    <Input placeholder="Email" value={email} onChangeText={setEmail} />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button onPress={handleLogin}>
                        <Text>Sign Up</Text>
                    </Button>
                </Form>
                <Link href="/sign-in" asChild>
                    <Text>Sign In</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
