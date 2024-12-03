import axios from "axios";

const Api = axios.create({
    // baseURL: 'https://localhost:44395/api'
     baseURL: 'https://cp.yallaparty.net/api'
});

export default Api;