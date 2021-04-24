import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://adressage-backend.herokuapp.com/api",
  },
  staging: {
    apiUrl: "https://adressage-backend.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://adressage-backend.herokuapp.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
