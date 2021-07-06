import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-simple-toast";
import { StyleSheet, View, ImageBackground, Share } from "react-native";

import addressesApi from "../api/address";
import AppActivityIndicator from "../components/common/AppActivityIndicator";
import AppButton from "../components/common/AppButton";
import AppInput from "../components/common/AppInput";
import colors from "../config/colors";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";
import utils from "../utility/utils";
import reverseGeolocation from "./../services/nominatimServices";
import AuthContext from "../auth/context";

function HomeScreen(props) {
  const getCodeApi = useApi(addressesApi.getLocalityExistence);
  const saveCodeApi = useApi(addressesApi.addAddress);

  const [addressDetails, setAddressDetails] = useState({});
  const [addressName, setAddressName] = useState("");
  const [addressType, setAddressType] = useState("");
  const [code, setCode] = useState("");
  const [codeAlreadyExists, setCodeAlreadyExists] = useState(false);
  const [boundingBox, setBoundingBox] = useState(null);
  const [progress, setProgress] = useState(0);

  const userContext = useContext(AuthContext);
  const userId = userContext?.user?.user_id;

  const getCurrentLocation = async () => {
    let { latitude, longitude } = props.route.params;

    try {
      const { data } = await reverseGeolocation(latitude, longitude);

      setAddressDetails(data.features[0]);
      setAddressName(data.features[0].place_name);
      setAddressType(data.features[0].place_type);
      setBoundingBox(data.features[0].bbox);
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
      const response = await getCodeApi.request(addressName, userId);

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
        let { country, region, city} =
          utils.formatAddress(addressDetails);

        // load the bounding box of the road
        let query;
        query = region + "," + city;
        let suffixCode = utils.getHouseNumber(boundingBox);

        if (country && region && city) {
          let regionCode = utils.formatCode(region);
          let cityCode = utils.formatCode(city);
          generatedCode = regionCode + "-" + cityCode + "-" + suffixCode;

          setCode(generatedCode);
        }
      }
    }
  };

  const goToRecord = () => {
    let {
      country,
      region,
      city,
    } = utils.formatAddress(addressDetails);
    let { latitude, longitude } = props.route.params;
    let usersId = userId ? [userId] : null;
    let address = {
      country,
      region,
      city,
      location_name: addressName,
      latitude,
      longitude,
      generated_code: code,
      users_id: usersId,
    };

    props.navigation.navigate(routes.RECORD, { address });
  };

  const saveCode = async (e) => {
    e.preventDefault();
    let {
      country,
      region,
      city,
    } = utils.formatAddress(addressDetails);
    let usersId = userId ? [userId] : null;
    let { latitude, longitude } = props.route.params;
    let address = {
      country,
      region,
      city,
      location_name: addressName,
      latitude,
      longitude,
      generated_code: code,
      users_id: usersId,
    };

    const response = await saveCodeApi.request(address, (progressUpload) =>
      setProgress(progressUpload)
    );

    if (!response.ok) {
      return alert("Votre code n'a pas pu être enregistré.");
    }

    setCodeAlreadyExists(true);
    props.navigation.navigate(routes.MY_ADRESSES);
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: code,
        title: "Votre code Myhali",
        // url: "https://reactnativemaster.com/react-native-camera-expo-example/",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  var isCodeGenerated = code ? true : false;
  const { afterRecord } = props.route.params;
  const shareButtonVisible = afterRecord || codeAlreadyExists;

  return (
    <>
      <AppActivityIndicator visible={getCodeApi.loading} />
      <View style={styles.container}>
        {/* <Header /> */}
        <ImageBackground
          style={styles.image}
          source={require("./../assets/road2.webp")}
        >
          <AppInput
            inputStyle={styles.input}
            addressName={addressName}
            code={code}
          />
          <View style={{ alignItems: "center" }}>
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
          </View>
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
