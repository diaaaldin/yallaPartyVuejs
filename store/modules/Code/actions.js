import Code from "@/apis/Code";
import axios from 'axios';

export const GetStates = async ({ commit }) => {
    try {
        const response = await axios.get("https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*", {
            withCredentials: false,
        });
        // Remove headers from response data (first element) and get the actual states data
        const statesData = response.data.slice(1); // Skip the first element (headers)
        // Commit the states data to the Vuex store
        commit('SET_STATES_DATA', statesData);
        // Return the processed states data
        return statesData;
    } catch (error) {
        console.error("Error fetching states:", error);
        throw error;
    }
};

export const GetQuestionsData = ({ commit, dispatch }) => {
    return Code.GetQuestionsData().then(function (response) {
       commit('SET_QUESTIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


export const GetCodeItems = ({ commit, dispatch },parent1 ,parent2) => {
    return Code.GetCodeItems(parent1 ,parent2).then(function (response) {
       commit('SET_CODES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

//////////////////////////
//////////////////////////

export const GetOrderTypes = ({ commit, dispatch }) => {
    return Code.GetCodeItems(1 ,0).then(function (response) {
       commit('SET_ORDER_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetToolsSections = ({ commit, dispatch }) => {
    return Code.GetCodeItems(2 ,0).then(function (response) {
       commit('SET_TOOLS_SECTIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetCompanyTypes = ({ commit, dispatch }) => {
    return Code.GetCodeItems(3 ,0).then(function (response) {
       commit('SET_COMPANY_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetComunicationMethods = ({ commit, dispatch }) => {
    return Code.GetCodeItems(4 ,0).then(function (response) {
       commit('SET_COMUNICATION_METHODS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetOrderStatus = ({ commit, dispatch }) => {
    return Code.GetCodeItems(5 ,0).then(function (response) {
       commit('SET_ORDER_STATUS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetOrderServices = ({ commit, dispatch }) => {
    return Code.GetCodeItems(6 ,0).then(function (response) {
       commit('SET_ORDER_SERVICES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetOrderTypeQuestions = ({ commit, dispatch },parent2) => {
    return Code.GetCodeItems(11 ,parent2).then(function (response) {
       commit('SET_ORDER_TYPES_QUESTIONS_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetQuestionAnswers = ({ commit, dispatch },parent2) => {
    return Code.GetCodeItems(8 ,parent2).then(function (response) {
       commit('SET_QUESTION_ANSWER_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetTicketTypes = ({ commit, dispatch }) => {
    return Code.GetCodeItems(9 ,0).then(function (response) {
       commit('SET_TICKET_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}
export const GetUserTypes = ({ commit, dispatch }) => {
    return Code.GetCodeItems(10 ,0).then(function (response) {
       commit('SET_USER_TYPES_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetChildrenServices = ({ commit, dispatch }) => {
    return Code.GetCodeItems(12 ,0).then(function (response) {
       commit('SET_CHILDREN_SERVICES_DATA', response.data.data);
       //console.log("response.data.data : ", response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const GetPointsProfitData = ({ commit, dispatch }) => {
    return Code.GetCodeItems(13 ,0).then(function (response) {
       commit('SET_POINT_PROFIT_DATA', response.data.data);
      // console.log("response.data.data : ", response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}


//////////////////////////
//////////////////////////
export const CreateCode = ({ commit, dispatch },data) => {
    return Code.CreateCode(data).then(function (response) {
       commit('SET_CODE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateCode = ({ commit, dispatch },data) => {
    return Code.UpdateCode(data).then(function (response) {
       commit('SET_CODE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteCode = ({ commit, dispatch }, id) => {
    return Code.DeleteCode(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


