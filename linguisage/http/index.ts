import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    responseType: "json",
    baseURL: "https://api.linguisage.ru:9300/api/v1/",
});

// $api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//     return config;
// });

export default $api;
