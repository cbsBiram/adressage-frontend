import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function AppButton({ title, onPress, color = "primary", icon }) {
  return (
    <View>
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
    </View>
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
    padding: 15,
    width: "80%",
    alignContent: "center",
  },

  icon: {
    marginRight: 5,
  },
  text: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default AppButton;
