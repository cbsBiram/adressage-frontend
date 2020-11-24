import React, { useEffect, useState } from "react";
import Toast from "react-native-simple-toast";
import { StyleSheet, View, ImageBackground, Share } from "react-native";

import addressesApi from "../api/address";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import colors from "../config/colors";
import Header from "../components/Header";
import routes from "../navigation/routes";
import UploadScreen from "./UploadScreen";
import useApi from "../hooks/useApi";
import utils from "../utility/utils";
import {
  reverseGeolocation,
  getDistrictLocation,
} from "./../services/nominatimServices";

function HomeScreen(props) {
  const getCodeApi = useApi(addressesApi.getLocalityExistence);
  const saveCodeApi = useApi(addressesApi.addAddress);

  const [addressDetails, setAddressDetails] = useState({});
  const [addressName, setAddressName] = useState("");
  const [addressType, setAddressType] = useState("");
  const [code, setCode] = useState("");
  const [codeAlreadyExists, setCodeAlreadyExists] = useState(false);
  const [boundingBox, setBoundingBox] = useState(null);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const shareButtonVisible = afterRecord || codeAlreadyExists;

  const getCurrentLocation = async () => {
    let { latitude, longitude } = props.route.params;

    try {
      const { data } = await reverseGeolocation(latitude, longitude);

      setAddressDetails(data.address);
      setAddressName(data.display_name);
      setAddressType(data.type);
      setBoundingBox(data.boundingbox);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const generateCode = async () => {
    let generatedCode;

    if (addressName) {
      const response = await getCodeApi.request(addressName);

      if (!response.ok) return alert("Le code n'a pas pu être généré.");
      const {
        data: { isLocation_exists, code },
      } = response;
      generatedCode = isLocation_exists ? code : "";
      await generateCodeHandler(generatedCode, addressDetails);
    }
  };

  const generateCodeHandler = async (generatedCode, addressDetails) => {
    if (generatedCode) {
      Toast.show("Cette localité existe déjà !");
      setCode(generatedCode);
      setCodeAlreadyExists(true);
    } else {
      if (addressDetails) {
        let { country, region, city, road } = utils.formatAddress(
          addressDetails
        );

        // load the bounding box of the road
        let query;
        if (road) query = region + "," + city + "," + road;
        else query = region + "," + city;

        let bBoxDistrict = await getDistrict(query);
        let boundingBoxRoad = bBoxDistrict.boundingbox;
        let suffixCode = utils.getHouseNumber(boundingBox, boundingBoxRoad);

        if (country && region && city) {
          let regionCode = utils.formatCode(region);
          let cityCode = utils.formatCode(city);

          let roadCode;
          if (road) roadCode = utils.formatCode(road);

          if (road)
            generatedCode =
              regionCode + "-" + cityCode + "-" + roadCode + "-" + suffixCode;
          else generatedCode = regionCode + "-" + cityCode + "-" + suffixCode;

          setCode(generatedCode);
        }
      }
    }
  };

  const getDistrict = async (query) => {
    let response;
    await getDistrictLocation("jsonv2", query, "sn")
      .then(({ data }) => {
        response = data[0];
      })
      .catch((error) => console.error(error));

    // setBBoxDistrict(resp);
    return response;
  };

  const goToRecord = () => {
    let { country, region, city, road: suburb } = utils.formatAddress(
      addressDetails
    );
    let { latitude, longitude } = props.route.params;
    let address = {
      country,
      region,
      city,
      suburb,
      location_name: addressName,
      latitude,
      longitude,
      generated_code: code,
    };

    props.navigation.navigate(routes.Record, { address });
  };

  const saveCode = async (e) => {
    e.preventDefault();
    let { country, region, city, road: suburb } = utils.formatAddress(
      addressDetails
    );
    let { latitude, longitude } = props.route.params;
    let address = {
      country,
      region,
      city,
      suburb,
      location_name: addressName,
      latitude,
      longitude,
      generated_code: code,
    };
    setProgress(0);
    setUploadVisible(true);

    const response = await saveCodeApi.request(address, (progressUpload) =>
      setProgress(progressUpload)
    );

    if (!response.ok) return alert("Votre code n'a pas pu être enregistré.");

    setCodeAlreadyExists(true);
    alert("Votre code a bien été enregistré !!!");
  };

  const shareCode = async () => {
    try {
      const result = await Share.share({
        message: code,
        title: "Votre code Myhali",
        // url: "https://reactnativemaster.com/react-native-camera-expo-example/",
      });

      if (result.action === Share.sharedAction) {
        alert("Post Shared");
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        alert("Post cancelled");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  var isCodeGenerated = code ? true : false;
  const { afterRecord } = props.route.params;

  return (
    <>
      <AppActivityIndicator visible={getCodeApi.loading} />
      <View style={styles.container}>
        <Header />
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <ImageBackground
          style={styles.image}
          source={require("./../assets/road2.webp")}
        >
          <AppInput
            inputStyle={styles.input}
            addressName={addressName}
            code={code}
          />
          <AppButton title="Générer code" onPress={() => generateCode()} />

          {isCodeGenerated && !codeAlreadyExists && !afterRecord && (
            <>
              <AppButton
                icon="content-save"
                onPress={(e) => saveCode(e)}
                title="Enregistrer"
              />
              <AppButton
                icon="microphone"
                title="Vocal"
                onPress={() => goToRecord()}
              />
            </>
          )}

          {shareButtonVisible && (
            <AppButton
              icon="share"
              title="Partager"
              onPress={() => shareCode()}
            />
          )}
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 5,
    padding: 5,
    height: 60,
    backgroundColor: colors.secondary,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default HomeScreen;
