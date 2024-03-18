import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootsaga from "saga/recruiter/rootsaga";
import profileUpdateSlice from "slice/applicant/profileUpdateSlice";
import createjobslice from "slice/recruiter/createjobSlice";
import updatejobSlice from "slice/recruiter/updatejobSlice";
import userSlice from "slice/recruiter/userSlice";
import viewapplicantSlice from "slice/recruiter/viewapplicantSlice";



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    jobs : createjobslice,
    user : userSlice,
    update : updatejobSlice,
    profileApplicant : profileUpdateSlice,
    viewApplication : viewapplicantSlice,
    

  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootsaga);
export default store;