import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/api/v1/submitATM' : "http://localhost:4000/api/v1/submitATM";

//So you don't have to retype absolute url when using axios
export default axios.create({
    baseURL
});