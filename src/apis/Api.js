import axios from "axios";

const Api = axios.create({
     baseURL: 'https://localhost:7068/api'
     //baseURL: 'http://cp.yallaparty.net/api'
});

export default Api;