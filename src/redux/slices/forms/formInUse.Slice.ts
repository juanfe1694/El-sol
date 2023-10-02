import { createSlice } from '@reduxjs/toolkit';
import { FilledForm, FilledFormsResponse, FormInUse, FormInterface } from '../../../interfaces/form';
import { ErrorResponseModel } from '../../../interfaces/functionalInterfaces';


type SliceState = {
  form: FilledForm;
  formInUse: FormInUse;
  formInUseByProjectId: FormInterface[];
  isLoading: boolean;
  error: ErrorResponseModel;
}

const initialState: SliceState = {
  form: ({} as FilledForm),
  formInUse: ({} as FormInUse),
  formInUseByProjectId: [] as FormInterface[],
  isLoading: false,
  error: {}
}

export const formInUseSlice = createSlice({
  name: 'formInUse',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    fetchFilledFormById: (state, action) => {
      state.form = action.payload;
      state.isLoading = false;
    },
    fetchFormInUseById: (state, action) => {
      state.formInUse = action.payload;
      //  state.isLoading = false;
    },
    fetchFormInUseByProjectId: (state, action) => {
      state.formInUseByProjectId = action.payload;
      state.isLoading = false;
    },
    resetfetchFormInUseByProjectId: (state) => {
      state.formInUseByProjectId = [];
      //  state.isLoading = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

  },
})

export const {
  startLoading,
  stopLoading,
  fetchFilledFormById,
  fetchFormInUseById,
  fetchFormInUseByProjectId,
  resetfetchFormInUseByProjectId,

  error
  } = formInUseSlice.actions
export const formInUseReducer = formInUseSlice.reducer;
