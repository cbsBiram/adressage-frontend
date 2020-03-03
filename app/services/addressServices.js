import http from './httpServices';

const apiEndpoint1 = '/frontend/isLocation_exists/';
const apiEndpoint2 = '/frontend/save_code/';
const apiEndpoint3 = '/frontend/get_address/';

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