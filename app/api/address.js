import client from "./client";

const endpoint1 = "isLocation_exists";
const endpoint2 = "save_code/";

const getLocalityExistence = (location) =>
    client.get(endpoint1, {
        location,
    });

const getData = async () => {
      try {
        const jsonVal = await AsyncStorage.getItem(response)
        const jsonData = jsonVal != null ? jsonVal.data : null;
        console.log("jsondata : ", jsonData);
        return jsonVal != null ? JSON.parse(jsonVal) : null;
      } catch(e) {
        // lance une erreur
      }
  }

const addAddress = (address, onUploadProgress) => {
    return client.post(endpoint2, address, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default { addAddress, getLocalityExistence, getData };
