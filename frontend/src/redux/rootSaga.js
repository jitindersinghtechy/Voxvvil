import { all } from 'redux-saga/effects';
import authSaga  from './modules/auth/authSaga';
import branchSaga  from './modules/branch/saga';


export default function* rootSaga() {
  yield all([
    authSaga(),
    branchSaga(),
  ]);
}