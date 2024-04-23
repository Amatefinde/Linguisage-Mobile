import React, { useState } from "react";
import { Card, H2, H3, Paragraph, Accordion, Square } from "tamagui";
import type { CardProps } from "tamagui";
import { ISense } from "../types/WordInterface";
import { BookOpenCheck } from "@tamagui/lucide-icons";
import { ChevronDown } from "@tamagui/lucide-icons";

const FullSenseCard: React.FC<{ sense: ISense; cardProps?: CardProps }> = ({
    sense,
    cardProps,
}) => {
    return (
        <Card {...cardProps} overflow={"hidden"}>
            <Card.Header paddingBottom={5}>
                <H3>{[sense.part_of_speech, sense.lvl].join(", ")}</H3>
                <Paragraph>{sense.definition}</Paragraph>
            </Card.Header>
            {sense.in_user_dictionary && (
                <BookOpenCheck position={"absolute"} right={20} top={20} />
            )}

            <Accordion
                transform={[{ translateY: 3 }]}
                scaleX={1.02}
                overflow="hidden"
                type="multiple"
                borderWidth={0}
            >
                <Accordion.Item value="a2">
                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                        {({ open }: { open: boolean }) => (
                            <>
                                <Paragraph marginLeft={5}>Examples:</Paragraph>
                                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                                    <ChevronDown size="$1" />
                                </Square>
                            </>
                        )}
                    </Accordion.Trigger>
                    <Accordion.Content>
                        <Paragraph theme="alt2" marginLeft={5}>
                            {sense.examples.map((example, i) => (
                                <Paragraph
                                    key={example.id}
                                    margin={10}
                                >{`\u2022 ${example.example}\n`}</Paragraph>
                            ))}
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default FullSenseCard;
