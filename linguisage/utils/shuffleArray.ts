export default function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]; // Создаем копию исходного массива

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Меняем элементы местами
    }

    return shuffledArray;
}