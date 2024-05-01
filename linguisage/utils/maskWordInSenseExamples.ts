import { IUserSense } from "../types/UserSensesInterface";

export function maskWordInSenseExamples(userSense: IUserSense, numHints: number = 0) {
    const word = userSense.word.word;
    const wordPattern = new RegExp(
        `\\b${word.length > 3 && word.at(-1)?.toLowerCase() === "e" ? word.slice(0, word.length - 1) : word}\\w*\\b`,
        "gi",
    );

    const maskedExamples = userSense.examples.map((example) => {
        const maskedExample = example.example.replace(wordPattern, (match) =>
            maskWord(match, numHints),
        );
        const maskedHtmlExample = example.html_example.replace(wordPattern, (match) =>
            maskWord(match, numHints),
        );
        return { ...example, example: maskedExample, html_example: maskedHtmlExample };
    });

    return { ...userSense, examples: maskedExamples };
}

function maskWord(word: string, numHints: number) {
    if (numHints === 0) {
        return "_".repeat(word.length);
    } else {
        const hints = word.slice(0, numHints);
        const maskedPart = "_".repeat(word.length - numHints);
        return hints + maskedPart;
    }
}

export default function maskWordInSenses(userSenses: IUserSense[]) {
    return userSenses.map((userSense) => maskWordInSenseExamples(userSense));
}
