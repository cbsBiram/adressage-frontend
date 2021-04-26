import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import AppButton from "../components/common/AppButton";
import Header from "../components/common/Header";
import colors from "../config/colors";
import routes from "../navigation/routes";

export default function WelcomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./../assets/road2.webp")}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <AppButton
              onPress={() => navigation.navigate(routes.LOGIN)}
              title="Se connecter"
            />
            <AppButton
              title="S'inscrire"
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
