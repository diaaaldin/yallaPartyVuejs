import Api from "./Api";

const END_POINT = 'Checkout';

export default {

    successTicket(data) {
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };
        return Api.post(`${END_POINT}/successTicket`, data , config);
    },
    async CheckoutTicket(data) {
        try {
            // Send the POST request to the API endpoint
            const response = await Api.post(`${END_POINT}/CheckoutTicket`, data);
           
            // Return the API response data
            return response;
        } catch (error) {
            // Handle any errors from the API call
            console.error("Error in CheckoutTicket:", error);
            
            // Handle specific error response, if needed
            if (error.response) {
                console.log("Response error:", error.response.data);
                return error.response.data;
            }
            throw error;
        }
    },
    

    successProduct(data) {
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };
        return Api.post(`${END_POINT}/successProduct`, data , config);
    },
    async CheckoutProduct(data) {
        try {
            let token =  localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
    
            let config = {
                headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
            };
            const response = await Api.post(`${END_POINT}/CheckoutProduct`, data , config);
            return response;

        } catch (error) {
            // Handle any errors from the API call
            // console.error("Error in CheckoutTicket:", error);
            // Handle specific error response, if needed
            if (error.response) {
               // console.log("Response error:", error.response.data);
                return error.response.data;
            }
            throw error;
        }
    },

    
    successTool(data) {
        let token =  localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

        let config = {
            headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
        };
        return Api.post(`${END_POINT}/successTool`, data , config);
    },
    async CheckoutTool(data) {
        try {
            let token =  localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null;
    
            let config = {
                headers: {'Authorization': token, "Access-Control-Allow-Origin" : "*" },
            };
            const response = await Api.post(`${END_POINT}/CheckoutTool`, data , config);
            return response;

        } catch (error) {
            // Handle any errors from the API call
            // console.error("Error in CheckoutTicket:", error);
            // Handle specific error response, if needed
            if (error.response) {
               // console.log("Response error:", error.response.data);
                return error.response.data;
            }
            throw error;
        }
    }
    
}