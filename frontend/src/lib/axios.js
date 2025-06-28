import axios from "axios";

const baseURL = import.meta.env.MODE === "development"?"http://localhost:7000/api": "/api";

export const axiosInstance = axios.create({
    baseURL:baseURL,
    withCredentials:true,//send cookies with requests
});