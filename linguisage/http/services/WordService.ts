import $api from "../index";
import { IWordData } from "../../types/WordInterface";
import { IUserSenses } from "../../types/UserSensesInterface";
import { IWordStatus } from "../../types/IWordStatus";
import qs from "qs";

interface SearchWordParams {
    query: string;
    context?: string;
}
interface IGetSenses {
    query?: string;
    sense_status?: IWordStatus[];
}
export default class WordService {
    static async searchWord(word: string, context: string = ""): Promise<IWordData> {
        const params: SearchWordParams = {
            query: word.trim().toLowerCase(),
        };

        if (!!context) {
            console.log("Контекст для слова отправляется тоже!");
            params[`context`] = context;
        }

        return $api.get("senses/search", { params }).then((response) => {
            return response.data;
        });
    }

    static async getMySenses(
        search_query?: string,
        wordStatusFilter?: IWordStatus[],
    ): Promise<IUserSenses> {
        const params: IGetSenses = {
            query: search_query?.length == 0 ? undefined : search_query,
            sense_status: wordStatusFilter,
        };

        const options = {
            params,
            paramsSerializer: (params: IGetSenses) =>
                qs.stringify(params, { arrayFormat: "repeat" }),
        };

        return $api.get("senses", options).then((response) => {
            return response.data;
        });
    }
    static async addPublicSenseToMe(
        fSenseId: number,
        fWordImageIds: number[],
        fSenseImageIds: number[] = [],
    ) {
        try {
            const data = {
                f_sense_id: fSenseId,
                f_word_image_ids: fWordImageIds,
                f_sense_image_ids: fSenseImageIds,
            };

            // if (literature_id) {
            //   data["literature_id"] = literature_id
            // }

            const response = await $api.post("senses/public", data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteSense(senseId: number): Promise<void> {
        try {
            // if (literature_id) {
            //   data["literature_id"] = literature_id
            // }

            const response = await $api.delete(`senses/${senseId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
