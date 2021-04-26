import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
    <Stack.Screen name="Identification" component={LoginScreen} />
    <Stack.Screen name="Inscription" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
