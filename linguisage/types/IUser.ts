export default interface IUser {
    id: string;
    email: string;
    username: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    last_verification_request: Date | null;
    account_status: "default" | "premium" | "superpro";
}