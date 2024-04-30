import { IUserSense } from "../types/UserSensesInterface";

export function maskWordInSenseExamples(userSense: IUserSense) {
    const word = userSense.word.word;
    const wordPattern = new RegExp(
        `\\b${word.length > 3 && word.at(-1)?.toLowerCase() === "e" ? word.slice(0, word.length - 1) : word}\\w*\\b`,
        "gi",
    );

    const maskedExamples = userSense.examples.map((example) => {
        const maskedExample = example.example.replace(wordPattern, (match) =>
            "_".repeat(match.length),
        );
        const maskedHtmlExample = example.html_example.replace(wordPattern, (match) =>
            "_".repeat(match.length),
        );
        return { ...example, example: maskedExample, html_example: maskedHtmlExample };
    });

    return { ...userSense, examples: maskedExamples };
}

export default function maskWordInSenses(userSenses: IUserSense[]) {
    return userSenses.map((userSense) => maskWordInSenseExamples(userSense));
}
