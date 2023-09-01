import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loading: false,
    getRes : null,
    postRes : null,
    deleteRes : null,
    putRes : null,
    currentBranch : null
};

const slice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        currentBranch: (state,action) => {
            state.currentBranch = action.payload;
        },
        getRequest: (state) => {
            state.loading = true;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.getRes = action.payload;
        },
        getFailure: (state, action) => {
            state.loading = false;
            state.getRes = action.payload;
        },
        resetGet: (state) => {
            state.getRes = true;
        },
        postRequest: (state) => {
            state.loading = true;
        },
        postSuccess: (state, action) => {
            state.loading = false;
            state.postRes = action.payload;
        },
        resetPost: (state) => {
            state.postRes = null;
        },
        postFailure: (state, action) => {
            state.loading = false;
            state.postRes = action.payload;
        },
        deleteRequest: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state, action) => {
            state.loading = false;
            state.deleteRes = action.payload;
        },
        deleteFailure: (state, action) => {
            state.loading = false;
            state.deleteRes = action.payload;
        },
        resetDelete: (state) => {
            state.deleteRes = null;
        },
        putRequest: (state) => {
            state.loading = true;
        },
        putSuccess: (state, action) => {
            state.loading = false;
            state.putRes = action.payload;
        },
        putFailure: (state, action) => {
            state.loading = false;
            state.putRes = action.payload;
        },
        resetPut: (state) => {
            state.putRes = null;
        }
    }
});

export const { currentBranch,getRequest, getSuccess, getFailure,resetGet, postRequest, postSuccess, postFailure,resetPost, deleteRequest, deleteSuccess, deleteFailure,resetDelete, putRequest, putSuccess, putFailure,resetPut } = slice.actions;

export default slice.reducer;