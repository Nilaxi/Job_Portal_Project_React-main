import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloading: false,
    data: 'null',
    error: 'null',
    listData: []
    

}

const profileUpdateSlice = createSlice({
    name: "profileApplicant",
    initialState,
    reducers: {
    GetProfileAppliRequest: function (state) {
        state.isloading = true;
      },
      SucGetProfileAppliRequest: function (state, { payload }) {
        state.isloading = false;
        state.data = payload;
      },
      FailGetProfileAppliRequest: function (state, { payload }) {
        state.isloading = false;
        state.error = payload;
      },

      

    PutProfileAppliRequest: function (state) {
      state.isloading = true;
    },
    SucPutProfileAppliRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FailPutProfileAppliRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    // accepted applicant data of employee------------------------->
    
    GetApplicantUserDataRequest: function (state) {
      state.isloading = true;
    },
    SucGetApplicantUserDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.listData = payload;
    },
    FailGetApplicantUserDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    //Advanced Search in Employee-------------------------->

    GetAdvancedSearchEmployeeRequest: function (state) {
      state.isloading = true;
    },
    SucAdvancedSearchEmployeeRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FailAdvancedSearchEmployeeRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    // End Job data Get------------------->

    GetEndJobDataRequest: function (state) {
      state.isloading = true;
    },
    SucEndJobDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FailEndJobDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },
    
     // Rating data put------------------->

     PutRatingJobRequest: function (state) {
      state.isloading = true;
    },
    SucPutRatingJobRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FailPutRatingJobRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

     // applicantion data Get------------------------->
    
     GetApplicationsDataRequest: function (state) {
      state.isloading = true;
    },
    SucGetApplicationsDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.listData = payload;
    },
    FailGetApplicationsDataRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

}
});

export const {FailGetProfileAppliRequest,FailPutProfileAppliRequest,GetProfileAppliRequest,PutProfileAppliRequest,SucGetProfileAppliRequest,SucPutProfileAppliRequest,
FailGetApplicantUserDataRequest,GetApplicantUserDataRequest,SucGetApplicantUserDataRequest,
FailAdvancedSearchEmployeeRequest,SucAdvancedSearchEmployeeRequest,GetAdvancedSearchEmployeeRequest,
FailEndJobDataRequest,GetEndJobDataRequest,SucEndJobDataRequest,
FailRatingJobRequest,GetRatingJobRequest,SucRatingJobRequest,
FailPutRatingJobRequest,PutRatingJobRequest,SucPutRatingJobRequest,
FailGetApplicationsDataRequest,GetApplicationsDataRequest,SucGetApplicationsDataRequest
} = profileUpdateSlice.actions


export default profileUpdateSlice.reducer