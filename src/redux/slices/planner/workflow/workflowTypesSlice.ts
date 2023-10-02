import { createSlice } from '@reduxjs/toolkit';
import { WorkflowTypeInterface } from '../../../../interfaces/planner/workflow/workflowInterface';
import { ErrorResponse } from '../../../../interfaces/functionalInterfaces';



type InitialState = {
  //*Workflow Types
  workflowTypes: WorkflowTypeInterface[],
  workflowTypeById: WorkflowTypeInterface[],
  workflowTypeByWorkflowParentId: WorkflowTypeInterface[],
  createWorkflowType: WorkflowTypeInterface,
  updateWorkflowType: WorkflowTypeInterface,
  disableWorkflowType: WorkflowTypeInterface,
  isLoadingWorkflowType: boolean,
  errorWorkflowType: ErrorResponse,
}


const initialState: InitialState = {
  workflowTypes: [],
  workflowTypeById: [] as WorkflowTypeInterface[],
  workflowTypeByWorkflowParentId: [] as WorkflowTypeInterface[],
  createWorkflowType: ({} as WorkflowTypeInterface),
  updateWorkflowType: ({} as WorkflowTypeInterface),
  disableWorkflowType: ({} as WorkflowTypeInterface),
  isLoadingWorkflowType: false,
  errorWorkflowType: {},
}


export const workflowTypesSlice = createSlice({
  name: 'workflowTypes',
  initialState: initialState,
  reducers: {
    //*Workflow Types
    setWorkflowTypes: (state, action) => {
      state.workflowTypes = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setWorkflowTypeById: (state, action) => {
      state.workflowTypeById = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setWorkflowTypeByWorkflowParentId: (state, action) => {
      state.workflowTypeByWorkflowParentId = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setCreateWorkflowType: (state, action) => {
      state.createWorkflowType = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setUpdateWorkflowType: (state, action) => {
      state.updateWorkflowType = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setDisableWorkflowType: (state, action) => {
      state.disableWorkflowType = action.payload;
      state.isLoadingWorkflowType = false;
      state.errorWorkflowType = {};
    },

    setIsLoadingWorkflowType: (state) => {
      state.isLoadingWorkflowType = true;
    },

    setErrorWorkflowType: (state, action) => {
      state.errorWorkflowType = action.payload;
      state.isLoadingWorkflowType = false;
    },

    resetErrorWorkflowType: (state) => {
      state.errorWorkflowType = {};
      state.isLoadingWorkflowType = false;
    },

    resetStates: (state) => {
      state.createWorkflowType = ({} as WorkflowTypeInterface),
      state.updateWorkflowType = ({} as WorkflowTypeInterface),
      state.disableWorkflowType = ({} as WorkflowTypeInterface)
    },
  }
});


// Action creators are generated for each case reducer function
export const { //*Workflow Types
  setWorkflowTypes,
  setWorkflowTypeById,
  setWorkflowTypeByWorkflowParentId,
  setCreateWorkflowType,
  setUpdateWorkflowType,
  setDisableWorkflowType,
  setIsLoadingWorkflowType,
  setErrorWorkflowType,
  resetErrorWorkflowType,
  resetStates, } = workflowTypesSlice.actions;
export const workflowTypesReducer = workflowTypesSlice.reducer;