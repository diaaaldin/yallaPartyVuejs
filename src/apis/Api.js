import axios from "axios";

const Api = axios.create({
      baseURL: 'https://localhost:7068/api'
     //baseURL: 'https://asnancp.drfaisal.me/api'
});

export default Api;