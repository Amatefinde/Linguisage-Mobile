import React, { useState } from "react";
import { Card, H2, H3, Paragraph, Accordion, Square, View } from "tamagui";
import type { CardProps } from "tamagui";
import { ISense } from "../../types/WordInterface";
import { BookOpenCheck } from "@tamagui/lucide-icons";
import { ChevronDown } from "@tamagui/lucide-icons";
import AccordionExamples from "../AccordionExamples";

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
            {sense.examples.length > 0 ? (
                <AccordionExamples sense={sense} />
            ) : (
                <Paragraph></Paragraph>
            )}
        </Card>
    );
};

export default FullSenseCard;
