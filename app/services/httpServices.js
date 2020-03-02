import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { MY_IP_ADDRESS } from "react-native-dotenv";

axios.defaults.baseURL = `${MY_IP_ADDRESS}`;

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log('Error', error);
        Toast.show('Unexpected error happened');
    }
    return Promise.reject(error);
});



export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};