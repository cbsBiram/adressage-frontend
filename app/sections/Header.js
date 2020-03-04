import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.headStyle}>
        <Image
          style={styles.logoStyle}
          source={require("../../assets/logo.jpeg")}
        />
        <Text style={styles.headText}>MyHali</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: "left",
    textAlignVertical: "center",
    color: "#FF8C00",
    marginLeft: 10,
    fontSize: 45,
    fontStyle: "italic",
    flex: 4
  },
  headStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#000000"
  },
  logoStyle: {
    flex: 1.5,
    width: undefined,
    height: undefined
  }
});
