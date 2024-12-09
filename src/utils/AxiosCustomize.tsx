import { useAuthStore } from "@/store/AuthStore";
import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use(
    function (config) {
        // const {access_Token}=useAuthStore()
        const access_Token = useAuthStore.getState().access_Token;
        // config.headers.Authorization = access_Token;
        // console.log("check accessToken: ", access_Token)
        config.headers["Authorization"] = "Bearer " + access_Token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default instance;
