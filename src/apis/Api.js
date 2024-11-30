import axios from "axios";

const Api = axios.create({
     baseURL: 'https://localhost:44395/api'
     //baseURL: 'http://cp.yallaparty.net/api'
});

export default Api;