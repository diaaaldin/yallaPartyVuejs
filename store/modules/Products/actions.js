import product from "@/apis/Products";
import Checkout from "@/apis/Checkout";


export const GetProduct = ({ commit, dispatch } , id) => {
    return product.GetProduct(id).then(function (response) {
       commit('SET_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetLastProducts = ({ commit, dispatch }) => {
    return product.GetLastProducts().then(function (response) {
       commit('SET_LAST_PRODUCTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetProductsRandomly = ({ commit, dispatch } , data) => {
    return product.GetProductsRandomly(data).then(function (response) {
       commit('SET_PRODUCTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetProducts = ({ commit, dispatch } , data) => {
    return product.GetProducts(data).then(function (response) {
       commit('SET_PRODUCTS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetProductInBasket = ({ commit, dispatch } ) => {
    return product.GetProductInBasket().then(function (response) {
       commit('SET_FAVORIT_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetCustomerBuyProductsOrders = ({ commit, dispatch }) => {
    return product.GetCustomerBuyProductsOrders().then(function (response) {
        commit('SET_CUSTOMER_BUY_PRODUCTS_ORDERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

function checkout(pubKey, sessionId) {
    const stripe = Stripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
}

export const BuyProductOperationWithPayment = async ({ commit, dispatch },data) => {
        try {
            console.log("data : ",data);
            const ProductChickout = await Checkout.CheckoutProduct(data.productData);
            data.data.sessionId = ProductChickout.data.data.result.sessionId;

            console.log("Saving data:", data);
            localStorage.setItem('BuyOperationProductData', JSON.stringify(data));
            const checkoutRes = await checkout(ProductChickout.data.data.result.pubKey, ProductChickout.data.data.result.sessionId);
           // console.log("checkoutRes : ", checkoutRes);
        } catch (error) {
            throw error; // rethrow the error if you want to handle it further up
        }
}

export const successProductPayment = async ({ commit, dispatch },data) => {
    return Checkout.successProduct(data).then(function (response) {
            return response.data.data;
        }).catch(function (error) {
                throw error;
        });
}

export const BuyProductOperationWithPoint = ({ commit, dispatch },data) => {
    return product.BuyProductOperationWithPoint(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


export const ToggleProductInBasket = ({ commit, dispatch } , productId) => {
    return product.ToggleProductInBasket(productId).then(function (response) {
       //commit('SET_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const CreateProduct = ({ commit, dispatch } , data) => {
    return product.CreateProduct(data).then(function (response) {
       commit('SET_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateProduct = ({ commit, dispatch } , data) => {
    return product.UpdateProduct(data).then(function (response) {
       commit('SET_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteProduct = ({ commit, dispatch } , data) => {
    return product.DeleteProduct(data).then(function (response) {
      // commit('SET_PRODUCT_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

