import Api from "./Api";

const END_POINT = 'Service';

export default {
    Statistics() {
        let config = {
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
        };
        return Api.get(`${END_POINT}/Statistics` , config);
    },

    /////////////
    ///Treatments
    ///
 
    GetTreatments(name) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin" : "*" },
            params: {
                name: name,
            },
        };
        return Api.get(`${END_POINT}/GetTreatments`, config);
    },
    CreateTreatment(data){
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
           const responce = Api.post(`${END_POINT}/CreateTreatment`, data , config);
           return responce;
    },
    UpdateTreatment(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdateTreatment`, data , config);
           return responce;
    },
    DeleteTreatment(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteTreatment`, config);
        return responce;
    },

    /////////////
    ///Patients
    ///
 
    GetPatients(name , patientKey) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        
        let config = {
            headers: { 'Authorization': token ,
                 "Access-Control-Allow-Origin" : "*" },
            params: {
                name: name,
                patientKey : patientKey,
            },
        };
        return Api.get(`${END_POINT}/GetPatients`, config);
    },
    
    GetPatient(patientId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token , "Access-Control-Allow-Origin" : "*"},
            params: {
                patientId: patientId,
            },
        };
        return Api.get(`${END_POINT}/GetPatient`, config);
    },
    CreatePatient(data){
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
           const responce = Api.post(`${END_POINT}/CreatePatient`, data , config);
           return responce;
    },
    UpdatePatient(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdatePatient`, data , config);
           return responce;
    },
    DeletePatient(id){
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
        const responce = Api.delete(`${END_POINT}/DeletePatient`, config);
        return responce;
    },

    /////////////
    ///PatientOperatien
    ///
 
    GetPatientOperations(patientId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin" : "*"},
            params: {
                patientId: patientId,
            },
        };
        return Api.get(`${END_POINT}/GetPatientOperations`, config);
    },
    GetPatientOperation(operationId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token , "Access-Control-Allow-Origin" : "*" },
            params: {
                operationId: operationId,
            },
        };
        return Api.get(`${END_POINT}/GetPatientOperation`, config);
    },
    GetPatientOperationReportData(operationId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token , "Access-Control-Allow-Origin" : "*"},
            params: {
                operationId: operationId,
            },
        };
        return Api.get(`${END_POINT}/GetPatientOperationReportData`, config);
    },
    CreatePatientOperation(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreatePatientOperation`, data , config);
           return responce;
    },
    UpdatePatientOperation(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdatePatientOperation`, data , config);
           return responce;
    },
    DeletePatientOperation(operationId){
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
            params : {
                operationId : operationId
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeletePatientOperation`, config);
        return responce;
    },


    
    /////////////
    ///Statement Explane
    ///
 
    GetStatementsExplane(name) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token , "Access-Control-Allow-Origin" : "*" },
            params: {
                name: name,
            },
        };
        return Api.get(`${END_POINT}/GetStatementsExplane`, config);
    },
    CreateStatementExplane(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };
        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };
           const responce = Api.post(`${END_POINT}/CreateStatementExplane`, data , config);
           return responce;
    },
    UpdateStatementExplane(data){
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token , "Access-Control-Allow-Origin" : "*" },
        };

           const responce = Api.put(`${END_POINT}/UpdateStatementExplane`, data , config);
           return responce;
    },
    DeleteStatementExplane(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteStatementExplane`, config);
        return responce;
    },

}