import Api from "./Api";

const END_POINT = 'Code';

export default {

    GetCodeItems(parent1 , parent2) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin" : "*" },
            params: {
                parent1: parent1,
                parent2: parent2,
            },
        };

        return Api.get(`${END_POINT}/GetCodeItems`, config);
    },

    GetQuestionsData() {
        return Api.get(`${END_POINT}/GetQuestionsData` );
    },

    CreateCode(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreateCode`, data , config);
           return responce;
    },
    UpdateCode(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdateCode`, data , config);
           return responce;
    },
    DeleteCode(id){
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
            params : {
                id : id
            }
        };

        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};

        const responce = Api.delete(`${END_POINT}/DeleteCode`, config);
        return responce;
    },

}