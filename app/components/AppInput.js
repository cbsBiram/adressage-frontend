import React from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

const Inputs = ({ inputStyle, addressName, code }) => {
  return (
    <>
      <View style={styles.input}>
        <MaterialIcons name="place" size={24} style={styles.icons} />
        <TextInput
          readOnly
          selection={{ start: 0 }}
          value={addressName}
          label="Localité"
          style={defaultStyles.text}
        />
      </View>

      <Input
        containerStyle={styles.container}
        inputStyle={inputStyle}
        value={code}
        label="Code"
        labelStyle={styles.label}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: undefined,
    height: undefined,
  },
  input: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  label: {
    color: "#ffffff",
    marginTop: 15,
    fontSize: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default Inputs;
