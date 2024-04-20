export default interface IBook {
    cover: string;
    created_at: Date;
    id: number;
    is_processed: boolean;
    last_opened_at: Date | null;
    last_read_position: number | null;
    original_file: string;
    title: string;
}