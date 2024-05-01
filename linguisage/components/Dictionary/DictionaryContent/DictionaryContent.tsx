import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FlatList, RefreshControl } from "react-native";
import DictionarySenseCard from "./DictionarySenseCard";
import { H2, H4, H5, H6, View } from "tamagui";

interface IDictionaryContentProps {
    isLoading: boolean;
    setUpdateSignal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DictionaryContent: React.FC<IDictionaryContentProps> = ({ isLoading, setUpdateSignal }) => {
    const senses = useSelector((state: RootState) => state.userSense.senses);
    if (senses.length > 0) {
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
    }
    return (
        <View height={400} margin={20} justifyContent={"center"} alignItems={"center"}>
            <H2>Words not found</H2>
            <H4>Try to disable filters or add words in your dictionary</H4>
        </View>
    );
};

export default DictionaryContent;
