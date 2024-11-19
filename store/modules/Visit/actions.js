import Visit from "@/apis/Visit";

export const RecordVisit = ({ commit, dispatch }, data) => {
    return Visit.RecordVisit(data).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}
