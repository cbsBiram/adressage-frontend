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
import { reverseGeolocalisation } from "./../services/nominatimServices";
import addressFormat from "../utils/addressFormat";
import formatCode from "./../utils/formatCode";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDetails: {},
      addressName: "",
      addressType: "",
      code: "",
      codeAlreadyExists: false
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
            type: addressType
          }
        } = result;
        this.setState({ addressDetails, addressName, addressType });
      })
      .catch(error => console.error(error));
  }

  generateCode = () => {
    this.setState({ loading: true });
    let { addressName, addressDetails } = this.state;
    let generatedCode;

    if (addressName) {
      getIsLocalityExists(addressName)
        .then(({ data: { isLocation_exists, address } }) => {
          generatedCode = isLocation_exists ? address[0][0] : "";
          this.generateCodeHandler(generatedCode, addressDetails);
          this.setState({ loading: false });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  generateCodeHandler = (generatedCode, addressDetails) => {
    if (generatedCode) {
      Toast.show("Cette localité existe déjà");
      this.setState({ code: generatedCode, codeAlreadyExists: true });
    } else {
      if (addressDetails) {
        let { addressType } = this.state;
        let { country, region, city, suburb, building } = addressFormat(
          addressDetails,
          addressType
        );

        if (country && region && city) {
          let regionCode = formatCode(region);
          let cityCode = formatCode(city);
          let suburbCode = formatCode(suburb);

          let suffixCode;

          suffixCode = Math.random()
            .toString(36)
            .substr(2, 4)
            .toUpperCase();

          generatedCode =
            regionCode + "-" + cityCode + "-" + suburbCode + "-" + suffixCode;

          this.setState({
            code: generatedCode
          });
        }
      }
    }
  };

  saveCode = async e => {
    e.preventDefault();
    let {
      addressName: location_name,
      code: generated_code,
      addressDetails,
      addressType
    } = this.state;
    let {
      country,
      region,
      city,
      suburb,
      building: house_number
    } = addressFormat(addressDetails, addressType);

    let { latitude, longitude } = this.props.route.params;

    let address = {
      country,
      region,
      city,
      suburb,
      house_number,
      location_name,
      latitude,
      longitude,
      generated_code
    };
    await addAddressInDB(address);
    this.props.navigation.navigate("Details", { location_name });
  };

  getCarnet = () => {
    Alert.alert("En cours de développement.");
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
            onPressCarnet={this.getCarnet}
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
    height: 70,
    backgroundColor: "#d3d3d3d3",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20
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
