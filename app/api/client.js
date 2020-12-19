import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://192.168.0.24:8000/api",
});

export default apiClient;