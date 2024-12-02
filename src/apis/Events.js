import Api from "./Api";

const END_POINT = 'Events';

export default {

    GetEvent(id) {
        let config = {
            params: {
                id: id,
            },
        };
        return Api.get(`${END_POINT}/GetEvent`, config);
    },

    GetCustomerEventsGuests() {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.get(`${END_POINT}/GetCustomerEventsGuests`, config);
    },

    GetEvents(exceptionIds,statusId, companyEmail, companyName, page, pageSize) {
        let config = {
            params: {
                exceptionIds: exceptionIds,
                statusId: statusId,
                companyEmail: companyEmail,
                companyName: companyName,
                page: page,
                pageSize: pageSize,
            },
        };
        return Api.get(`${END_POINT}/GetEvents`, config);
    },

    GetEventsForShow(data) {
        // const exceptionIds = data.exceptionIds;
        const queryString = new URLSearchParams({
            page: data.page,
            pageSize: data.pageSize
        });
        data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetEventsForShow`, config);
    },

    GetEventGuests(id ,statusId) {
        
        let config = {
            params: {
                id: id,
                statusId: statusId,
            },
        };
        return Api.get(`${END_POINT}/GetEventGuests`, config);
    },

    BuyTicketOperationWithPoint(data) {
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
        const responce = Api.post(`${END_POINT}/BuyTicketOperationWithPoint`, data, config);
        return responce;
    },
    
    CreateEvent(data) {
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
        const responce = Api.post(`${END_POINT}/CreateEvent`, data, config);
        return responce;
    },
    
    UpdateEvent(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/UpdateEvent`, data, config);
        return responce;
    },

    GuestStatusChange(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/GuestStatusChange`, data, config);
        return responce;
    },

    DeleteEvent(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                id: id
            }
        };
        //let config = {
        //    headers: {
        //        'Authorization': token,
        //        'Content-Type': 'application/json', // Set the content type if you're sending JSON data
        //      },
        //};
        const responce = Api.delete(`${END_POINT}/DeleteEvent`, config);
        return responce;
    },

}