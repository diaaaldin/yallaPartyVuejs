import Api from "./Api";

const END_POINT = 'User';



export default {

    GetUserInfo(userId) {
        let config = {
            params: {
                userId: userId,
            },
        };
        return Api.get(`${END_POINT}/GetUserInfo`, config );
    },

    GetCompanyInfo(userId) {
        let config = {
            params: {
                userId: userId,
            },
        };
        return Api.get(`${END_POINT}/GetCompanyInfo`, config );
    },

    /////////////////
    GetAdminUsers(name, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                name: name,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetAdminUsers`, config);
    },

    GetPartners(name,stateId,cityId, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                name: name,
                stateId : stateId, 
                cityId : cityId,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetPartners`, config);
    },

    GetCustomers(name,stateId,cityId, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                name: name,
                stateId : stateId, 
                cityId : cityId,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetCustomers`, config);
    },

    GetCompanies(name,stateId,cityId, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                name: name,
                stateId : stateId, 
                cityId : cityId,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetCompanies`, config);
    },

    GetStores(name,stateId,cityId, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                name: name,
                stateId : stateId, 
                cityId : cityId,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetStores`, config);
    },

    GetCompanyEmps(companyId , companyName , name , page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                companyId:companyId,
                companyName : companyName,
                name: name,
                page:page,
                pageSize:pageSize,

            },
        };
        return Api.get(`${END_POINT}/GetCompanyEmps`, config);
    },

    GetPartnerEmps(partnerId , partnerName , name, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
            params: {
                partnerId: partnerId,
                partnerName: partnerName,
                name: name,
                page: page,
                pageSize: pageSize
            },
        };
        return Api.get(`${END_POINT}/GetPartnerEmps`, config);
    },


    Login(data) {
        return Api.post(`${END_POINT}/CustomerLogin`, data );
    },


    CustomerSignUp(data) {
        return Api.post(`${END_POINT}/CustomerSignUp`, data);
    },
    StoreSignUp(data) {
        return Api.post(`${END_POINT}/StoreSignUp`, data);
    },
    CompanySignUp(data) {
        return Api.post(`${END_POINT}/CompanySignUp`, data);
    },
    PartnerSignUp(data) {
        return Api.post(`${END_POINT}/PartnerSignUp`, data);
    },


    AdminCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.post(`${END_POINT}/AdminCreate`, data, config);
    },
    CompanyEmpCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.post(`${END_POINT}/CompanyEmpCreate`, data, config);
    },
    PartnerEmpCreate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.post(`${END_POINT}/PartnerEmpCreate`, data, config);
    },

    AdminProfileInfo(userId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userId:userId,
            },
        };
        return Api.get(`${END_POINT}/AdminProfileInfo`, config);
    },

    CustomerProfileInfo(userEmail) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userEmail:userEmail,
            },
        };
        return Api.get(`${END_POINT}/CustomerProfileInfo`, config);
    },
    CompanyProfileInfo(userId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userId:userId,
            },
        };
        return Api.get(`${END_POINT}/CompanyProfileInfo`, config);
    },
    StoreProfileInfo(userId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userId:userId,
            },
        };
        return Api.get(`${END_POINT}/StoreProfileInfo`, config);
    },
    PartnerProfileInfo(userId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userId:userId,
            },
        };
        return Api.get(`${END_POINT}/PartnerProfileInfo`, config);
    },
    CompanyEmpProfileInfo(userId) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        let config = {
            headers: { 'Authorization': token },
            params: {
                userId:userId,
            },
        };
        return Api.get(`${END_POINT}/CompanyEmpProfileInfo`, config);
    },

    GetNewPassword(data) {
        return Api.put(`${END_POINT}/GetNewPassword`, data);
    },
   
    ChangePassword(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/ChangePassword`, data, config);
    },

    AdminUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/AdminUpdate`, data, config);
    },

    CustomerUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/CustomerUpdate`, data, config);
    },

    CompanyStoreUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/CompanyStoreUpdate`, data, config);
    },

    PartnerUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/PartnerUpdate`, data, config);
    },

    CompanyEmpUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/CompanyEmpUpdate`, data, config);
    },
    
    EmployeeUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/EmployeeUpdate`, data, config);
    },

    AdminImageUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/AdminImageUpdate`, data, config);
    },
    CustomerImageUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/CustomerImageUpdate`, data, config);
    },
    CompanyStoreImageUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/CompanyStoreImageUpdate`, data, config);
    },
    PartnerImageUpdate(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/PartnerImageUpdate`, data, config);
    },
    

    ChangeStatusPartner(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token },
        };
        return Api.put(`${END_POINT}/ChangeStatusPartner`, data, config);
    },

    DeleteAdmin(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteAdmin`, config);
        return responce;
    },

    DeleteCustomer(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteCustomer`, config);
        return responce;
    },

    DeleteCompany(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteCompany`, config);
        return responce;
    },

    DeleteCompanyEmp(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteCompanyEmp`, config);
        return responce;
    },

    DeleteStore(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteStore`, config);
        return responce;
    },

    DeletePartner(id){
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
        const responce = Api.delete(`${END_POINT}/DeletePartner`, config);
        return responce;
    },
    
    DeleteEmployee(id){
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
        const responce = Api.delete(`${END_POINT}/DeleteEmployee`, config);
        return responce;
    },
}