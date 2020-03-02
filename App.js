import "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./app/views/Home";
import Details from "./app/views/Details";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null
    };
  }

  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 5000
    };
    this.setState({ ready: false });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }

  geoSuccess = position => {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  };

  geoFailure = err => {
    this.setState({ error: err.message });
  };

  render() {
    let { lat, lng } = this.state.where;
    if (lat && lng)
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{ latitude: lat, longitude: lng }}
              screenProps={{ latitude: lat, longitude: lng }}
            />
            <Stack.Screen name="Details" component={Details} />
            {/* <Home latitude={lat} longitude={lng} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      );
    return (
      <ActivityIndicator size="large" color="#35605a" style={{ flex: 2 }} />
    );
  }
}
