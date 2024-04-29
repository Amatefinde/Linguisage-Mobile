import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import IUser from "../types/IUser";
import AuthService from "../http/services/AuthService";
import { setUser } from "../store/user/userSlice";

export default function useAutoAuth() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const auth = async function () {
            try {
                const user: IUser = await AuthService.me();
                if (user.is_verified) {
                    dispatch(setUser(user));
                    router.replace("/(tabs)/home");
                } else {
                    router.push("/(authentication)/verification");
                }
            } catch (error) {
                router.push("/(authentication)/sign-in");
            }
        };
        auth();
    }, []);
}
