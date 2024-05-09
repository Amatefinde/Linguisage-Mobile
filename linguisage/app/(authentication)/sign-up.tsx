import React, { useState } from "react";

import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Form, H1, Input, SizableText, Spinner, Text, View } from "tamagui";
import { Link, useRouter } from "expo-router";
import { EmailErrorEnum, EmailErrorType, PasswordErrorType, UsernameErrorType } from "./types";
import { validateEmail, validatePassword, validateUsername } from "./validations";
import AuthService from "../../http/services/AuthService";
import { setUser } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordError, setPasswordError] = useState<PasswordErrorType>(null);
    const [emailError, setEmailError] = useState<EmailErrorType>(null);
    const [usernameError, setUsernameError] = useState<UsernameErrorType>(null);
    const [isResponseWaiting, setIsResponseWaiting] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();

    async function handleSignUp() {
        setIsResponseWaiting(true);
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));
        setUsernameError(validateUsername(username));

        if (validateEmail(email) || validatePassword(password) || validateUsername(username)) {
            setIsResponseWaiting(false);
            return;
        }

        try {
            console.log("Создаём аккаунт...");
            const user = await AuthService.register(email, username, password);
            dispatch(setUser(user));
            await AsyncStorage.setItem("email", email);
            const loginResponse = await AuthService.login(email, password);
            await AsyncStorage.setItem("token", loginResponse.access_token);
            router.push("/verification");
            // @ts-ignore
        } catch (error: AxiosError) {
            setIsResponseWaiting(false);
            if (error.response && error.response.status === 400) {
                if (error.response?.data?.detail === "REGISTER_USER_ALREADY_EXISTS") {
                    setEmailError(EmailErrorEnum.alreadyExists);
                } else if (error.response?.data?.detail === "UNSUPPORTED_EMAIL_ADDRESS") {
                    setEmailError(EmailErrorEnum.notSupport);
                }
            } else {
                console.error("Ошибка при входе в аккаунт:", error.message);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View flex={1} marginTop={"60%"} alignItems="center">
                <View margin={20}>
                    <H1>Linguisage</H1>
                </View>
                <Form onSubmit={handleSignUp} gap={20} marginBottom={24} width={"80%"}>
                    <Input placeholder="Username" value={username} onChangeText={setUsername} />
                    {usernameError && (
                        <SizableText marginLeft={10} color={"red"} size="$4">
                            {usernameError}
                        </SizableText>
                    )}
                    <Input placeholder="Email" value={email} onChangeText={setEmail} />
                    {emailError && (
                        <SizableText marginLeft={10} color={"red"} size="$4">
                            {emailError}
                        </SizableText>
                    )}
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    {passwordError && (
                        <SizableText marginLeft={10} color={"red"} size="$4">
                            {passwordError}
                        </SizableText>
                    )}
                    <Button
                        iconAfter={isResponseWaiting ? () => <Spinner /> : undefined}
                        onPress={handleSignUp}
                    >
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
