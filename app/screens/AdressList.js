import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Share,
  TextInput,
  Button,
  Text,
} from "react-native";
import addressesApi from "../api/address";

const styles = StyleSheet.create({
  image: {
    // backgroundColor: BACKGROUND_COLOR,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  rectangle: {
    marginTop: 2,
    width: 400,
    height: 55,
    backgroundColor: 'orange'
  }
});

const AdressList = () => {
  const AddressListApi = useApi(addressesApi.getData);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    async function getMyData() {
      const response = await AddressListApi.request();
      console.log(response);
      setAddress(response);
    }
    getMyData();
  }, []);

  const addressLength = address ? address.address.length : "";
  var lines = 0;
  if (addressLength < 42) {
    lines = 1;
  }
  // console.log("Address", address);

  return (
    <ImageBackground style={styles.image} source={require("./../assets/road2.webp")}>
      <View style={{ alignItems: 'center'}}>
        <Text style={{marginTop: 50, textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', fontSize: 20, textDecorationLine: 'underline'}}>Carnet d'adresses</Text>
          <View style={{marginTop: 10, width: 400, height: 55, backgroundColor: 'orange'}}>
            <Text>Address: {address ? address.address : ""}</Text>
            <Text style= {{marginTop: lines*18}}>Code: {address ? address.code : ""}</Text>
          </View>
          <View style={styles.rectangle}>
            <Text>Address: M'Bour, Thiès, 23000, Sénégal </Text>
            <Text style= {{marginTop: 1*18}}>Code: THI-MBO-1A </Text>
          </View>
          <View style={styles.rectangle}>
            <Text>Address: Parcelles assainies, Dakar, 113 Sénégal </Text>
            <Text style= {{marginTop: 1*18}}>Code: DAK-PA-R3-42A </Text>
          </View>
          <View style={styles.rectangle}>
            <Text>Address: Cité douanes, Dakar, 2084, Sénégal </Text>
            <Text style= {{marginTop: 1*18}}>Code: DAK-DAK-R2-15A </Text>
          </View>
      </View>
    </ImageBackground>
  );
};

export default AdressList;
