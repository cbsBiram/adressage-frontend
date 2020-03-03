import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Menu = ({
  buttonGroup,
  onPressGenerate,
  onPressCarnet,
  onPressSave,
  code,
  codeAlreadyExists,
  loading
}) => {
  console.log("Loading status:", loading);
  return (
    <>
      <View style={buttonGroup}>
        <Button
          buttonStyle={{
            width: 130,
            marginTop: 10,
            backgroundColor: "#FF8C00"
          }}
          title="Générer Code"
          titleStyle={{ fontSize: 20 }}
          onPress={() => onPressGenerate()}
          loading={loading}
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
              color="#FF8C00"
              style={{ paddingLeft: 16 }}
            />
          }
          title="Carnet d'Adresse"
          titleStyle={{ fontSize: 20, color: "#FF8C00" }}
          onPress={() => onPressCarnet()}
          type="solid"
        />
      </View>
      {code && codeAlreadyExists !== true && (
        <View style={buttonGroup}>
          <Button
            buttonStyle={{
              width: 130,
              marginTop: 20,
              backgroundColor: "#FF8C00"
            }}
            title="Enregistrer Code"
            titleStyle={{ fontSize: 20 }}
            onPress={e => onPressSave(e)}
            type="solid"
          />
        </View>
      )}
    </>
  );
};

export default Menu;
