import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloading :false,
    data:null,
    error:null,
    listData: []
    

}

const createjobslice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    createJobRequest :function(state)
    {
    state.isloading = true
    },
    createJobSuc :function(state,{payload})
    {
    state.isloading = false;
    state.data = payload;
    },
    createJobFail :function(state,{payload})
    {
    state.isloading = false;
    state.error = payload;
    },


    getJobRequest: function (state) {
      state.isloading = true;
    },
    sucGetJobRequest: function (state, { payload }) {
      state.isloading = false;
    state.listData = payload;
    },
    FailGetJobRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    //Search job------------------------>

    searchgetJobRequest: function (state) {
      state.isloading = true;
    },
    searchsucGetJobRequest: function (state, { payload }) {
      state.isloading = false;
    state.listData = payload;
    },
    searchFailGetJobRequest: function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

    // Search Advanced--------------->

    searchgetJobRequestAdvanced : function (state) {
      state.isloading = true;
    },
    searchsucGetJobRequestAdvanced : function (state, { payload }) {
      state.isloading = false;
    state.listData = payload;
    },
    searchFailGetJobRequestAdvanced : function (state, { payload }) {
      state.isloading = false;
      state.error = payload;
    },

}

});

export const {createJobFail,createJobRequest,createJobSuc,
  FailGetJobRequest,getJobRequest,sucGetJobRequest,searchgetJobRequest,searchsucGetJobRequest,searchFailGetJobRequest,
  searchFailGetJobRequestAdvanced,searchgetJobRequestAdvanced,searchsucGetJobRequestAdvanced,

} = createjobslice.actions

export default createjobslice.reducer;