import Api from "./Api";

const END_POINT = 'User';



export default {

    
    UserLogin(data) {
        return Api.post(`${END_POINT}/UserLogin`, data );
    },

    // UserCreate(data) {
    //     let token = localStorage.getItem("token")
    //         ? JSON.parse(localStorage.getItem("token"))
    //         : null;

    //     let config = {
    //         headers: { 'Authorization': token },
    //     };
    //     return Api.post(`${END_POINT}/UserCreate`, data, config);
    // },

    // UserUpdate(data) {
    //     let token = localStorage.getItem("token")
    //         ? JSON.parse(localStorage.getItem("token"))
    //         : null;

    //     let config = {
    //         headers: { 'Authorization': token },
    //     };
    //     return Api.put(`${END_POINT}/UserUpdate`, data, config);
    // },

    // GetUsers(userType, fullName, page, pageSize) {
    //     let token = localStorage.getItem("token")
    //         ? JSON.parse(localStorage.getItem("token"))
    //         : null;

    //     let config = {
    //         headers: { 'Authorization': token },
    //         params: {
    //             userType: userType,
    //             userName: fullName,
    //             page: page,
    //             pageSize: pageSize
    //         },
    //     };
    //     return Api.get(`${END_POINT}/GetUsers`, config);
    // },




}