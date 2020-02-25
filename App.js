import React from "react";
import Home from "./app/views/Home";

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      ready: false,
      where: {lat:null, lng:null},
      error: null
    }
  }

  componentDidMount(){
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 10000,
      maximumAge: 5000
    };
    this.setState({ready:false});
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
  }

  geoSuccess = (position) => {
    this.setState({
      ready:true,
      where: {lat:position.coords.latitude, lng:position.coords.longitude},
    })
  }

  geoFailure = (err) => {
    this.setState({error: err.message})
  }

  render() {
    return (
      <Home />
    );
  }
}
