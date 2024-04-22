import React, { useEffect, useState } from "react";
import { View, Text, Input, H1, Paragraph } from "tamagui";
import { IWordData } from "../types/WordInterface";
import WordService from "../http/services/WordService";
import FullSenseCard from "../components/FullSenseCard";

const ModalAddWord = () => {
    const [wordData, setWordData] = useState<IWordData>();
    const [query, setQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    async function fetchWordData() {
        try {
            if (query.trim() === "") {
                return;
            }
            setIsLoading(true);
            console.log(`фетчим слово ${query}`);
            const fetchedWordData = await WordService.searchWord(query);
            setWordData(fetchedWordData);
        } catch (e) {}
        setIsLoading(false);
    }

    useEffect(() => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            fetchWordData();
        }, 500);
        setTimer(newTimer);
    }, [query]);

    const wordContent = wordData && (
        <>
            <H1>{wordData?.word}</H1>
            {wordData.senses.map((sense) => (
                <FullSenseCard sense={sense} key={sense.f_sense_id} />
            ))}
        </>
    );

    return (
        <View padding={20} gap={10}>
            <Input value={query} onChangeText={setQuery} placeholder="Enter word" />
            {isLoading ? <Paragraph>Loading...</Paragraph> : wordContent}
        </View>
    );
};

export default ModalAddWord;
