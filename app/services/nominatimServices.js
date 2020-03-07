import http from './httpServices';

const apiEndpoint1 = 'https://nominatim.openstreetmap.org/reverse';
const apiEndpoint2 = 'https://nominatim.openstreetmap.org/search';

export function reverseGeolocalisation(email, format, lat, lon, addressdetails) {
    return http.get(apiEndpoint1, {
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

export function getDistrictLocation(format, query, country) {
    return http.get(apiEndpoint2, {
        params: {
            format,
            q: query,
            countrycodes: country
        }
    })
}