import Api from "./Api";

const END_POINT = 'Tool';

export default {

    GetTool(id) {
        let config = {
            params: {
                id : id,
            },
        };
        return Api.get(`${END_POINT}/GetTool`, config);
    },
    

    GetToolsRandomly(data) {
        const queryString = new URLSearchParams({
            toolName : data.toolName,
            toolSection : data.toolSection,
            userEmail : data.userEmail,
            userName : data.userName,
            stateId : data.stateId,
            page: data.page,
            pageSize: data.pageSize
        });
        data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetToolsRandomly`, config);
    },

    GetTools(data) {
        const queryString = new URLSearchParams({
            toolName : data.toolName,
            toolSection : data.toolSection,
            userEmail : data.userEmail,
            userName : data.userName,
            stateId : data.stateId,
            page: data.page,
            pageSize: data.pageSize
        });
        data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetTools`, config);
    },

 
    
    GetCustomerRentToolsOrders() {
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
        
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.get(`${END_POINT}/GetCustomerRentToolsOrders`, config);
    },

    RentToolOperationWithPoint(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        // let config = {
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //       },
        // };

        const responce = Api.post(`${END_POINT}/RentToolOperationWithPoint`, data, config);
        return responce;
    },
}