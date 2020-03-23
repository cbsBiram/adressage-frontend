import React from "react";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Text } from "react-native-elements";
import Toast from "react-native-simple-toast";
import Header from "./../sections/Header";
import Menu from "../sections/Menu";
import Inputs from "../sections/Inputs";
import {
  getIsLocalityExists,
  addAddressInDB
} from "./../services/addressServices";
import {
  reverseGeolocalisation,
  getDistrictLocation
} from "./../services/nominatimServices";
import addressFormat from "../utils/addressFormat";
import formatCode from "./../utils/formatCode";
import getHouseNumber from "./../utils/getHouseNumber";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDetails: {},
      addressName: "",
      addressType: "",
      code: "",
      codeAlreadyExists: false,
      bBoxDistrict: null,
      loading: false
    };
  }

  componentDidMount() {
    let { latitude, longitude } = this.props.route.params;
    reverseGeolocalisation(
      "ibrahimabiram@gmail.com",
      "jsonv2",
      latitude,
      longitude,
      1
    )
      .then(result => {
        let {
          data: {
            address: addressDetails,
            display_name: addressName,
            type: addressType,
            boundingbox
          }
        } = result;
        this.setState({
          addressDetails,
          addressName,
          addressType,
          boundingbox
        });
      })
      .catch(error => console.error(error));
  }

  generateCode = () => {
    this.setState({ loading: true });
    let { addressName, addressDetails } = this.state;
    let generatedCode;

    if (addressName) {
      getIsLocalityExists(addressName)
        .then(({ data: { isLocation_exists, code } }) => {
          generatedCode = isLocation_exists ? code : "";
          this.generateCodeHandler(generatedCode, addressDetails);
          this.setState({ loading: false });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  generateCodeHandler = async (generatedCode, addressDetails) => {
    if (generatedCode) {
      Toast.show("Cette localité existe déjà !");
      this.setState({ code: generatedCode, codeAlreadyExists: true });
    } else {
      if (addressDetails) {
        let { country, region, city, road } = addressFormat(addressDetails);

        // load the bounding box of the road
        let query;
        if (road) query = region + "," + city + "," + road;
        else query = region + "," + city;

        await this.getDistrict(query);

        let { bBoxDistrict, boundingbox } = this.state;
        let suffixCode = getHouseNumber(boundingbox, bBoxDistrict);

        if (country && region && city) {
          let regionCode = formatCode(region);
          let cityCode = formatCode(city);

          let roadCode;
          if (road) roadCode = formatCode(road);

          if (road)
            generatedCode =
              regionCode + "-" + cityCode + "-" + roadCode + "-" + suffixCode;
          else generatedCode = regionCode + "-" + cityCode + "-" + suffixCode;

          this.setState({
            code: generatedCode
          });
        }
      }
    }
  };

  getDistrict = async query => {
    await getDistrictLocation("jsonv2", query, "sn")
      .then(({ data }) => {
        let { boundingbox: bBoxDistrict } = data[0];
        this.setState({ bBoxDistrict });
      })
      .catch(error => console.error(error));
  };

  saveCode = async e => {
    e.preventDefault();
    let {
      addressName: location_name,
      code: generated_code,
      addressDetails
    } = this.state;
    let { country, region, city, road } = addressFormat(addressDetails);
    let { latitude, longitude } = this.props.route.params;
    let address = {
      country,
      region,
      city,
      road,
      location_name,
      latitude,
      longitude,
      generated_code
    };

    await addAddressInDB(address)
      .then(() => {
        this.setState({ codeAlreadyExists: true });
        Alert.alert("Votre code a bien été enregistré !!!");
      })
      .catch(err => console.error(err));
  };

  render() {
    var { addressName, code, codeAlreadyExists, loading } = this.state;
    var isCodeGenerated = code ? true : false;

    return (
      <View style={styles.container}>
        <Header />

        <ImageBackground
          style={styles.image}
          source={require("../../assets/road2.webp")}
        >
          <Inputs
            inputStyle={styles.input}
            addressName={addressName}
            code={code}
          />
          <Menu
            onPressGenerate={this.generateCode}
            buttonGroup={styles.buttonGroup}
            onPressSave={this.saveCode}
            code={isCodeGenerated}
            codeAlreadyExists={codeAlreadyExists}
            loading={loading}
          />
          <Text h5 style={styles.text}>
            Appuyez sur le bouton "Générer Code" pour obtenir votre adresse
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: 5,
    padding: 5,
    height: 60,
    backgroundColor: "#d3d3d3d3",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17
  },
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    marginTop: 15
  },
  text: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 5,
    color: "#ffffff"
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 8
  }
});

export default Home;
