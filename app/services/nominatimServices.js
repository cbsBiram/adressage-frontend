import http from './httpServices';

const apiEndpoint = 'https://nominatim.openstreetmap.org/reverse'

export function reverseGeolocalisation(email, format, lat, lon, addressdetails) {
    return http.get(apiEndpoint, {
        params: {
            email,
            format,
            lat,
            lon,
            addressdetails
        },
        headers: { "User-Agent": "frontend-adressage" }
    });
}