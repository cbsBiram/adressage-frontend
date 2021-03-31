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

  // console.log("Address", address);

  return (
    <View style={{ minHeight: 70, padding: 35 }}>
      <Text>Address: {address ? address.address : ""}</Text>
      <Text>Code: {address ? address.code : ""}</Text>
    </View>
  );
};

export default AdressList;
