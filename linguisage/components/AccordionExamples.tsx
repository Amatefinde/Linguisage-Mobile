import React from "react";
import { Accordion, Paragraph, Square } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import { ISense } from "../types/WordInterface";
import { IUserSense } from "../types/UserSensesInterface";

interface IAccordionExamplesProps {
    sense: ISense | IUserSense;
}

const AccordionExamples: React.FC<IAccordionExamplesProps> = ({ sense }) => {
    return (
        <Accordion scaleX={1.02} overflow="hidden" type="multiple" borderWidth={0}>
            <Accordion.Item value={sense.definition}>
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
                        {sense.examples.map((example, i, all) => (
                            <Paragraph
                                key={example.id}
                                margin={10}
                            >{`\u2022 ${example.example}${i === all.length - 1 ? "" : "\n"}`}</Paragraph>
                        ))}
                    </Paragraph>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default AccordionExamples;
