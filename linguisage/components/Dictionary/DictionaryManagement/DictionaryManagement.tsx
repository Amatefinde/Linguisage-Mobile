import { Button, Input, Text, View, XStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { IWordStatus } from "../../../types/IWordStatus";
import WordService from "../../../http/services/WordService";
import { setUserSenses } from "../../../store/userSenses/userSensesSlice";

export default function DictionaryManagement() {
    const dispatch = useDispatch<AppDispatch>();
    const [querySearch, setQuerySearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [wordStatusFilter, setWordStatusFilter] = useState<IWordStatus[]>([
        "in_queue",
        "in_process",
    ]);

    async function fetchSense() {
        setIsLoading(true);
        try {
            const fetchedSense = await WordService.getMySenses(querySearch, wordStatusFilter);
            dispatch(setUserSenses(fetchedSense));
        } catch (e) {}
        setIsLoading(false);
    }

    useEffect(() => {
        try {
            fetchSense();
        } catch (e) {
            console.log("Во время фетча словаря пользователя произошла ошибка:", e);
        }
    }, [wordStatusFilter]);
    return (
        <XStack margin={20} gap={15}>
            <Input flex={1} />
            <Button theme={"active"}>Search</Button>
        </XStack>
    );
}
