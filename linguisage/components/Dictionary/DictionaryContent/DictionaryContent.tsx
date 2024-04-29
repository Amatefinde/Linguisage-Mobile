import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FlatList, RefreshControl } from "react-native";
import DictionarySenseCard from "./DictionarySenseCard";

interface IDictionaryContentProps {
    isLoading: boolean;
    setUpdateSignal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DictionaryContent: React.FC<IDictionaryContentProps> = ({ isLoading, setUpdateSignal }) => {
    const senses = useSelector((state: RootState) => state.userSense.senses);
    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                        console.log("делаем апдейт словаря");
                        setUpdateSignal((prev) => !prev);
                    }}
                />
            }
            keyExtractor={(item) => item.id.toString()}
            data={senses}
            renderItem={({ item }) => <DictionarySenseCard sense={item} />}
        />
    );
};

export default DictionaryContent;
