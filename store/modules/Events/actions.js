import Event from "@/apis/Events";

export const GetEvent = ({ commit, dispatch },id) => {
    return Event.GetEvent(id).then(function (response) {
       commit('SET_EVENT_DATA', response.data.data);
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