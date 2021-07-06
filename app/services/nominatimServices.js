import http from './httpServices';

export function reverseGeolocation(lat, lon) {
    console.log("test service: "+ lat + " " +lon);
    return http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1IjoibW9oYW1ldCIsImEiOiJja3A1cTZ4aXEwMDJ3MnBvMm9hMzh3Z21uIn0.jV9M-5yVK7ehFek2RsmlGg');
}
