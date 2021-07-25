import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppActivityIndicator from "../components/common/AppActivityIndicator";
import HomeScreen from "../screens/HomeScreen";
import MyAddressesScreen from "../screens/MyAddressesScreen";
import RecordAudioScreen from "../screens/RecordAudioScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const [ready, setReady] = useState(false);
  const [where, setWhere] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 5000,
    };
    setReady(false);
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  const geoSuccess = ({ coords }) => {
    setReady(true);
    setWhere({ lat: coords.latitude, lng: coords.longitude });
  };

  const geoFailure = (err) => {
    setError(err.message);
  };

  let { lat, lng } = where;

  if (lat && lng)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={HomeScreen}
          initialParams={{ latitude: lat, longitude: lng }}
        />
        <Stack.Screen name="Enregistrer audio" component={RecordAudioScreen} />
        <Stack.Screen name="Carnet d'adresse" component={MyAddressesScreen} />
      </Stack.Navigator>
    );

  return <AppActivityIndicator visible={true} />;
};

export default HomeNavigator;