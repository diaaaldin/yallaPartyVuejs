import Event from "@/apis/Events";
import Checkout from "@/apis/Checkout";

export const GetEvent = ({ commit, dispatch },id) => {
    return Event.GetEvent(id).then(function (response) {
       commit('SET_EVENT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetCustomerEventsGuests = ({ commit, dispatch }) => {
    return Event.GetCustomerEventsGuests().then(function (response) {
       commit('SET_EVENTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetEventsForShow = ({ commit, dispatch },data) => {
    return Event.GetEventsForShow(data.exceptionIds, data.page, data.pageSize)
    .then(function (response) {
       commit('SET_EVENTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetEventGuests = ({ commit, dispatch },data) => {
    return Event.GetEventGuests(data.id , data.statusId)
    .then(function (response) {
       commit('SET_EVENT_GUESTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

// export const CheckoutTicket = async ({ commit, dispatch },data) => {
//         return await Checkout.CheckoutTicket(data).then(function (response) {
//             return response;
//         }).catch(function (error) {
//                 throw error;
//         });
// }

function checkout(pubKey, sessionId) {
    const stripe = Stripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
}

export const BuyTicketOperation = async ({ commit, dispatch },data) => {
    console.log("buy data :" ,data);
    if(data.paymentMethod == 2){
        try {
            const tecketChickout = await Checkout.CheckoutTicket(data.productData);
            data.ticketData.sessionId = tecketChickout.data.data.result.sessionId;

            console.log("Saving data:", data);
            localStorage.setItem('BuyOperationTicketData', JSON.stringify(data));
            const checkoutRes = await checkout(tecketChickout.data.data.result.pubKey, tecketChickout.data.data.result.sessionId);
           // console.log("checkoutRes : ", checkoutRes);
        } catch (error) {
            console.error("Error during ticket checkout:", error);
            throw error; // rethrow the error if you want to handle it further up
        }
    }else{
        return Event.BuyTicketOperationWithPoint(data.ticketData).then(function (response) {
            return response.data.data;
        }).catch(function (error) {
                throw error;
        });
    }
}

export const successTicketPayment = async ({ commit, dispatch },data) => {
        
    return Checkout.successTicket(data).then(function (response) {
            return response.data.data;
        }).catch(function (error) {
                throw error;
        });
}



export const GuestStatusChange = ({ commit, dispatch },data) => {
    return Event.GuestStatusChange(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

//////////////////////////
//////////////////////////

export const CreateEvent = ({ commit, dispatch },data) => {
    return Event.CreateEvent(data).then(function (response) {
       commit('SET_EVENT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateEvent = ({ commit, dispatch },data) => {
    return Event.UpdateEvent(data).then(function (response) {
       commit('SET_EVENT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteEvent = ({ commit, dispatch }, id) => {
    return Event.DeleteEvent(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}