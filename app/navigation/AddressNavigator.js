import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyAddressesScreen from "../screens/MyAddressesScreen";

const Stack = createStackNavigator();

const AddressNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Carnet d'adresse" component={MyAddressesScreen} />
  </Stack.Navigator>
);

export default AddressNavigator;
