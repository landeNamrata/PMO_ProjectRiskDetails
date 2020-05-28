import axios from 'axios';

const instance = axios.create({
    baseURL:'https://pmo-assignment.firebaseio.com/'
})

export default instance;