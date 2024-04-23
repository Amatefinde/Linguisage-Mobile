import { useFocusEffect } from "expo-router";
import React from "react";
import { BackHandler } from "react-native";

export default function useBack(callback: () => void) {
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                callback();
                return true; // Запретить действие по умолчанию
            };

            // Добавляем обработчик на событие нажатия кнопки "Назад"
            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            // Функция очистки, которая удаляет обработчик при размонтировании экрана
            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, []),
    );
}
