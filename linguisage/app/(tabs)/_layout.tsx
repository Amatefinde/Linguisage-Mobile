import { Link, Tabs } from "expo-router";
import { Home, BookOpen, Target, Settings } from "@tamagui/lucide-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#5e8deb", // Цвет активной иконки
                tabBarInactiveTintColor: "#333", // Цвет неактивной иконки
                tabBarLabelStyle: { fontSize: 16, fontWeight: "bold", padding: 10 }, // Увеличенный размер шрифта и жирный текст
                tabBarStyle: {
                    height: 65,
                    padding: 15,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Home color={focused ? "#5e8deb" : "#333"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="dictionary"
                options={{
                    headerShown: false,
                    title: "Dictionary",
                    tabBarIcon: ({ color, focused }) => (
                        <BookOpen color={focused ? "#5e8deb" : "#333"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pre-training"
                options={{
                    title: "Training",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Target color={focused ? "#5e8deb" : "#333"} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Settings color={focused ? "#5e8deb" : "#333"} />
                    ),
                }}
            />
        </Tabs>
    );
}
