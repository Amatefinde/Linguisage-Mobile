export interface IWordData {
    word: string;
    f_word_id: number;
    sound_uk: string;
    sound_us: string;
    word_images: IWordImage[];
    senses: ISense[];
}

export interface IWordImage {
    is_public: boolean;
    f_image_id: number;
    img: string;
}

export interface ISense {
    is_public: boolean;
    definition: string;
    part_of_speech: string;
    f_sense_id: number;
    lvl: string | null;
    short_cut: string;
    examples: IExample[];
    in_user_dictionary: boolean;
}


export interface IExample {
    id: number;
    example: string;
    html_example: string;
}