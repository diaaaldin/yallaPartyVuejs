import tool from "@/apis/Tools";
import Checkout from "@/apis/Checkout";


export const GetTool = ({ commit, dispatch } , id) => {
    return tool.GetTool(id).then(function (response) {
       commit('SET_TOOL_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetToolsRandomly = ({ commit, dispatch } , data) => {
    return tool.GetToolsRandomly(data).then(function (response) {
       commit('SET_TOOLS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetTools = ({ commit, dispatch } , data) => {
    return tool.GetTools(data).then(function (response) {
       commit('SET_TOOLS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


export const GetCustomerRentToolsOrders = ({ commit, dispatch }) => {
    return tool.GetCustomerRentToolsOrders().then(function (response) {
        commit('SET_CUSTOMER_RENT_TOOLS_ORDERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

function checkout(pubKey, sessionId) {
    const stripe = Stripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
}

export const RentToolOperationWithPayment = async ({ commit, dispatch },data) => {
        try {
            const ToolChickout = await Checkout.CheckoutTool(data.productData);
            data.data.sessionId = ToolChickout.data.data.result.sessionId;
            
            localStorage.setItem('RentOperationToolData', JSON.stringify(data));
            const checkoutRes = await checkout(ToolChickout.data.data.result.pubKey, ToolChickout.data.data.result.sessionId);
        } catch (error) {
            throw error; // rethrow the error if you want to handle it further up
        }
}

export const successToolPayment = async ({ commit, dispatch },data) => {
    return Checkout.successTool(data).then(function (response) {
            return response.data.data;
        }).catch(function (error) {
                throw error;
        });
}

export const RentToolOperationWithPoint = ({ commit, dispatch },data) => {
    return tool.RentToolOperationWithPoint(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

