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
          source={require("../../assets/logo-figma.png")}
        />
        <Text style={styles.headText}>--- A définir --</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    textAlign: "left",
    textAlignVertical: "center",
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 35,
    flex: 4
  },
  headStyle: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: "#35605a",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#000000"
  },
  logoStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
