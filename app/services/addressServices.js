import http from './httpServices';
import { apiConfig } from '../../config'

const apiUrl = apiConfig.baseUrl;

const apiEndpoint1 = `${apiUrl}/isLocation_exists/`;
const apiEndpoint2 = `${apiUrl}/save_code/`;
const apiEndpoint3 = `${apiUrl}/get_address/`;

export function getIsLocalityExists(location) {
    return http.get(apiEndpoint1, {
        params: {
            location
        }
    });
}

export function addAddressInDB(address) {
    return http.post(apiEndpoint2, address);
}

export function getAddress(location) {
    return http.get(apiEndpoint3, {
        params: {
            location
        }
    });
}