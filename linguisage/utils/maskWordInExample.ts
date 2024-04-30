import { IUserSense } from "../../../Linguisage-Frontend/src/types/UserSensesInterface.ts";

export function maskWordInExample(userSense: IUserSense) {
    const maskedExamples = userSense.examples.map((example) => {
        const maskedExample = example.example.replace(
            new RegExp(userSense.word.word, "gi"),
            "_".repeat(userSense.word.word.length),
        );
        const maskedHtmlExample = example.html_example.replace(
            new RegExp(userSense.word.word, "gi"),
            "_".repeat(userSense.word.word.length),
        );
        return { ...example, example: maskedExample, html_example: maskedHtmlExample };
    });

    return { ...userSense, examples: maskedExamples };
}

export default function maskWordInExamples(userSenses: IUserSense[]) {
    return userSenses.map((userSense) => maskWordInExample(userSense));
}
