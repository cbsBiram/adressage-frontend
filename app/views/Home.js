import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { SearchBar, Button, Input, Text } from "react-native-elements";
import Header from "./../sections/Header";

const Home = () => {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("CODE...");

  const onChangeText = text => {
    setCode(text);
  };

  const updateSearch = search => {
    setSearch(search);
  };

  const getCarnet = () => {};

  return (
    <View style={styles.container}>
      <Header />

      <ImageBackground
        style={styles.image}
        source={require("../../assets/background13.jpg")}
      >
        <SearchBar
          containerStyle={styles.search}
          placeholder="Type Here your location..."
          onChangeText={text => updateSearch(text)}
          value={search}
          inputStyle={{ height: 80 }}
        />
        <Input
          containerStyle={{ width: undefined, height: undefined }}
          inputStyle={styles.inputs}
          onChangeText={text => onChangeText(text)}
          value={code}
          label="CODE"
          labelStyle={{ color: "#000000", marginTop: 15, fontSize: 20 }}
        />
        <View style={styles.buttonGroup}>
          <Button
            buttonStyle={{
              width: 120,
              marginTop: 10,
              backgroundColor: "#35605a"
            }}
            title="Générer Code"
            titleStyle={{ fontSize: 20 }}
            onPress={() => setCode("code généré")}
            type="solid"
          />
          <Button
            buttonStyle={{
              width: 120,
              marginTop: 10,
              backgroundColor: "#ffffff"
            }}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  search: {
    paddingTop: 15,
    backgroundColor: "transparent"
  },
  inputs: {
    marginTop: 5,
    height: 70,
    backgroundColor: "#d3d3d3d3",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 30
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
