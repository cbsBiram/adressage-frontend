import { create } from "apisauce";

const client = create({
    baseURL: "https://api.cloudinary.com/v1_1/biram",
});
const endpoint = "upload";

const uploadAudio = (file, onUploadProgress) => {
    var data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "myhali");
    data.append("resource_type", "video");

    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default { uploadAudio };