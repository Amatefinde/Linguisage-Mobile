import React, { useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Form, H1, Input, SizableText, Text, View } from "tamagui";
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
                    <H1>Linguisage</H1>
                </View>
                <Form onSubmit={handleLogin} gap={20} marginBottom={24} width={"80%"}>
                    <Input placeholder="Username" value={username} onChangeText={setUsername} />
                    <SizableText theme="alt2" size="$3">
                        alt2
                    </SizableText>
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
