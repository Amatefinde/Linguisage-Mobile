import React, { useEffect, useState } from "react";
import TrainService from "../http/services/TrainService";
import { IUserSense } from "../types/UserSensesInterface";
import WordCard from "./WordCard";
import type { CardProps } from "tamagui";
import { View } from "tamagui";
import AddWordCard from "./AddWordCard";

const WordCards = (cardProps?: CardProps) => {
    const [senses, setSenses] = useState<IUserSense[]>([]);
    useEffect(() => {
        async function fetchSenses() {
            try {
                const fetchedSenses = await TrainService.getTrain(3);
                setSenses(fetchedSenses.senses);
            } catch (e) {
                console.log("произошла ошибка при фетче");
            }
        }

        fetchSenses();
    }, []);

    return (
        <View gap={10}>
            {senses.map((sense) => (
                <WordCard key={sense.id} sense={sense} {...cardProps} />
            ))}
            <AddWordCard />
        </View>
    );
};

export default WordCards;
