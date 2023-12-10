import axios from "axios";

const baseURL = "http://localhost:7000/api";

const $api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})


export const createApiFromPath = (basePath: string) => {
    return {
        get: (path: string, ...args: any[]) => $api.get(`${basePath}${path}`, ...args),
        post: (path: string, ...args: any[]) => $api.post(`${basePath}${path}`, ...args),
        put: (path: string, ...args: any[]) => $api.put(`${basePath}${path}`, ...args),
    }
}
export default $api;