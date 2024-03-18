import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloading: false,
    data: 'null',
    error: 'null',

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   GetUserRequest: function (state) {
        state.isloading = true;
      },
      SucGetUserRequest: function (state, { payload }) {
        state.isloading = false;
        state.data = payload;
      },
      FailGetUserRequest: function (state, { payload }) {
        state.isloading = false;
        state.error = payload;
      },

      

    PutUserRequest: function (state) {
      state.isloading = true;
    },
    SucPutUserRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FailPutUserRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    // Job Get recruiter Apply or not-------------->

    GetDataJobsApplyRequest: function (state) {
      state.isloading = true;
    },
    SucGetDataJobsApplyRequest: function (state, { payload }) {
      state.isloading = false;
      state.data = payload;
    },
    FaiGetDataJobsApplyRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },
  }
});


export const {FailGetUserRequest,FailPutUserRequest, GetUserRequest, PutUserRequest, SucGetUserRequest,SucPutUserRequest,
  GetDataJobsApplyRequest,FaiGetDataJobsApplyRequest,SucGetDataJobsApplyRequest
} = userSlice.actions

export default userSlice.reducer