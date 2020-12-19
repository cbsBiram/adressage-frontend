import http from './httpServices';
import getEnvVars from './../../environment';

// const { apiUrl } = getEnvVars();

// const apiEndpoint1 = `${apiUrl}/isLocation_exists/`;
// const apiEndpoint2 = `${apiUrl}/save_code/`;

const apiEndpoint1 = 'https://adressage-backend.herokuapp.com/api/isLocation_exists/';
const apiEndpoint2 = 'https://adressage-backend.herokuapp.com/api/save_code/';

export function getIsLocalityExists(location) {
    // console.log(apiEndpoint1)
    return http.get(apiEndpoint1, {
        params: {
            location
        }
    });
}

export function addAddressInDB(address) {
    return http.post(apiEndpoint2, address);
}