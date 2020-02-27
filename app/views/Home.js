import React from "react";
import axios from "axios";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { Text } from "react-native-elements";
import Header from "./../sections/Header";
import Menu from "../sections/Menu";
import Inputs from "../sections/Inputs";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDetails: {},
      addressName: "",
      addressType: "",
      code: ""
    };
  }

  componentDidMount() {
    let { latitude, longitude } = this.props;
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?email=ibrahimabiram@gmail.com&format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        { headers: { "User-Agent": "frontend-adressage" } }
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

  isLocationCoded = addressName => {};

  generateCode = () => {
    if (this.state.addressDetails) {
      let { addressType } = this.state;
      console.log("Adresse:", addressType);

      let building = this.state.addressDetails[addressType];
      console.log("Building", building);

      let {
        country,
        state: region,
        county,
        city,
        town,
        country_code,
        suburb,
        road
      } = this.state.addressDetails;

      if (!region) region = county;

      if (!city) city = town;

      if (!suburb) suburb = road;

      if (country && region && city) {
        country_code = country_code.toUpperCase();
        let regionCode = region.toUpperCase().substring(0, 3);
        let cityCode = city.toUpperCase().substring(0, 2);
        let suburbCode = suburb.toUpperCase().substring(0, 2);

        let suffixCode;
        let buildingCode;

        if (building) {
          buildingCode = building.toUpperCase().substring(0, 2);
          suffixCode =
            buildingCode +
            "_" +
            Math.random()
              .toString(36)
              .substr(2, 2)
              .toUpperCase();
        } else {
          suffixCode = Math.random()
            .toString(36)
            .substr(2, 3)
            .toUpperCase();
        }

        let generatedCode =
          country_code +
          "-" +
          regionCode +
          "-" +
          cityCode +
          "-" +
          suburbCode +
          "-" +
          suffixCode;

        this.setState({
          code: generatedCode
        });
      }
    }
  };

  getCarnet = () => {
    Alert.alert("En cours de développement.");
  };

  saveCode = () => {
    Alert.alert("En cours de développement.");
  };

  render() {
    var { latitude, longitude } = this.props;
    console.log("Lat :", latitude, " Long : ", longitude);

    var { addressName, code } = this.state;
    var isCodeGenerated = code ? true : false;

    return (
      <View style={styles.container}>
        <Header />

        <ImageBackground
          style={styles.image}
          source={require("../../assets/background13.jpg")}
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
    marginLeft: 5
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 8
  }
});

export default Home;
