import Api from "./Api";

const END_POINT = 'Order';

export default {

    GetOrder(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                id: id,
            },
        };

        return Api.get(`${END_POINT}/GetOrder`, config);
    },

    GetOrders(exceptionIds, orderType, orderName, orderStatus, stateId, cityId, userId,email, page, pageSize) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
        

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                exceptionIds: exceptionIds,
                orderType: orderType,
                orderName: orderName,
                orderStatus: orderStatus,
                stateId: stateId,
                cityId: cityId,
                userId: userId,
                email:email,
                page: page,
                pageSize: pageSize

            },
        };

        return Api.get(`${END_POINT}/GetOrders`, config);
    },

    CreateOrder(data) {
        const responce = Api.post(`${END_POINT}/CreateOrder`, data);
        return responce;
    },

    JobApplicationOrder(data) {
        const responce = Api.post(`${END_POINT}/JobApplicationOrder`, data);
        return responce;
    },

    UpdateOrder(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/UpdateOrder`, data, config);
        return responce;
    },

    OrderStatusChange(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/OrderStatusChange`, data, config);
        return responce;
    },

    DeleteOrder(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                id: id
            }
        };

        const responce = Api.delete(`${END_POINT}/DeleteOrder`, config);
        return responce;
    },

}