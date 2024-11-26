import Api from "./Api";

const END_POINT = 'Product';

export default {

    GetProduct(id) {
        let config = {
            params: {
                id : id,
            },
        };
        return Api.get(`${END_POINT}/GetProduct`, config);
    },
    
    GetLastProducts() {
        return Api.get(`${END_POINT}/GetLastProducts`);
    },

    GetProductsRandomly(data) {
        const queryString = new URLSearchParams({
            productName : data.productName,
            productSection : data.productSection,
            userEmail : data.userEmail,
            userName : data.userName,
            page: data.page,
            pageSize: data.pageSize
        });
        data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetProductsRandomly`, config);
    },

    GetProducts(data) {
        const queryString = new URLSearchParams({
            productName : data.productName,
            productSection : data.productSection,
            userEmail : data.userEmail,
            userName : data.userName,
            page: data.page,
            pageSize: data.pageSize
        });
        data.exceptionIds.forEach(id => queryString.append('exceptionIds', id));

        let config = {
            params: queryString,
        };
        return Api.get(`${END_POINT}/GetProducts`, config);
    },

    GetProductInBasket() {
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
        
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        return Api.get(`${END_POINT}/GetProductInBasket`, config);
    },
    
    GetCustomerBuyProductsOrders() {
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
        
        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };
        return Api.get(`${END_POINT}/GetCustomerBuyProductsOrders`, config);
    },

    BuyProductOperationWithPoint(data) {
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

        const responce = Api.post(`${END_POINT}/BuyProductOperationWithPoint`, data, config);
        return responce;
    },

    ToggleProductInBasket(productId) {
        let token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                productId : productId,
            },
        };
        return Api.get(`${END_POINT}/ToggleProductInBasket`, config);
    },
    
    CreateProduct(data) {
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
        const responce = Api.post(`${END_POINT}/CreateProduct`, data, config);
        return responce;
    },

    UpdateProduct(data) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
        };

        const responce = Api.put(`${END_POINT}/UpdateProduct`, data, config);
        return responce;
    },

    DeleteProduct(id) {
        let token = localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;

        let config = {
            headers: { 'Authorization': token, "Access-Control-Allow-Origin": "*" },
            params: {
                id: id
            }
        };
        
        const responce = Api.delete(`${END_POINT}/DeleteProduct`, config);
        return responce;
    },

}