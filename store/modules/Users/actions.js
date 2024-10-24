import User from "../../../src/apis/Users";

 export const getLogin = ({ commit, dispatch },data) => {
     return User.UserLogin(data).then(function (response) {
         if (response.data.data.id > 0) {
         commit('USER_LOGINNAME', response.data.data.fullName);
         localStorage.setItem("token", JSON.stringify(response.data.data.token));
         response.data.data.token = "";
         localStorage.setItem('userName',  JSON.parse(JSON.stringify(response.data.data.fullName)));
         localStorage.setItem('id',  JSON.parse(JSON.stringify(response.data.data.id)));
         }
         return response.data.data; 
     }).catch(function (error) {
             throw error;
     });
 }

