import { takeLatest, call, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, logoutSuccess, signupSuccess, signupFailure } from './authSlice';
import requestHandler from '../../../utils/requestHandler';

let decodeToken = (token)=>{
  return JSON.parse(window.atob(token.split('.')[1]));
}

function* signup(action) {
  try {
    const requestDetail = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" }
    };
    const response = yield call(requestHandler, `${process.env.REACT_APP_SERVER_API}auth/signup`, requestDetail);
    if(response?.token){
      localStorage.setItem("item", response?.token);
      response.userData = decodeToken(response?.token)
    }
    yield put(signupSuccess(response));
  } catch (error) {
    yield put(signupFailure(error?.response?.message || error));
  }
}

function* login(action) {
  try {
    const requestDetail = {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" }
    };
    const response = yield call(requestHandler, `${process.env.REACT_APP_SERVER_API}auth/login`, requestDetail);
    if(response?.token){
      localStorage.setItem("item", response?.token);
      response.userData = decodeToken(response?.token)
    }
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error?.response?.message || error));
  }
}

function* logout() {
  localStorage.removeItem('item');
  yield put(logoutSuccess());
}

function* authSaga() {
  yield takeLatest('auth/signupRequest', signup);
  yield takeLatest('auth/loginRequest', login);
  yield takeLatest('auth/logoutRequest', logout);
}

export default authSaga;
