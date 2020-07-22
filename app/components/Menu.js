import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

const Menu = ({
  buttonGroup,
  onPressGenerate,
  onPressSave,
  code,
  codeAlreadyExists,
  loading,
}) => {
  return (
    <>
      <View style={buttonGroup}>
        <Button
          buttonStyle={styles.button}
          title="Générer Code"
          titleStyle={{ fontSize: 20 }}
          onPress={() => onPressGenerate()}
          loading={loading}
          type="solid"
        />
      </View>
      {code && codeAlreadyExists !== true && (
        <View style={buttonGroup}>
          <Button
            buttonStyle={styles.button}
            icon={<Ionicons name="ios-save" size={24} color="black" />}
            title="Enregistrer Code"
            titleStyle={{ fontSize: 20 }}
            onPress={(e) => onPressSave(e)}
            type="solid"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    marginTop: 15,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 20,
  },
});

export default Menu;
