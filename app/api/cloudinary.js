import { create } from "apisauce";

const client = create({
    baseURL: "https://api.cloudinary.com/v1_1/biram",
});
const endpoint = "upload";

const uploadAudio = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "myhali");
    data.append("resource_type", "video");

    return client.post(endpoint, data);
};

export default { uploadAudio };