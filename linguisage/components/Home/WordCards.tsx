import React, { useEffect, useState } from "react";
import TrainService from "../../http/services/TrainService";
import { IUserSense } from "../../types/UserSensesInterface";
import WordCard from "./WordCard";
import type { CardProps } from "tamagui";
import { View } from "tamagui";
import AddWordCard from "./AddWordCard";

interface IWordCardsProps {
    setIsWordsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isWordsLoading: boolean;
    updateSignal: boolean;
}

const WordCards = (cardProps: CardProps & IWordCardsProps) => {
    const [senses, setSenses] = useState<IUserSense[]>([]);
    useEffect(() => {
        async function fetchSenses() {
            cardProps.setIsWordsLoading(true);
            try {
                const fetchedSenses = await TrainService.getTrain(3);
                setSenses(fetchedSenses.senses);
            } catch (e) {
                console.log("произошла ошибка при фетче");
            }
            cardProps.setIsWordsLoading(false);
        }

        fetchSenses();
    }, [cardProps.updateSignal]);

    return (
        cardProps.isWordsLoading || (
            <View gap={15}>
                {senses.map((sense) => (
                    <WordCard key={sense.id} sense={sense} {...cardProps} />
                ))}
                <AddWordCard />
            </View>
        )
    );
};

export default WordCards;
