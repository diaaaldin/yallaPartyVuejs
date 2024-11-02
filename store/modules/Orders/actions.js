import Order from "../../../src/apis/Orders";


export const GetOrder = ({ commit, dispatch },id) => {
    return Order.GetOrder(id).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


export const GetOrders = ({ commit, dispatch },data) => {
    return Order.GetOrders(data.exceptionIds, data.orderType, data.orderName, data.orderStatus, data.stateId, data.cityId,
        data.userId,data.email ,data.page, data.pageSize).then(function (response) {
       commit('SET_ORDERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


//////////////////////////
//////////////////////////
export const CreateOrder = ({ commit, dispatch },data) => {
    return Order.CreateOrder(data).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const JobApplicationOrder = ({ commit, dispatch },data) => {
    return Order.JobApplicationOrder(data).then(function (response) {
       commit('SET_JOP_APPLICATION_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateOrder = ({ commit, dispatch },data) => {
    return Order.UpdateOrder(data).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const OrderStatusChange = ({ commit, dispatch },data) => {
    return Order.OrderStatusChange(data).then(function (response) {
       commit('SET_ORDER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteOrder = ({ commit, dispatch }, id) => {
    return Order.DeleteOrder(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}