import {IWordStatus} from "./IWordStatus.ts";

interface WordImage {
    img: string;
    is_public: boolean;
    id: number;
}

interface Example {
    html_example: string;
    example: string;
    id: number;
}

interface Word {
    word: string;
    sound_us: string;
    sound_uk: string;
    id: number;
}

export interface IUserSense {
    id: number;
    status: IWordStatus
    short_cut: null | string;
    part_of_speech: string;
    lvl: null | string;
    is_public: boolean;
    definition: string;
    word_images: WordImage[];
    sense_images: any[]; // Assuming the type of sense_images is an array of any
    word: Word;
    examples: Example[];
    created_at: Date;
}

export interface IUserSenses {
    senses: IUserSense[];
}
