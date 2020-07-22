import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://192.168.0.8:8000/api",
});

export default apiClient;