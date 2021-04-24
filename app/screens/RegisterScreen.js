import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppErrorMessage,
} from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/common/Screen";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import AppActivityIndicator from "../components/common/AppActivityIndicator";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("Prénom"),
  lastName: Yup.string().required().label("Nom"),
  username: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Mot de passe"),
});

function RegisterScreen() {
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ username, firstName, lastName, password }) => {
    const result = await registerApi.request(
      username,
      firstName,
      lastName,
      password
    );

    // console.log(result);
    if (!result.ok) {
      console.log(result.data);
      if (result.data) setError(result.data.username);
      else {
        setError("Une erreur est survenue.");
      }
      return;
    }

    setError(false);
    const response = await loginApi.request(username, password);

    auth.logIn(response?.data?.token);
  };

  return (
    <>
      <AppActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <ImageBackground
        style={styles.image}
        source={require("./../assets/road2.webp")}
      >
        <Screen>
          <AppForm
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={error} />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AppFormField
                autoCorrect={false}
                icon="account-circle"
                name="firstName"
                placeholder="Prénom"
              />
              <AppFormField
                autoCorrect={false}
                icon="account-circle"
                name="lastName"
                placeholder="Nom"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="username"
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
              <SubmitButton title="Inscription" />
            </View>
          </AppForm>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

export default RegisterScreen;
