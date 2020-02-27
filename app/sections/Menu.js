import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = ({ buttonGroup, onPressGenerate, onPressCarnet }) => {
  return (
    <View style={buttonGroup}>
      <Button
        buttonStyle={{
          width: 130,
          marginTop: 10,
          backgroundColor: "#35605a"
        }}
        title="Générer Code"
        titleStyle={{ fontSize: 20 }}
        onPress={() => onPressGenerate()}
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
        title="Carnet d'Adresse"
        titleStyle={{ fontSize: 20, color: "#35605a" }}
        onPress={() => onPressCarnet()}
        type="solid"
      />
    </View>
  );
};

export default Menu;
