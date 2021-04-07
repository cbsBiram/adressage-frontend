import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { ListItem } from "react-native-elements";
import addressesApi from "../api/address";
import Header from "../components/Header";
import colors from "../config/colors";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  rectangle: {
    marginTop: 30,
    width: "auto",
    backgroundColor: "orange",
  },
  rectangleContent: {
    flexDirection: "row",
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

const AdressList = () => {
  const AddressListApi = useApi(addressesApi.getData);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    async function getMyData() {
      const response = await AddressListApi.request();
      let addressList = [];
      addressList.push(response);
      console.log(addressList);
      setAddress(addressList);
    }
    getMyData();
  }, []);

  const addressLength =
    address && address.address ? address.address.length : "";
  var lines = 0;
  if (addressLength < 42) {
    lines = 1;
  }
  //console.log("Address", address);

  return (
    <View style={styles.container}>
      <Header />
      <ImageBackground
        style={styles.image}
        source={require("./../assets/road2.webp")}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "white",
              fontSize: 28,
              textDecorationLine: "underline",
            }}
          >
            Carnet d'adresses
          </Text>
          <FlatList
            data={address}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.key}
                onPress={() => console.log("Pressed")}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <>
                  <View style={styles.rectangle}>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="location-enter"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Adresse: {item.address}</Text>
                    </View>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="signature-text"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Code: {item.code}</Text>
                    </View>
                  </View>
                  <View style={styles.rectangle}>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="location-enter"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Adresse: M'Bour, Thiès, 23000, Sénégal </Text>
                    </View>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="signature-text"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Code: THI-MBO-1A</Text>
                    </View>
                  </View>
                  <View style={styles.rectangle}>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="location-enter"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>
                        Adresse: Parcelles assainies, Dakar, 113 Sénégal
                      </Text>
                    </View>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="signature-text"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Code: DAK-PA-R3-42A</Text>
                    </View>
                  </View>
                  <View style={styles.rectangle}>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="location-enter"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Address: Cité douanes, Dakar, 2084, Sénégal</Text>
                    </View>
                    <View style={styles.rectangleContent}>
                      <MaterialCommunityIcons
                        name="signature-text"
                        size={22}
                        style={{ marginRight: 5 }}
                        color="black"
                      />
                      <Text>Code: DAK-DAK-R2-15A</Text>
                    </View>
                  </View>
                </>
              </TouchableHighlight>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdressList;
