import React from "react";
import { View, Text } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FlatList } from "react-native";
import DictionarySenseCard from "./DictionarySenseCard";
const DictionaryContent = () => {
    const senses = useSelector((state: RootState) => state.userSense.senses);
    return (
        <FlatList data={senses} renderItem={({ item }) => <DictionarySenseCard sense={item} />} />
    );
};

export default DictionaryContent;
