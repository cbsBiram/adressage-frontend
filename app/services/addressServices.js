import http from './httpServices';
import { API_ADDRESS } from 'react-native-dotenv';

const apiEndpoint1 = `${API_ADDRESS}/isLocation_exists/`;
const apiEndpoint2 = `${API_ADDRESS}/save_code/`;
const apiEndpoint3 = `${API_ADDRESS}/get_address/`;

export function getIsLocalityExists(location) {
    console.log(apiEndpoint1)
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