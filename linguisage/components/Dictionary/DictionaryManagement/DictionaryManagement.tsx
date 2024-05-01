import {
    Adapt,
    Button,
    Input,
    Paragraph,
    Select,
    Sheet,
    Text,
    ToggleGroup,
    XStack,
    YStack,
} from "tamagui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { IWordStatus } from "../../../types/IWordStatus";
import WordService from "../../../http/services/WordService";
import { setUserSenses } from "../../../store/userSenses/userSensesSlice";
import { Check, ChevronDown } from "@tamagui/lucide-icons";

interface IDictionaryManagementProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateSignal: boolean;
}

const DictionaryManagement: React.FC<IDictionaryManagementProps> = ({
    setIsLoading,
    updateSignal,
}) => {
    const [wordStatusFilter, setWordStatusFilter] = useState<IWordStatus[]>([
        "in_queue",
        "in_process",
    ]);
    const [sort, setSort] = useState<string>("new");
    const [query, setQuery] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    async function fetchSense() {
        setIsLoading(true);
        try {
            const fetchedSense = await WordService.getMySenses(
                query.toLowerCase().trim(),
                wordStatusFilter,
            );
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
                <Input flex={1} value={query} onChangeText={setQuery} />
                <Button theme="active" onPress={fetchSense}>
                    Search
                </Button>
            </XStack>

            <ToggleGroup
                size={"sm"}
                height={35}
                backgroundColor={"blue"}
                value={wordStatusFilter}
                onValueChange={setWordStatusFilter}
                orientation="horizontal"
                type="multiple"
            >
                <ToggleGroup.Item value="in_process" width={"33.333%"}>
                    <Text>Current</Text>
                </ToggleGroup.Item>
                <ToggleGroup.Item width={"33.333%"} value="in_queue">
                    <Text>Upcoming</Text>
                </ToggleGroup.Item>
                <ToggleGroup.Item width={"33.333%"} value="complete">
                    <Text>Learned</Text>
                </ToggleGroup.Item>
            </ToggleGroup>
        </YStack>
    );
};

export default DictionaryManagement;
