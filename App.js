import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
// import logger from "./app/utility/logger";
import navigationTheme from "./app/navigation/navigationTheme";
import settings from "./app/config/settings";

// logger.start();

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
