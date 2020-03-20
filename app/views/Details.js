import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Text } from "react-native-elements";
import { material } from "react-native-typography";
import Toast from "react-native-simple-toast";
import Header from "./../sections/Header";
import { getAddress } from "./../services/addressServices";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      city: "",
      suburb: "",
      generated_code: ""
    };
  }
  componentDidMount() {
    let { location_name } = this.props.route.params;

    getAddress(location_name)
      .then(({ data }) => {
        let { country, region, city, suburb, generated_code } = data;
        this.setState({ country, region, city, suburb, generated_code });
      })
      .then(() => alert("Code enregistré!"))
      .catch(error => console.error(error));
  }

  render() {
    let { country, region, city, suburb, generated_code } = this.state;
    if (!country)
      return (
        <ImageBackground
          style={styles.image}
          source={require("../../assets/road2.webp")}
        >
          <ActivityIndicator size="large" color="#35605a" style={{ flex: 2 }} />
        </ImageBackground>
      );
    return (
      <View style={styles.container}>
        <Header />
        <ImageBackground
          style={styles.image}
          source={require("../../assets/road2.webp")}
        >
          <View style={{ paddingLeft: 10, paddingTop: 20 }}>
            <Text style={material.titleWhite}>
              Vos informations ont bien été enregistrées.
            </Text>
            <View style={{ paddingTop: 30 }}>
              <Text style={material.titleWhite}>Pays: {country}</Text>
              <Text style={material.titleWhite}>Région: {region}</Text>
              <Text style={material.titleWhite}>Ville: {city}</Text>
              <Text style={material.titleWhite}>Commune: {suburb}</Text>
              <Text style={material.titleWhite}>Code: {generated_code}</Text>
            </View>
          </View>
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
  image: {
    width: undefined,
    height: undefined,
    flex: 8
  }
});
