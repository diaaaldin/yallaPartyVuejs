import User from "@/apis/Users";

export const GetLogin = ({ commit, dispatch }, data) => {
    return User.Login(data).then(function (response) {

        if (response.data.data.id > 0) {
            commit('USER_LOGIN_DATA', response.data.data);
       
            if (response.data.data.typeName == "Customer") {
                localStorage.setItem('customerName', JSON.parse(JSON.stringify(response.data.data.name)));
                localStorage.setItem('customerNickName', JSON.parse(JSON.stringify(response.data.data.nickName)));

                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                response.data.data.token = "";
                localStorage.setItem('id', JSON.parse(JSON.stringify(response.data.data.id)));
                localStorage.setItem('email', JSON.parse(JSON.stringify(response.data.data.email)));
                localStorage.setItem('parentId', JSON.parse(JSON.stringify(response.data.data.parentId)));
                localStorage.setItem('userTypeId', JSON.parse(JSON.stringify(response.data.data.userTypeId)));
                localStorage.setItem('typeName', JSON.parse(JSON.stringify(response.data.data.typeName)));
            } else {
                
                localStorage.setItem('name', JSON.parse(JSON.stringify(response.data.data.name)));
                localStorage.setItem('nickName', JSON.parse(JSON.stringify(response.data.data.nickName)));

                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                response.data.data.token = "";
                localStorage.setItem('id', JSON.parse(JSON.stringify(response.data.data.id)));
                localStorage.setItem('email', JSON.parse(JSON.stringify(response.data.data.email)));
                localStorage.setItem('parentId', JSON.parse(JSON.stringify(response.data.data.parentId)));
                localStorage.setItem('userTypeId', JSON.parse(JSON.stringify(response.data.data.userTypeId)));
                localStorage.setItem('typeName', JSON.parse(JSON.stringify(response.data.data.typeName)));
            
            }
        }

        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}



export const GetAdminUsers = ({ commit, dispatch }, data) => {
    return User.GetAdminUsers(data.name, data.page, data.pageSize).then(function (response) {
        commit('SET_ADMIN_USERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetPartners = ({ commit, dispatch }, data) => {
    return User.GetPartners(data.name, data.stateId, data.cityId, data.page, data.pageSize).then(function (response) {
        commit('SET_PARTNERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetCustomers = ({ commit, dispatch }, data) => {
    return User.GetCustomers(data.name, data.stateId, data.cityId, data.page, data.pageSize).then(function (response) {
        commit('SET_CUSTOMERS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetCompanies = ({ commit, dispatch }, data) => {
    return User.GetCompanies(data.name, data.stateId, data.cityId, data.page, data.pageSize).then(function (response) {
        commit('SET_COMPANIES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetStores = ({ commit, dispatch }, data) => {
    return User.GetStores(data.name, data.stateId, data.cityId, data.page, data.pageSize).then(function (response) {
        commit('SET_STORES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

/////////////
/////////////

export const CustomerProfileInfo = ({ commit, dispatch }, userId) => {
    return User.CustomerProfileInfo(userId).then(function (response) {
        commit('SET_PROFILE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

export const GetUserInfo = ({ commit, dispatch }, userId) => {
    return User.GetUserInfo(userId).then(function (response) {
        commit('SET_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetCompanyInfo = ({ commit, dispatch }, userId) => {
    return User.GetCompanyInfo(userId).then(function (response) {
        commit('SET_COMPANY_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const GetStoreInfo = ({ commit, dispatch }, userId) => {
    return User.GetStoreInfo(userId).then(function (response) {
        commit('SET_COMPANY_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}



/////////////
/////////////

export const CustomerSignUp = ({ commit, dispatch }, data) => {
    return User.CustomerSignUp(data).then(function (response) {
        commit('SET_CUSTOMER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const StoreSignUp = ({ commit, dispatch }, data) => {
    return User.StoreSignUp(data).then(function (response) {
        commit('SET_COMPANY_STORE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const CompanySignUp = ({ commit, dispatch }, data) => {
    return User.CompanySignUp(data).then(function (response) {
        commit('SET_COMPANY_STORE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const PartnerSignUp = ({ commit, dispatch }, data) => {
    return User.PartnerSignUp(data).then(function (response) {
        commit('SET_PARTNER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

/////////////
/////////////

export const AdminUpdate = ({ commit, dispatch }, data) => {
    return User.AdminUpdate(data).then(function (response) {
        commit('SET_ADMIN_USER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const CustomerUpdate = ({ commit, dispatch }, data) => {
    return User.CustomerUpdate(data).then(function (response) {
        commit('SET_PROFILE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const CustomerImageUpdate = ({ commit, dispatch }, data) => {
    return User.CustomerImageUpdate(data).then(function (response) {
        commit('SET_CUSTOMER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

/////////////
/////////////

export const GetNewPassword = ({ commit, dispatch }, data) => {
    return User.GetNewPassword(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
export const ChangePassword = ({ commit, dispatch }, data) => {
    return User.ChangePassword(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}