import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../../interfaces/functionalInterfaces";
import { FormInTask, FormsInTask } from "../../../../interfaces/planner/forms/formsRelatedInterface";

type InitialState = {
  formsToTask: FormsInTask[];
  formsAssignes?: FormsInTask[];
  formsUnassigne?: FormsInTask[];
  formById?: FormInTask;
  updatedForm?: FormInTask;
  idItemForm?: number;
  typeItem?: string;
  visibleFormRelated: boolean;
  loadingFormRelate: boolean;
  loadingForm: boolean;
  error: ErrorResponse;
};

const initialState: InitialState = {
  formsToTask:[],
  visibleFormRelated: false,
  loadingFormRelate: false,
  loadingForm: false,
  error:{},
};

const formsRelatedSlice = createSlice({
  name: "formsRelated",
  initialState,
  reducers: {


    resetState:(state)=>{
      state.error ={};
      state.formsAssignes = undefined;
      state.formsUnassigne = undefined;
      state.formById = {} as FormInTask;
      state.updatedForm = {} as FormInTask;
    },
    startLoadingFormRelate: (state) => {
      state.loadingFormRelate = true;
    },
    stopLoadingFormRelate: (state) => {
      state.loadingFormRelate = false;
    },

    startLoadingForm: (state) => {
      state.loadingForm = true;
    },

    stopLoadingForm: (state) => {
      state.loadingForm = false;
    },

    setVisibleFormRelated: (state) => {
      state.visibleFormRelated = !state.visibleFormRelated;
    },
    setIdItemForm(state, action) {
      state.idItemForm = action.payload;
    },

    setTypeItem(state, action) {
      state.typeItem = action.payload;
    },

    setFormToTask(state, action) {
      state.formsToTask = action.payload;
      state.loadingFormRelate = false;
    },

    setFormAssignees(state, action) {
      state.formsAssignes = action.payload;
      state.loadingFormRelate = false;
    },

    setFormUnassigne(state, action) {
      state.formsUnassigne = action.payload;
      state.loadingFormRelate = false;
    },

    setFormById(state, action) {
      state.formById = action.payload;
      state.loadingForm = false;
    },

    setUpdatedForm(state, action) {
      state.updatedForm = action.payload;
      state.loadingFormRelate = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.loadingFormRelate = false;
      state.loadingForm = false;

    },
  },
});

export const {
  startLoadingFormRelate,
  stopLoadingFormRelate,
  error,
  setVisibleFormRelated,
  setIdItemForm,
  setTypeItem,
  setFormToTask,
  resetState,
  setFormAssignees,
  setFormUnassigne,
  startLoadingForm,
  setFormById,
  setUpdatedForm
} = formsRelatedSlice.actions;

export const formsRelatedReducer = formsRelatedSlice.reducer;
