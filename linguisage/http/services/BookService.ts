import $api from "../index";
import IBook from "../../types/IBook";
import IBookList from "../../types/IBookList";

export default class BookService {
    static async getLastBook(): Promise<IBook> {
        return $api.get("/literature/last").then((response) => response.data);
    }

    static async addBook(
        book: File,
        filename: string,
        setFileLoadPercent: (value: number) => void,
    ) {
        const formData = new FormData();
        formData.append("book", book);
        formData.append("filename", filename);

        return $api
            .post("/literature", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                    );
                    setFileLoadPercent(percentCompleted);
                },
            })
            .then((response) => response.data);
    }

    static async getBooks(): Promise<IBookList> {
        return $api.get("/literature").then((response) => response.data);
    }

    static async deleteBook(bookId: number): Promise<void> {
        return $api.delete(`/literature/${bookId}`).then((response) => response.data);
    }
}
