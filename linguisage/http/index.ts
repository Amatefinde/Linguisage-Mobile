import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const $api = axios.create({
    withCredentials: true,
    responseType: "json",
    baseURL: "https://linguisage.ru:9300/api/v1/",
});

$api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem("token")}`;
    return config;
});

export default $api;
