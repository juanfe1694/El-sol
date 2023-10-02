import { createSlice } from '@reduxjs/toolkit';
import { FilledForm, FilledFormsResponse, FormInUse, FormInterface } from '../../../interfaces/form';
import { ErrorResponseModel } from '../../../interfaces/functionalInterfaces';


type SliceState = {
  form: FilledForm;
  formInUse: FormInUse;
  forms: FilledFormsResponse;
  createForm: FilledForm;
  updateForm: FilledForm;
  deleteForm: FilledForm;
  replicateForm: FilledForm;
  viewForm: FilledForm;
  isLoading: boolean;
  error: ErrorResponseModel;
}

const initialState: SliceState = {
  form: ({} as FilledForm),
  formInUse: ({} as FormInUse),
  forms: {} as FilledFormsResponse,
  createForm: ({} as FilledForm),
  updateForm: ({} as FilledForm),
  deleteForm: ({} as FilledForm),
  replicateForm: ({} as FilledForm),
  viewForm: ({} as FilledForm),
  isLoading: false,
  error: {}
}

export const filledFormSlice = createSlice({
  name: 'filledForm',
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
    fetchFilledForms: (state, action) => {
      state.forms = action.payload;
      state.isLoading = false;
    },
    savedForm: (state, action) => {
      state.form = action.payload;
      state.isLoading = false;
    },
    viewForm: (state, action) => {
      state.viewForm = action.payload;
      state.isLoading = false;
    },
    resetState: (state) => {
      state.updateForm = ({} as FilledForm);
      state.createForm = ({} as FilledForm);
      state.viewForm = ({} as FilledForm);
      state.error = {};
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
  fetchFilledForms,
  fetchFormInUseById,
  savedForm,
  viewForm,
  resetState,
  error
  } = filledFormSlice.actions
export const filledFormReducer = filledFormSlice.reducer;
