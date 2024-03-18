import { call, put, takeEvery } from 'redux-saga/effects';
import {  GetUserData, JobGetData, PutUserData} from 'service/recruiter/recruiterjob';
import { FaiGetDataJobsApplyRequest, FailGetJobApplyRequest, FailGetUserRequest, FailPutUserRequest, GetDataJobsApplyRequest, GetJobApplyRequest, GetUserRequest, PutUserRequest, SucGetDataJobsApplyRequest, SucGetJobApplyRequest, SucGetUserRequest, SucPutUserRequest } from 'slice/recruiter/userSlice';


function* GetUser(action) {
  try {
    let mydata = yield call(GetUserData, action.payload);
    yield put(SucGetUserRequest(mydata));
  } catch (error) {
    yield put(FailGetUserRequest(error));
  }
}

export function* watchGetUser() {
   yield takeEvery(GetUserRequest, GetUser);
}


function* PutUser(action) {
  try {
    let mydata = yield call(PutUserData, action.payload);
    yield put(SucPutUserRequest(mydata));

    } catch (error) {
    yield put(FailPutUserRequest(error));
  }
}

export function* watchPutUser() {
  return yield takeEvery(PutUserRequest, PutUser);
}


// Job Get recruiter Apply or not-------------->

function* GetDataJobsApply(action) {
  try {
    let mydata = yield call(JobGetData, action.payload);
    yield put(SucGetDataJobsApplyRequest(mydata));
  } catch (error) {
    yield put(FaiGetDataJobsApplyRequest(error));
  }
}

export function* watchGetDataJobsApply() {
   yield takeEvery(GetDataJobsApplyRequest, GetDataJobsApply);
}