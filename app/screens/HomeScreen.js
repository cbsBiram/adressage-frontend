import React from "react";
import Toast from "react-native-simple-toast";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Asset } from "expo-asset";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Header from "../components/Header";
import AppInput from "../components/AppInput";
import addressesApi from "../api/address";
import UploadScreen from "./UploadScreen";
import utils from "../utils/utils";
import {
  reverseGeolocalisation,
  getDistrictLocation,
} from "./../services/nominatimServices";

class AppImage {
  constructor(module) {
    this.module = module;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const BACKGROUND_IMAGE = new AppImage(require("./../assets/road2.webp"));

class HomeScreen extends React.Component {
  state = {
    addressDetails: {},
    addressName: "",
    addressType: "",
    code: "",
    codeAlreadyExists: false,
    bBoxDistrict: null,
    uploadVisible: false,
    progress: 0,
  };

  async componentDidMount() {
    let { latitude, longitude } = this.props.route.params;
    await reverseGeolocalisation(
      "ibrahimabiram@gmail.com",
      "jsonv2",
      latitude,
      longitude,
      1
    )
      .then((result) => {
        let {
          data: {
            address: addressDetails,
            display_name: addressName,
            type: addressType,
            boundingbox,
          },
        } = result;
        this.setState({
          addressDetails,
          addressName,
          addressType,
          boundingbox,
        });
      })
      .catch((error) => console.error(error));
  }

  generateCode = async () => {
    let { addressName, addressDetails } = this.state;
    let generatedCode;
    if (addressName) {
      const response = await addressesApi.getLocalityExistence(addressName);
      console.log("Response", response);
      if (!response.ok) return alert("Le code n'a pas pu être généré.");
      const {
        data: { isLocation_exists, code },
      } = response;
      generatedCode = isLocation_exists ? code : "";
      this.generateCodeHandler(generatedCode, addressDetails);
    }
  };

  generateCodeHandler = async (generatedCode, addressDetails) => {
    if (generatedCode) {
      Toast.show("Cette localité existe déjà !");
      this.setState({ code: generatedCode, codeAlreadyExists: true });
    } else {
      if (addressDetails) {
        let { country, region, city, road } = utils.formatAddress(
          addressDetails
        );

        // load the bounding box of the road
        let query;
        if (road) query = region + "," + city + "," + road;
        else query = region + "," + city;

        await this.getDistrict(query);

        let { bBoxDistrict, boundingbox } = this.state;
        let suffixCode = utils.getHouseNumber(boundingbox, bBoxDistrict);

        if (country && region && city) {
          let regionCode = utils.formatCode(region);
          let cityCode = utils.formatCode(city);

          let roadCode;
          if (road) roadCode = utils.formatCode(road);

          if (road)
            generatedCode =
              regionCode + "-" + cityCode + "-" + roadCode + "-" + suffixCode;
          else generatedCode = regionCode + "-" + cityCode + "-" + suffixCode;

          this.setState({
            code: generatedCode,
          });
        }
      }
    }
  };

  getDistrict = async (query) => {
    await getDistrictLocation("jsonv2", query, "sn")
      .then(({ data }) => {
        let { boundingbox: bBoxDistrict } = data[0];
        this.setState({ bBoxDistrict });
      })
      .catch((error) => console.error(error));
  };

  saveCode = async (e) => {
    e.preventDefault();
    let {
      addressName: location_name,
      code: generated_code,
      addressDetails,
    } = this.state;
    let { country, region, city, road: suburb } = utils.formatAddress(
      addressDetails
    );
    let { latitude, longitude } = this.props.route.params;
    let address = {
      country,
      region,
      city,
      suburb,
      location_name,
      latitude,
      longitude,
      generated_code,
    };

    this.setState({ progress: 0, uploadVisible: true });
    const response = await addressesApi.addAddress(address, (progress) =>
      this.setState({ progress })
    );
    if (!response.ok) return alert("Votre code n'a pas pu être enregistré.");

    this.setState({ codeAlreadyExists: true });
    alert("Votre code a bien été enregistré !!!");
  };

  goToRecord = () => {
    let {
      addressName: location_name,
      code: generated_code,
      addressDetails,
    } = this.state;
    let { country, region, city, road: suburb } = utils.formatAddress(
      addressDetails
    );
    let { latitude, longitude } = this.props.route.params;
    let address = {
      country,
      region,
      city,
      suburb,
      location_name,
      latitude,
      longitude,
      generated_code,
    };

    this.props.navigation.navigate("RecordAudio", { address });
  };

  render() {
    var {
      addressName,
      code,
      codeAlreadyExists,
      uploadVisible,
      progress,
    } = this.state;
    var isCodeGenerated = code ? true : false;
    const { afterRecord } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Header />
        <UploadScreen
          onDone={() => this.setState({ uploadVisible: false })}
          progress={progress}
          visible={uploadVisible}
        />
        <ImageBackground style={styles.image} source={BACKGROUND_IMAGE.module}>
          <AppInput
            inputStyle={styles.input}
            addressName={addressName}
            code={code}
          />
          <AppButton title="Générer code" onPress={() => this.generateCode()} />

          {isCodeGenerated && !codeAlreadyExists && !afterRecord && (
            <>
              <AppButton
                icon="content-save"
                onPress={(e) => this.saveCode(e)}
                title="Enregistrer code"
              />
              <AppButton
                icon="microphone"
                title="Enregistrer avec vocal"
                onPress={() => this.goToRecord()}
              />
            </>
          )}
        </ImageBackground>
      </View>
    );
  }
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
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default HomeScreen;
