import React from "react";
import { ActivityIndicator } from "react-native";
import Home from "./app/views/Home";

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
    if (lat && lng) return <Home latitude={lat} longitude={lng} />;
    return (
      <ActivityIndicator size="large" color="#35605a" style={{ flex: 2 }} />
    );
  }
}
