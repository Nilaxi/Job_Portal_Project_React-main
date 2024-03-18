import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isloading :false,
    data:null,
    error:null,
    listData: []
    

}

const viewapplicantSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        
    //View Applications getdata---------------->

    ViewGetJobRequest: function (state) {
        state.isloading = true;
      },
      SucViewGetJobRequest: function (state, { payload }) {
        state.isloading = false;
      state.listData = payload;
      },
      FailViewGetJobRequest: function (state, { payload }) {
        state.isloading = false;
        state.error = payload;
      },

       
//  Advanced Search view applicantion--------------->

advancesearchviewgetJobrequest : function(state, {payload}){
  state.isloading = true;
},
advancesearchviewsucgetJobrequest : function(state, {payload}){
  state.isloading = false;
  state.listData = payload;
},
advancesearchviewfailgetJobrequest : function(state, {payload}){
  state.isloading = false;
  state.error = payload;
}

  }
  
  });
  
  export const {FailViewGetJobRequest,SucViewGetJobRequest,ViewGetJobRequest,advancesearchviewfailgetJobrequest,advancesearchviewgetJobrequest,advancesearchviewsucgetJobrequest
  
  } = viewapplicantSlice.actions
  
  export default viewapplicantSlice.reducer;