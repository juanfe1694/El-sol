import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponseModel } from '../../../interfaces/functionalInterfaces';


type SliceState = {
  isLoading: boolean;
  error: ErrorResponseModel;
  isPublished: boolean,
}

const initialState: SliceState = {
  isLoading: false,
  error: {},
  isPublished: false,
}

export const documentSlice = createSlice({
  name: 'filledForm',
  initialState,
  reducers: {
    setIsPublished: (state) => {
      state.isPublished = true;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPublished = false;
    },
    resetError: (state) => {
      state.error = {};
      state.isLoading = false;
      state.isPublished = false;
    },
  },
})

export const { setIsPublished, startLoading, stopLoading, error, resetError } = documentSlice.actions
export const documentReducer = documentSlice.reducer;
