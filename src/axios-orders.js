import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-suya.firebaseio.com/'
});

export default instance;