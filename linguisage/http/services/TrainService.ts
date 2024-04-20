import $api from "../index.js";
import {IUserSense, IUserSenses} from "../../types/UserSensesInterface";
import IReview from "../../types/IReview.ts";

export default class TrainService {
    // static async addAnswer(f_sense_id, isCorrect) {
    //   const bodyParams = {
    //     f_sense_id: f_sense_id,
    //     is_correct: isCorrect,
    //   };
    //   return $api.post("/training", bodyParams).then((response) => {
    //     return response.data;
    //   });
    // }

    static async getTrain(totalAmountOfWords: number, percentOfStudiedWords: number): Promise<IUserSenses> {
        const params = {
            total_amount_of_words: totalAmountOfWords,
            percent_of_studied_words: percentOfStudiedWords
        };
        return $api.get("/training", {params}).then((response) => {
             return response.data;
        });
    }

    static async addAnswer(sense_id: number, is_correct: boolean){
        const bodyParams = {sense_id, is_correct};
        return $api.post("/training/answer", bodyParams).then((response) => {
            return response.data;
        });
    }

    static async calculate(): Promise<IUserSenses> {
        return $api.post("/training/calculate").then((response) => {
            return response.data;
        });
    }

    static async getAIReview(sentence: string, sense: IUserSense,): Promise<IReview> {
        const bodyParams = {
            sense_id: sense.id,
            sense: sense.definition,
            word: sense.word.word,
            sentence: sentence
        };
        console.log(bodyParams)
        return $api.post("/training/review", bodyParams).then((response) => {
            return response.data;
        });
    }
}
