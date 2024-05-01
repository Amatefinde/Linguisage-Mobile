import { Button, Input, Text, ToggleGroup, View, XStack, YStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { IWordStatus } from "../../../types/IWordStatus";
import WordService from "../../../http/services/WordService";
import { setUserSenses } from "../../../store/userSenses/userSensesSlice";

interface IDictionaryManagementProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateSignal: boolean;
}

const DictionaryManagement: React.FC<IDictionaryManagementProps> = ({
    setIsLoading,
    updateSignal,
}) => {
    const [querySearch, setQuerySearch] = useState<string>("");
    const [wordStatusFilter, setWordStatusFilter] = useState<IWordStatus[]>([
        "in_queue",
        "in_process",
    ]);

    const dispatch = useDispatch<AppDispatch>();
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
    }, [wordStatusFilter, updateSignal]);

    return (
        <YStack alignItems="center" gap="$3">
            <XStack alignItems="center" gap="$3">
                <Input flex={1} />
                <Button theme="active">Search</Button>
            </XStack>
            <XStack>
                <ToggleGroup
                    value={wordStatusFilter}
                    onValueChange={setWordStatusFilter}
                    orientation="horizontal"
                    type="multiple"
                >
                    <ToggleGroup.Item value="in_process">
                        <Text>Current</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="in_queue">
                        <Text>Upcoming</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="complete">
                        <Text>Learned</Text>
                    </ToggleGroup.Item>
                </ToggleGroup>
            </XStack>
        </YStack>
    );
};

export default DictionaryManagement;
