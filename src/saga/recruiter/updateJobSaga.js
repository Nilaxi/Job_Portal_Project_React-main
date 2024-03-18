import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteJobData, getJobUpdateData, putJobUpdateData } from 'service/recruiter/recruiterjob';
import { getJobRequest } from 'slice/recruiter/createjobSlice';
import { FailGetUpdateRequest, FailPutUpdateRequest, GetUpdateRequest, PutUpdateRequest, SucGetUpdateRequest, SucPutUpdateRequest, deleteJobFailure, deleteJobRequest, deleteJobSuccess } from 'slice/recruiter/updatejobSlice';


//update job

function* getUpdate(action) {
  try {
    let mydata = yield call(getJobUpdateData, action.payload);
    yield put(SucGetUpdateRequest(mydata));
  } catch (error) {
    yield put(FailGetUpdateRequest(error));
  }
}

export function* watchgetUpdate() {
  return yield takeEvery(GetUpdateRequest, getUpdate);
}


function* putUpdate(action) {
  try {
    let mydata1 = yield call(putJobUpdateData, action.payload);
    yield put(SucPutUpdateRequest(mydata1));
   

    yield put(getJobRequest());
  } catch (error) {
    yield put(FailPutUpdateRequest(error));
  }
}

export function* watchputUpdate() {
 return yield takeEvery(PutUpdateRequest, putUpdate);
}


// delete job -----> 

function* deleteJob(action) {
  try {
 
  let mydata2 =  yield call(deleteJobData, action.payload);  


    yield put(deleteJobSuccess(mydata2));

    toast.success("Job Deleted Successfully.");

    yield put(getJobRequest());
  } catch (error) {  
    yield put(deleteJobFailure(error));
  }
}
export function* watchDeleteJob() {
 return yield takeEvery(deleteJobRequest, deleteJob);
}