import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "./../sections/Header";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address_details: {},
      address_name: "",
      code: "",
      selectedItem: []
    };
  }

  async componentDidMount() {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?email=ibrahimabiram@gmail.com&format=json&lat=14.7223758&lon=-17.4640854&addressdetails=1`,
        { headers: { "User-Agent": "frontend-adressage" } }
      )
      .then(result => {
        let {
          data: { address: address_details, display_name: address_name }
        } = result;
        this.setState({ address_details, address_name });
      })
      .catch(error => console.error(error));
  }

  onChangeText = text => {
    this.setState({ code: text });
  };

  getCarnet = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Header />

        <ImageBackground
          style={styles.image}
          source={require("../../assets/background13.jpg")}
        >
          <Input
            containerStyle={{ width: undefined, height: undefined }}
            inputStyle={styles.inputs}
            readOnly
            value={this.state.address_name}
            label="Localité"
            labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 20 }}
          />
          <Input
            containerStyle={{ width: undefined, height: undefined }}
            inputStyle={styles.inputs}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.code}
            label="CODE"
            labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 20 }}
          />
          <View style={styles.buttonGroup}>
            <Button
              buttonStyle={{
                width: 130,
                marginTop: 10,
                backgroundColor: "#35605a"
              }}
              title="Générer Code"
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.setState({ code })}
              type="solid"
            />
            <Button
              buttonStyle={{
                width: 140,
                marginTop: 10,
                backgroundColor: "#ffffff"
              }}
              icon={
                <Icon
                  name="address-book"
                  size={30}
                  color="#35605a"
                  style={{ paddingLeft: 16 }}
                />
              }
              title="Carnet d'adresse"
              titleStyle={{ fontSize: 20, color: "#35605a" }}
              onPress={() => getCarnet()}
              type="solid"
            />
          </View>
          <Text h4 style={styles.text}>
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
  inputs: {
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
    justifyContent: "space-around"
  },
  text: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
