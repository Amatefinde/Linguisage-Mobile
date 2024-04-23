import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "tamagui";
import type { IWordData } from "../../types/WordInterface";
import WordDefinitions from "./WordDefinitions";
import WordImages from "./WordImages";
import WordService from "../../http/services/WordService";
import { useRouter } from "expo-router";

interface IWordContentProps {
    wordData: IWordData;
}

const WordContent: React.FC<IWordContentProps> = ({ wordData }) => {
    const [pickedSenseFId, setPickedSenseFId] = useState<number | undefined>();
    const [pickedImagesFids, setPickedImagesFids] = useState<number[]>([]);
    const [isAllPicked, setIsAllPicked] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        if (pickedSenseFId && wordData.word_images.length == 0) {
            setIsAllPicked(true);
        }
    }, [pickedSenseFId]);

    useEffect(() => {
        if (isAllPicked && pickedSenseFId) {
            WordService.addPublicSenseToMe(pickedSenseFId, pickedImagesFids).then(() => {
                router.push("/modal-word-added-success");
            });
        }
    }, [isAllPicked]);

    return !pickedSenseFId ? (
        <WordDefinitions wordData={wordData} setPickedSenseFId={setPickedSenseFId} />
    ) : (
        <WordImages
            wordData={wordData}
            setPickedWordImages={setPickedImagesFids}
            setIsAllPicked={setIsAllPicked}
        />
    );
};

export default WordContent;
