export default function splitArrayInHalf<T>(originalArray: T[]): [T[], T[]] {
    const middle = Math.ceil(originalArray.length / 2);
    const firstHalf = originalArray.slice(0, middle);
    const secondHalf = originalArray.slice(middle);

    return [firstHalf, secondHalf];
}