import { IUserSense } from "../types/UserSensesInterface";

function pickRandomImage(sense: IUserSense): string | null {
    if (sense.sense_images.length === 0 && sense.word_images.length === 0) {
        return null;
    }
    const amountWordImages = sense.word_images.length;
    const randomIndex = Math.floor(Math.random() * amountWordImages);
    return sense.word_images[randomIndex].img;
}

export default pickRandomImage;
