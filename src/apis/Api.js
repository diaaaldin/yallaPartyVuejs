import axios from "axios";

const Api = axios.create({
      //baseURL: 'https://localhost:7068/api'
      //baseURL: 'http://147.79.74.139:5000/api'
      baseURL: 'http://cp.yallaparty.net/api'
});

export default Api;