import { call, put, takeEvery } from 'redux-saga/effects';
import { AdvancedSearchEmployee, ApplicationJobData, EndJobUpdate, GetProfileAppliData, PutProfileAppliData, PutRatingJobData, RatingJobData, ViewEmployeeData } from 'service/recruiter/recruiterjob';
import { FailAdvancedSearchEmployeeRequest, FailEndJobDataRequest, FailGetApplicantUserDataRequest, FailGetApplicationsDataRequest, FailGetProfileAppliRequest, FailPutProfileAppliRequest, FailPutRatingJobRequest, FailRatingJobRequest, GetAdvancedSearchEmployeeRequest, GetApplicantUserDataRequest, GetApplicationsDataRequest, GetEndJobDataRequest, GetProfileAppliRequest, GetRatingJobRequest, PutProfileAppliRequest, PutRatingJobRequest, SucAdvancedSearchEmployeeRequest, SucEndJobDataRequest, SucGetApplicantUserDataRequest, SucGetApplicationsDataRequest, SucGetProfileAppliRequest, SucPutProfileAppliRequest, SucPutRatingJobRequest, SucRatingJobRequest } from 'slice/applicant/profileUpdateSlice';


function* GetProfileAppli(action) {
  try {
    let mydata = yield call(GetProfileAppliData, action.payload);
    yield put(SucGetProfileAppliRequest(mydata));
  } catch (error) {
    yield put(FailGetProfileAppliRequest(error));
  }
}

export function* watchGetProfileAppli() {
   yield takeEvery(GetProfileAppliRequest, GetProfileAppli);
}


function* PutProfileAppli(action) {
  try {
    let putdata = yield call(PutProfileAppliData, action.payload);
    yield put(SucPutProfileAppliRequest(putdata));

    } catch (error) {
    yield put(FailPutProfileAppliRequest(error));
  }
}

export function* watchPutProfileAppli() {
  return yield takeEvery(PutProfileAppliRequest, PutProfileAppli);
}

// accepted applicant data of employee------------------------->

function* GetApplicantUser(action) {
  try {
    let AcceptedData = yield call(ViewEmployeeData, action.payload);
    yield put(SucGetApplicantUserDataRequest(AcceptedData));
  } catch (error) {
    yield put(FailGetApplicantUserDataRequest(error));
  }
}

export function* watchGetApplicantUser() {
   yield takeEvery(GetApplicantUserDataRequest, GetApplicantUser);
}

//Advanced Search in Employee-------------------------->

function* GetAdvancedSearchEmployee(action) {
  try {
    let AdSearch = yield call(AdvancedSearchEmployee, action.payload);
    yield put(SucAdvancedSearchEmployeeRequest(AdSearch));
  } catch (error) {
    yield put(FailAdvancedSearchEmployeeRequest(error));
  }
}

export function* watchGetAdvancedSearchEmployee() {
   yield takeEvery(GetAdvancedSearchEmployeeRequest, GetAdvancedSearchEmployee);
}

// End Job Pop up--------------->

function* GetEndJobData(action) {
  try {
    let EndJob = yield call(EndJobUpdate, action.payload);
    yield put(SucEndJobDataRequest(EndJob));
  } catch (error) {
    yield put(FailEndJobDataRequest(error));
  }
}

export function* watchGetEndJobData() {
   yield takeEvery(GetEndJobDataRequest, GetEndJobData);
}


// Put Rating pop up--------------------------->
function* PutRatingJob(action) {
  try {
    let RateData = yield call(PutRatingJobData, action.payload);
    yield put(SucPutRatingJobRequest(RateData));
  } catch (error) {
    yield put(FailPutRatingJobRequest(error));
  }
}

export function* watchPutRatingJob() {
   yield takeEvery(PutRatingJobRequest, PutRatingJob);
}

//applications data get------------------------->

function* GetApplicationsData(action) {
  try {
    let ApplicationdData = yield call(ApplicationJobData, action.payload);
    yield put(SucGetApplicationsDataRequest(ApplicationdData));
  } catch (error) {
    yield put(FailGetApplicationsDataRequest(error));
  }
}

export function* watchGetApplicationsData() {
   yield takeEvery(GetApplicationsDataRequest, GetApplicationsData);
}