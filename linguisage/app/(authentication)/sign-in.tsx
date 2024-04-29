import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Input, Form, Button, View, Text, Label, H1, SizableText, Stack, Spinner } from "tamagui";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../../http/services/AuthService";
import { EmailErrorType, PasswordErrorEnum, PasswordErrorType } from "./types";
import { validateEmail, validatePassword } from "./validations";
import IUser from "../../types/IUser";
import { AxiosError } from "axios";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<PasswordErrorType>(null);
    const [emailError, setEmailError] = useState<EmailErrorType>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const storeData = async (token: string) => {
        try {
            await AsyncStorage.setItem("token", token);
            console.log("Токен упешно сохранён!", token);
        } catch (e) {
            console.log("Во время сохранения токен в AsyncStorage произошла ошибка!", e);
            throw e;
        }
    };

    async function handleLogin() {
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));
        if (validateEmail(email) || validatePassword(password)) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await AuthService.login(email, password);
            await storeData(response.access_token);
            const user: IUser = await AuthService.me();
            if (user.is_verified) {
                router.push("/(tabs)/home");
            } else {
                router.push("/(authentication)/verification");
            }
            // @ts-ignore
        } catch (error: AxiosError) {
            if (error.response && error.response.status === 400) {
                setPasswordError(PasswordErrorEnum.invalidCredentials);
                setPassword("");
            } else {
                console.error("Ошибка при входе в аккаунт:", error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View flex={1} marginTop={"60%"} alignItems="center">
                <View margin={20}>
                    <H1>Linguisage</H1>
                </View>

                <Form onSubmit={handleLogin} gap={20} marginBottom={24} width={"80%"}>
                    <Stack>
                        <Input placeholder="Email" value={email} onChangeText={setEmail} />
                        {emailError && (
                            <SizableText marginLeft={10} color={"red"} size="$4">
                                {emailError}
                            </SizableText>
                        )}
                    </Stack>
                    <Stack>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            secureTextEntry
                        />
                        {passwordError && (
                            <SizableText marginLeft={10} color={"red"} size="$4">
                                {passwordError}
                            </SizableText>
                        )}
                    </Stack>
                    <Button
                        onPress={handleLogin}
                        icon={isSubmitting ? () => <Spinner /> : undefined}
                    >
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
