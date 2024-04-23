import React, { useEffect, useState } from "react";
import { Input, Spinner, XStack, Button, YStack, H2, H4 } from "tamagui";
import { IWordData } from "../types/WordInterface";
import WordService from "../http/services/WordService";
import WordContent from "../components/WordContent/WordContent";
import { AxiosError } from "axios";
import useBack from "../hooks/useBack";
import { useRouter } from "expo-router";

const ModalAddWord = () => {
    const [wordData, setWordData] = useState<IWordData | undefined>();
    const [query, setQuery] = useState<string>("");
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
    const [condition, setCondition] = useState<"loading" | "not_found" | "ok" | "initial">(
        "initial",
    );
    const router = useRouter();
    useBack(() => router.push("/(tabs)/home"));

    async function fetchWordData() {
        try {
            if (query.trim() === "") {
                return;
            }
            setCondition("loading");
            console.log(`фетчим слово ${query}`);
            const fetchedWordData = await WordService.searchWord(query);
            setWordData(fetchedWordData);
            setCondition("ok");
            // @ts-ignore
        } catch (e: AxiosError) {
            if (e?.response?.status == 404) {
                setCondition("not_found");
            }
        }
    }

    useEffect(() => {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            fetchWordData();
        }, 500);
        setTimer(newTimer);
    }, [query]);

    const handleSearch = () => {
        clearTimeout(timer); // Очищаем таймер при нажатии на кнопку поиска
        fetchWordData();
    };

    const wordContent = wordData && <WordContent wordData={wordData} />;

    const conditions = {
        loading: <Spinner size="large" scale={2} margin={30} />,
        ok: wordContent,
        not_found: <H2>Not found</H2>,
        initial: <H4>Here will be word content</H4>,
    };

    return (
        <YStack padding={20} gap={10} flex={1}>
            <XStack justifyContent="center" gap="$2" position={"relative"}>
                <Input flex={1} value={query} onChangeText={setQuery} placeholder="Enter word" />
                <Button themeInverse onPress={handleSearch}>
                    Search
                </Button>
            </XStack>
            {conditions[condition]}
        </YStack>
    );
};

export default ModalAddWord;
