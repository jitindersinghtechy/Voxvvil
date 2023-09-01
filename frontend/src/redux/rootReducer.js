import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth/authSlice';
import branchReducer from './modules/branch/slice';


const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
});

export default rootReducer;