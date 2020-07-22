import client from "./client";

const endpoint1 = "isLocation_exists";
const endpoint2 = "save_code/";

const getLocalityExistence = (location) =>
  client.get(endpoint1, {
    location,
  });

const addAddress = (address, onUploadProgress) => {
  return client.post(endpoint2, address, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default { addAddress, getLocalityExistence };
