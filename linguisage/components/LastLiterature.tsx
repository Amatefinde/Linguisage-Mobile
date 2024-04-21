import React, { useEffect, useState } from "react";
import { Button, Card, H3, H4, Image, Paragraph, XStack } from "tamagui";
import type { CardProps } from "tamagui";
import BookService from "../http/services/BookService";
import IBook from "../types/IBook";

const LastLiterature = (props: CardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [lastBook, setLastBook] = useState<IBook>();
    useEffect(() => {
        async function fetchLastBook() {
            setIsLoading(true);
            try {
                const fetchedLastBook = await BookService.getLastBook();
                setLastBook(fetchedLastBook);
            } catch (e) {
                console.log("Во время фетча последней книги произошла ошибка");
            }
            setIsLoading(false);
        }

        fetchLastBook();
    }, []);

    const component = (
        <Card size="$4" {...props}>
            <XStack
                height="100%"
                padding={15}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                gap={1}
            >
                <Image
                    resizeMode="contain"
                    alignSelf="center"
                    borderRadius={10}
                    width={"37%"}
                    height={"100%"}
                    source={{
                        uri: lastBook?.cover,
                    }}
                />
                <Card.Header width="55%" paddingTop={0}>
                    <H4>{lastBook?.title}</H4>
                    <Paragraph theme="alt2">Some subtitle</Paragraph>
                </Card.Header>
            </XStack>
        </Card>
    );
    return isLoading || component;
};

export default LastLiterature;