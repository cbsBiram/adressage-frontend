import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

import colors from "../config/colors";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.headStyle}>
        <View style={styles.header}>
          <Image
            style={styles.logoStyle}
            source={require("./../assets/logo.jpg")}
          />
          <Text style={styles.headText}>MyHali</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  headStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.black,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 50,
    overflow: "hidden",
  },
  headText: {
    color: colors.primary,
    fontSize: 45,
    fontStyle: "italic",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: -35,
    marginRight: 30,
  },

  logoStyle: {
    flex: 1,
    height: 80,
    width: undefined,
  },
});
