import React, { useState } from "react";
import { Button, Image, ScrollView, useTheme, View } from "tamagui";
import type { IWordData, IWordImage } from "../../types/WordInterface";

interface IWordImagesProps {
    wordData: IWordData;
    setPickedWordImages: React.Dispatch<React.SetStateAction<number[]>>;
    setIsAllPicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordImages: React.FC<IWordImagesProps> = ({
    wordData,
    setPickedWordImages,
    setIsAllPicked,
}) => {
    const [tmpPickedImageIds, setTmpPickedImageIds] = useState<number[]>([]);
    const theme = useTheme();

    function handleImageClick(fImgID: number) {
        if (tmpPickedImageIds.includes(fImgID)) {
            setTmpPickedImageIds((prevIds) => prevIds.filter((id) => id !== fImgID));
        } else {
            setTmpPickedImageIds((prevIds) => [...prevIds, fImgID]);
        }
    }

    function isImageSelected(fImgID: number) {
        return tmpPickedImageIds.includes(fImgID);
    }

    const imageColor = (image: IWordImage) =>
        isImageSelected(image.f_image_id) ? theme.color075?.val : "transparent";

    const handleAddButton = () => {
        setPickedWordImages(tmpPickedImageIds);
        setIsAllPicked(true);
    };

    return (
        <View flex={1} gap={10}>
            <ScrollView borderRadius={20}>
                <View gap={8} flex={1}>
                    {wordData.word_images.map((image) => (
                        <View
                            key={image.f_image_id}
                            borderColor={imageColor(image)}
                            backgroundColor={imageColor(image)}
                            borderStyle={"solid"}
                            borderWidth={5}
                            borderRadius={15}
                        >
                            <Image
                                src={image.img}
                                borderRadius={10}
                                width="100%"
                                maxWidth="100%"
                                onLoad={(event) => {
                                    const { width, height } = event.nativeEvent.source;
                                    event.currentTarget.setNativeProps({
                                        aspectRatio: width / height,
                                    });
                                }}
                                onPress={() => handleImageClick(image.f_image_id)}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Button onPress={handleAddButton}>Add</Button>
        </View>
    );
};

export default WordImages;
