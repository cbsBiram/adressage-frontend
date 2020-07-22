import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppActivityIndicator from "./app/components/AppActivityIndicator";
import HomeScreen from "./app/screens/HomeScreen";
import RecordAudioScreen from "./app/screens/RecordAudioScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null,
    };
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 5000,
    };
    this.setState({ ready: false });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  geoSuccess = ({ coords }) => {
    this.setState({
      ready: true,
      where: { lat: coords.latitude, lng: coords.longitude },
    });
  };

  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

  render() {
    let { lat, lng } = this.state.where;
    if (lat && lng)
      return (
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ latitude: lat, longitude: lng }}
            />
            <Stack.Screen name="RecordAudio" component={RecordAudioScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    return <AppActivityIndicator visible={true} />;
  }
}
