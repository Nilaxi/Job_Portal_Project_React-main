import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloading: false,
    data: 'null',
    error: 'null',
    listData : []
    
}

const updatejobSlice = createSlice({
  name: "updateJob",
  initialState,
  reducers: {
    //Update job
      GetUpdateRequest: function (state) {
        state.isloading = true;
      },
      SucGetUpdateRequest: function (state, { payload }) {
        state.isloading = false;
        state.data = payload;
      },
      FailGetUpdateRequest: function (state, { payload }) {
        state.isloading = false;
        state.error = payload;
      },

      
      PutUpdateRequest: function (state) {
        state.isloading = true;
      },
      SucPutUpdateRequest: function (state, { payload }) {
        state.isloading = false;
        state.data = payload;
      },
      FailPutUpdateRequest: function (state, { payload }) {
        state.isloading = false;
        state.error = payload;
      },

      // delete job -------->

      deleteJobRequest: (state) => {
        state.isloading = true;
      },
      deleteJobSuccess: (state) => {
        state.isloading = false;
         
      },
      deleteJobFailure: (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      },
     
  }
});

export const {FailGetUpdateRequest, FailPutUpdateRequest,PutUpdateRequest, GetUpdateRequest, SucGetUpdateRequest,SucPutUpdateRequest,deleteJobFailure,deleteJobRequest,deleteJobSuccess} = updatejobSlice.actions

export default updatejobSlice.reducer