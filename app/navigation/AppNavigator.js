import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppActivityIndicator from "../components/AppActivityIndicator";
import HomeScreen from "../screens/HomeScreen";
import RecordAudioScreen from "../screens/RecordAudioScreen";
import AdressList from "../screens/AdressList";

const Stack = createStackNavigator();

const AppNavigator = () => {
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ latitude: lat, longitude: lng }}
          />
          <Stack.Screen name="AdressList" component={AdressList} />
          <Stack.Screen name="RecordAudio" component={RecordAudioScreen} />
      </Stack.Navigator>
    );
  return <AppActivityIndicator visible={true} />;
};

export default AppNavigator;
