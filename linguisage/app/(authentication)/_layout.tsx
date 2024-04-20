import { Link, Stack } from "expo-router";

export default function AuthenticationLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen name="sign-in" options={{}} />
            <Stack.Screen name="sign-up" options={{}} />
        </Stack>
    );
}
