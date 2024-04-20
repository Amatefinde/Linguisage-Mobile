import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Input, Form, Button, View, Text } from "tamagui";
import { Link } from "expo-router";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <Input placeholder="Email" value={email} onChangeText={setEmail} />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button onPress={handleLogin}>
                        <Text>Login</Text>
                    </Button>
                </Form>
                <Link href="/sign-up" asChild>
                    <Text>Sign Up</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SignInScreen;
