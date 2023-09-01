import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};

const item = localStorage.getItem("item");
if (item) {
  if (item.split('.')[1]) {
    initialState.isLoggedIn = true;
    initialState.userData = JSON.parse(window.atob(item.split('.')[1]));
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.res = action.payload;
      state.userData = action.payload.userData;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.res = action.payload;
      state.isLoggedIn = false;
      state.userData = null;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.res = action.payload;
      state.userData = action.payload.userData;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.res = action.payload;
      state.isLoggedIn = false;
      state.userData = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.res = null;
      state.userData = null;
    }
  }
});

export const { signupRequest, signupSuccess, signupFailure, loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;