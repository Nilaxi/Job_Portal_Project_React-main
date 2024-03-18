

import { call, put, takeEvery } from "redux-saga/effects";
import {  ViewApplications, advanceviewjobpoup } from "service/recruiter/recruiterjob";
import { FailViewGetJobRequest, SucViewGetJobRequest, ViewGetJobRequest, advancesearchviewfailgetJobrequest, advancesearchviewgetJobrequest, advancesearchviewsucgetJobrequest } from "slice/recruiter/viewapplicantSlice";

// Veiw Applications getData---------------->

function* viewgetjob(action) {
    try {
      let mydata = yield call(ViewApplications, action.payload);
      yield put(SucViewGetJobRequest(mydata));
     
    } catch (error) {
      yield put(FailViewGetJobRequest(error));
    }
  }
  
  export function* watchviewgetjob() {
    return yield takeEvery(ViewGetJobRequest, viewgetjob);
  }

       
//  Advanced Search view applicantion--------------->

function* advancesearchviewgetJobs (action)

{
  try{
    let mydat = yield call(advanceviewjobpoup, action.payload)
  yield put(advancesearchviewsucgetJobrequest(mydat))
}
catch(error){
     yield put(advancesearchviewfailgetJobrequest(error))
 }
}
export function* advancedwatchgetviwjobs ()
{
  return yield takeEvery(advancesearchviewgetJobrequest, advancesearchviewgetJobs )
}
  