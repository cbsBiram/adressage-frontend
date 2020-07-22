import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppButton({ title, onPress, color = "primary", icon }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          color="black"
          name={icon}
          size={24}
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    marginLeft: 70,
    padding: 15,
    width: "60%",
    alignContent: "center",
  },

  icon: {
    marginRight: 5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default AppButton;
