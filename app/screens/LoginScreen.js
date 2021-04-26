import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppErrorMessage,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/common/Screen";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email: username, password }) => {
    const result = await authApi.login(username, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result?.data?.token);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("./../assets/road2.webp")}
    >
      <Screen>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppErrorMessage
            error="Email et/ou mot de passe invalide(s)."
            visible={loginFailed}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              secureTextEntry
              placeholder="Mot de passe"
              textContentType="password"
            />
            <SubmitButton title="Connexion" />
          </View>
        </AppForm>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default LoginScreen;
