import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
} from "react-native";

import addressesApi from "../api/address";
import AppActivityIndicator from "../components/common/AppActivityIndicator";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
import AppText from "../components/common/AppText";
import AppButton from "../components/common/AppButton";
import Screen from "../components/common/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/common/Icon";
import useAuth from "../auth/useAuth";

const AdressList = () => {
  const {
    user: { user_id: userId },
  } = useContext(AuthContext);
  const { logOut } = useAuth();

  const { data: myAdresses, error, loading, request: loadMyAdresses } = useApi(
    addressesApi.getMyAddresses
  );

  useEffect(() => {
    loadMyAdresses(userId);
  }, []);

  let { addresses } = myAdresses;

  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={loading} />
      <ImageBackground
        style={styles.image}
        source={require("./../assets/road2.webp")}
      >
        <Screen>
          {error && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <AppText style={{ color: "white" }}>
                Nous n'avons pas pu retrouver vos adresses.
              </AppText>
              <AppButton title="Réessayer" onPress={loadMyAdresses}></AppButton>
            </View>
          )}
          {addresses && addresses.length ? (
            <FlatList
              data={addresses}
              keyExtractor={(address, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.generated_code}
                  subTitle={item.location_name}
                  IconComponent={
                    <Icon
                      name="format-list-bulleted"
                      backgroundColor={colors.primary}
                    />
                  }
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
            />
          ) : (
            <Text
              style={{
                marginTop: 30,
                marginBottom: 30,
                padding: 5,
                color: "white",
                fontSize: 18,
              }}
            >
              Veuillez d'abord enregistrer une adresse à votre nom.
            </Text>
          )}
          <View>
            <ListItem
              title="Log out"
              IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
              onPress={() => logOut()}
            />
          </View>
        </Screen>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdressList;
