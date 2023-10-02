import { createSlice } from '@reduxjs/toolkit';
import { ErrorResponse } from '../../../../interfaces/functionalInterfaces';
import { BreadCrumbInterface } from '../../../../interfaces/planner/workflow/breadCrumbInterface';



type InitialState = {
  breadCrumb: BreadCrumbInterface[],
  isLoading: boolean,
  error: ErrorResponse
}

const initialState: InitialState = {
  breadCrumb: [
    {
      id: "",
      label: "",
      url: "",
      type: "",
    }
  ],
  isLoading: false,
  error: {},
}

export const breadCrumbSlice = createSlice({
  name: 'breadCrumb',
  initialState: initialState,
  reducers: {

    setBreadCrumb: (state, action) => {
      state.breadCrumb = action.payload;
      state.isLoading = false;
      state.error = {};
    },

    setIsLoading: (state) => {
      state.isLoading = true;
    },

    setStopLoadingBreadCrumb: (state) => {
      state.isLoading = false;
    },

    setError: (state, action) => {
      state.error = action.payload;
        state.isLoading = false;
    },

    resetError: (state) => {
      state.error = {};
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  setBreadCrumb,
  setIsLoading,
  setError,
  resetError,
  setStopLoadingBreadCrumb,
  } = breadCrumbSlice.actions;

  export const breadCrumbReducer = breadCrumbSlice.reducer;