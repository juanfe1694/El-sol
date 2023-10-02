import { createSlice } from '@reduxjs/toolkit';
import { FormInUse } from '../../../interfaces/form/formInUseInterfaces';
import { FormLink } from '../../../interfaces/form/formLinkInterfaces';
import { ErrorResponseModel } from '../../../interfaces/functionalInterfaces';

export type LinkPayload = {
  formURL: string;
  formId: string;
  formName: string;
}


type SliceState = {
  form: FormLink;
  generateForm: FormLink;
  linkByFormInUse: FormLink[];
  formInUse: FormInUse;
  FormLinkIsValid: boolean;
  FormLinkIsValidToSave: boolean;
  updateForm: FormLink;
  deleteForm: FormLink;
  isLoading: boolean;
  qrModalVisible: boolean;
  payload: LinkPayload;
  startDate: Date | null;
  endDate: Date | null;
  linkCategory: string | null;
  error: ErrorResponseModel;
  isManualFormLink: boolean;
  loadingByFormInUseId: boolean;
}

const initialState: SliceState = {
  form: ({} as FormLink),
  generateForm: ({} as FormLink),
  linkByFormInUse: ([]),
  formInUse: ({} as FormInUse),
  FormLinkIsValid: false,
  FormLinkIsValidToSave: false,
  updateForm: ({} as FormLink),
  deleteForm: ({} as FormLink),
  isLoading: false,
  qrModalVisible: false,
  payload: ({} as LinkPayload),
  startDate: null,
  endDate: null,
  linkCategory: null,
  error: {},
  isManualFormLink: false,
  loadingByFormInUseId: false
}

export const formsLinksSlice = createSlice({
  name: 'formLink',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    fetchByFormInUseId: (state, action) => {
      state.linkByFormInUse = action.payload;
      state.isLoading = false;
      state.loadingByFormInUseId = false;
    },

    resetByFormInUseId: (state) => {
      state.linkByFormInUse = [];
      state.loadingByFormInUseId = false;
    },

    fetchFormInUse: (state, action) => {
      state.formInUse = action.payload;
      state.isLoading = false;
      state.loadingByFormInUseId = false;
    },

    resetFormInUse: (state) => {
      state.formInUse = {} as FormInUse;
      state.isLoading = false;
      state.loadingByFormInUseId = false;
    },

    fetchFormLinkState: (state, action) => {
      state.FormLinkIsValid = action.payload;
      state.isLoading = false;
    },
    fetchFormLinkStateAtSave: (state, action) => {
      state.FormLinkIsValidToSave = action.payload;
      state.isLoading = false;
    },
    generateForm: (state, action) => {
      state.generateForm = action.payload;
      state.isLoading = false;
    },
    resetGeneratedForm: (state) => {
      state.generateForm = ({} as FormLink);
      state.isLoading = false;
    },
    showModal: (state, action) => {
      state.payload = action.payload;
      state.qrModalVisible = true;
      state.isLoading = false;
    },
    setPayload: (state, action) => {
      state.payload = action.payload;
      state.isLoading = false;
    },
    initialDate: (state, action) => {
      state.startDate = action.payload;
      state.isLoading = false;
    },
    finalDate: (state, action) => {
      state.endDate = action.payload;
      state.isLoading = false;
    },
    linkCategory: (state, action) => {
      state.linkCategory = action.payload;
      state.isLoading = false;
    },
    hiddeModal: (state) => {
      state.qrModalVisible = false;
    },
    resetDates: (state) => {
      state.startDate = null,
        state.endDate = null
    },
    resetState: (state) => {
      state.form = ({} as FormLink),
        state.generateForm = ({} as FormLink),
        state.linkByFormInUse = ([]),
        state.formInUse = ({} as FormInUse),
        state.FormLinkIsValid = false,
        state.FormLinkIsValidToSave = false,
        state.updateForm = ({} as FormLink),
        state.deleteForm = ({} as FormLink),
        state.isLoading = false,
        state.qrModalVisible = false,
        state.payload = ({} as LinkPayload),
        state.startDate = null,
        state.endDate = null,
        state.linkCategory = null,
        state.error = {}
        state.loadingByFormInUseId = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    resetError: (state) => {
      state.error = {};
      state.isLoading = false;
    },

    setDeletedFormLink: (state, action) => {
      state.deleteForm = action.payload;
      state.isLoading = false;
    },

    resetDeletedFormLink: (state) => {
      state.deleteForm = {} as FormLink;
      state.isLoading = false;
    },

    setIsManualFormLink: (state) => {
      state.isManualFormLink = true;
      state.loadingByFormInUseId = false;
    },

    resetIsManualFormLink: (state) => {
      state.isManualFormLink = false;
    },

    setLoadingByFormInUseId: (state, action) => {
      state.loadingByFormInUseId = action.payload;
    },

  },
})

export const { startLoading,
  stopLoading,
  fetchByFormInUseId,
  fetchFormInUse,
  resetFormInUse,
  fetchFormLinkState,
  fetchFormLinkStateAtSave,
  generateForm,
  resetGeneratedForm,
  showModal,
  setPayload,
  hiddeModal,
  initialDate,
  finalDate,
  linkCategory,
  resetDates,
  resetState,
  resetByFormInUseId,
  error,
  resetError,
  setDeletedFormLink,
  resetDeletedFormLink,
  setIsManualFormLink,
  setLoadingByFormInUseId,
  resetIsManualFormLink
 } = formsLinksSlice.actions

export const formsLinksReducer = formsLinksSlice.reducer;
