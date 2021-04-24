import client from "./client";

const locationEndpoint = "isLocation-exists/";
const saveCodeEndpoint = "save-code/";
const myAddressesEndpoint = "my-addresses/";

const getLocalityExistence = (location, userId) =>
  client.get(locationEndpoint, {
    location,
    userId,
  });

const addAddress = (address, onUploadProgress) => {
  // console.log(address);
  return client.post(saveCodeEndpoint, address, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getMyAddresses = (userId) => client.get(myAddressesEndpoint, { userId });

export default { addAddress, getLocalityExistence, getMyAddresses };
