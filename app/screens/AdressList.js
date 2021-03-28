import React from 'react';
import { StyleSheet, View, ImageBackground, Share,TextInput, Button, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import AppButton from "../components/AppButton";
import addressesApi from "../api/address";

export default class AdressList extends React.Component {
  render() {
    return (
      <View style={{ minHeight: 70, padding: 5 }}>
      <Text>{addressesApi.getData}</Text>
      </View>
    )
  }
}
