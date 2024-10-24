import Service from "../../../src/apis/Services";

export const SetPatientName = ({ commit, dispatch },name) => {
    console.log("name : ",name);

       commit('SET_PATIENT_NAME', name);
}

export const SetPatientData = ({ commit, dispatch },data) => {
       commit('SET_PATIENT_DATA', data);
}


export const GetStatistics = ({ commit, dispatch }) => {
     return Service.Statistics().then(function (response) {
        commit('SET_STATISTICS', response.data.data);
         return response.data.data; 
     }).catch(function (error) {
             throw error;
     });
 }

 ////////////
 ///Treatments
 ///
 export const GetTreatments = ({ commit, dispatch },name) => {
    return Service.GetTreatments(name).then(function (response) {
       commit('SET_TREATMENTS_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const CreateTreatment = ({ commit, dispatch },data) => {
    return Service.CreateTreatment(data).then(function (response) {
       commit('SET_TREATMENT_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateTreatment = ({ commit, dispatch },data) => {
    return Service.UpdateTreatment(data).then(function (response) {
       commit('SET_TREATMENT_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteTreatment = ({ commit, dispatch }, id) => {
    return Service.DeleteTreatment(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


 ////////////
 ///Patients
 ////
 export const GetPatients = ({ commit, dispatch },dataSearch) => {        
    return Service.GetPatients(dataSearch.name , dataSearch.patientKey).then(function (response) {
       commit('SET_PATIENTS_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const GetPatient = ({ commit, dispatch },patientId) => {
    return Service.GetPatient(patientId).then(function (response) {
       commit('SET_PATIENT_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const CreatePatient = ({ commit, dispatch },data) => {
    return Service.CreatePatient(data).then(function (response) {
       commit('SET_PATIENT_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const UpdatePatient = ({ commit, dispatch },data) => {
    return Service.UpdatePatient(data).then(function (response) {
       commit('SET_PATIENT_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const DeletePatient = ({ commit, dispatch }, id) => {
    return Service.DeletePatient(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}



 ////////////
 ///PatientOperation
 ////
 export const GetPatientOperations = ({ commit, dispatch },patientId) => {        
    return Service.GetPatientOperations(patientId).then(function (response) {
       commit('SET_PATIENT_OPERATIONS_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const GetPatientOperation = ({ commit, dispatch },operationId) => {
    return Service.GetPatientOperation(operationId).then(function (response) {
       commit('SET_PATIENT_OPERATION_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const GetPatientOperationReportData = ({ commit, dispatch },operationId) => {
    return Service.GetPatientOperationReportData(operationId).then(function (response) {
       commit('SET_CREATE_UPDATE_PATIENT_OPERATION_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const CreatePatientOperation = ({ commit, dispatch },data) => {
    return Service.CreatePatientOperation(data).then(function (response) {
       commit('SET_CREATE_UPDATE_PATIENT_OPERATION_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const UpdatePatientOperation = ({ commit, dispatch },data) => {
    return Service.UpdatePatientOperation(data).then(function (response) {
       commit('SET_CREATE_UPDATE_PATIENT_OPERATION_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}
export const DeletePatientOperation = ({ commit, dispatch }, id) => {
    return Service.DeletePatientOperation(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}


 ////////////
 ///Statement Explane
 ///
 export const GetStatementsExplane = ({ commit, dispatch },name) => {
    return Service.GetStatementsExplane(name).then(function (response) {
       commit('SET_STATEMENTS_EXPLANE_DATA', response.data.data);
        return response.data.data;
    }).catch(function (error) {
            throw error;
    });
}

export const CreateStatementExplane = ({ commit, dispatch },data) => {
    return Service.CreateStatementExplane(data).then(function (response) {
       commit('SET_STATEMENT_EXPLANE_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const UpdateStatementExplane = ({ commit, dispatch },data) => {
    return Service.UpdateStatementExplane(data).then(function (response) {
       commit('SET_STATEMENT_EXPLANE_DATA', response.data.data);
        return response.data.data; 
    }).catch(function (error) {
            throw error;
    });
}

export const DeleteStatementExplane = ({ commit, dispatch }, id) => {
    return Service.DeleteStatementExplane(id).then(function (response) {
        return response.data.data;
    }).catch(function (error) {
        throw error;
    });
}

