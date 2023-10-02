import { createSlice } from "@reduxjs/toolkit";
import { FetchResponseWorkflows, WorkFlowI } from '../../../../interfaces/planner/workflow/workflowInterface';
import { BookMarks } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { ErrorResponse, Lazy } from '../../../../interfaces/functionalInterfaces';


type InitialState = {
  //*Workflow
  workflow: WorkFlowI,
  isLoading: boolean,
  error: ErrorResponse;
  parentWorkflow: WorkFlowI,
  workflows: FetchResponseWorkflows,
  isLoadingWorkFlow: boolean,
  updatedWorkflow: WorkFlowI,
  //*update
  updateWorkflow: boolean,
  errorUpdatedWorflow: ErrorResponse,
  //*Create
  newWorkflow: boolean,
  createWorkflows: WorkFlowI,
  //*Replicate
  replicatedWorflow: WorkFlowI[],
  //*Delete
  deletedWorkflow: WorkFlowI,
  //*Filter
  isFiltered: boolean,
  isLoadingFromProject: boolean,
  replicatingError: ErrorResponse;
  searchIsLoading: boolean;
  //*Favorite - bookmarks
  bookMarks: BookMarks[],
  isLoadingBookmark: boolean,
  isWorkflowsFavorite: boolean;
  isWorkflowsFavoriteDetail: boolean;
  errorBookmark: ErrorResponse,
  //*Lazy
  lazyWorkflows: Lazy,
  lazyWorkflowsDetail: Lazy,

}

const initialState: InitialState = {
  workflow: ({} as WorkFlowI),
  isLoading: false,
  error: {},
  parentWorkflow: ({} as WorkFlowI),
  workflows: ({} as FetchResponseWorkflows),
  isLoadingWorkFlow: false,
  updateWorkflow: false,

  updatedWorkflow: ({} as WorkFlowI),
  errorUpdatedWorflow: {},

  newWorkflow: false,
  createWorkflows: {} as WorkFlowI,

  replicatedWorflow: [],
  deletedWorkflow: {} as WorkFlowI,

  isFiltered: false,
  isLoadingFromProject: false,
  replicatingError: {},
  searchIsLoading: false,

  bookMarks: [],
  isLoadingBookmark: false,
  isWorkflowsFavorite: false,
  isWorkflowsFavoriteDetail: false,
  errorBookmark: {},
  lazyWorkflows: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
  lazyWorkflowsDetail: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },

}


const workflowsSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {


    //*Listado de workflows
    setWorkflows: (state, action) => {
      state.workflows = action.payload;
      state.isLoading = false;
      state.isLoadingFromProject = false;
      state.searchIsLoading = false;
      state.updateWorkflow = false;
      state.newWorkflow = false;
    },

    setIsLoadingWorkflow: (state) => {
      state.isLoadingWorkFlow = true;
    },

    setResetWorkflows: (state) => {
      state.workflows = {} as FetchResponseWorkflows;
      // state.isLoading = false;
      // state.isLoadingWorkFlow = false;
      // state.updateWorkflow = false;
      // state.newWorkflow = false;
    },



    resetState: (state) => {
      state.createWorkflows = {} as WorkFlowI;
      state.error = {};
      state.isLoading = false;
      state.workflows = {} as FetchResponseWorkflows;
      state.replicatedWorflow = [];
      state.deletedWorkflow = {} as WorkFlowI;
      state.replicatingError = {};
      state.updateWorkflow = false;
      state.newWorkflow = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingFromProject = false;
      state.isLoadingWorkFlow = false;
      state.newWorkflow = false;
    },

    resetError: (state) => {
      state.error = {};
      // state.isLoading = false;
      state.isLoadingFromProject = false;
      state.isLoadingWorkFlow = false;
    },

    //*Workflow by Id

    startLoadingWorkflow: (state) => {
      state.isLoading = true;
    },

    setWorkflowById: (state, action) => {
      state.workflow = action.payload;
      state.isLoadingWorkFlow = false;
      state.updateWorkflow = false;
      state.newWorkflow = false;
    },

    setWorkflowByIdShare: (state, action) => {
      state.workflow = action.payload;

    },
    resetWorkflowById: (state) => {
      state.workflow = {} as WorkFlowI;
      state.isLoading = false;
      //state.isLoadingWorkFlow = false;
    },

    setParentWorkflowById: (state, action) => {
      state.parentWorkflow = action.payload;
      state.isLoading = false;
    },

    //*Add a new Workflow to the array of all Workflow


    setCreateWorkflow: (state) => {
      //state.workflows = action.payload;
      state.isLoading = false;
      state.newWorkflow = true;
      state.error = {};
    },


    //*Update workflow

    setUpdateWorkflow: (state) => {
      state.isLoading = false;
      state.updateWorkflow = true;
    },

    setErrorUpdate: (state, action) => {
      state.errorUpdatedWorflow = action.payload;
    },

    resetErrorUpdate: (state) => {
      state.errorUpdatedWorflow = {};
    },


    //*Listado de Favoritos

    setFavoriteWorkflows: (state, action) => {
      state.isWorkflowsFavorite = action.payload;
    },

    setFavoriteWorkflowsDetail: (state, action) => {
      state.isWorkflowsFavoriteDetail = action.payload;
    },

    setListBookMark: (state, action) => {
      state.bookMarks = action.payload;
      state.isLoadingBookmark = false;
    },

    setBookMark: (state, action) => {
      state.bookMarks = [...state.bookMarks, action.payload]
      state.isLoadingBookmark = false;
    },

    setDeleteBookMark: (state, action) => {
      state.bookMarks = state.bookMarks.filter(bookMark => bookMark.id !== action.payload)
      state.isLoadingBookmark = false;
    },

    errorBookMarks: (state, action) => {
      state.errorBookmark = action.payload;
      state.isLoadingBookmark = false;
    },

    resetErrorBookMarks: (state) => {
      state.errorBookmark = {};
      state.isLoadingBookmark = false;
    },

    startLoadingBoomark: (state) => {
      state.isLoadingBookmark = true;
    },


    //*Other actions
    startLoadingDetailProject: (state) => {
      state.isLoadingFromProject = true;
    },

    startLoadingSearch: (state) => {
      state.searchIsLoading = true;
    },

    //*Replicate workflow

    setReplicatingError: (state, action) => {
      state.replicatingError = action.payload;
      state.isLoading = false;
    },

    resetReplicatingError: (state) => {
      state.replicatingError = {};
      state.isLoading = false;
    },

    setReplicatedWorkflow: (state, action) => {
      state.replicatedWorflow = action.payload;
      state.workflows.data.concat(action.payload);
      state.isLoading = false;
    },

    resetReplicatedWorkflow: (state) => {
      state.replicatedWorflow = [];
      state.isLoading = false;
    },

    //*Filter by user workflow

    setFilteredUsersWorkflows: (state, action) => {
      state.workflows = action.payload;
      state.isLoading = false;
      state.isLoadingFromProject = false;
    },

    setDeletedWorkflow: (state, action) => {
      state.deletedWorkflow = action.payload;
      state.isLoading = false;
      state.isLoadingFromProject = false;
    },

    //onChange lazy
    setOnChangeLazy: (state, action) => {
      state.lazyWorkflows = action.payload;
    },

    setOnChangeWorkflowLazyDetail: (state, action) => {
      state.lazyWorkflowsDetail = action.payload;
    },


  }
});


// Action creators are generated for each case reducer function
export const {
  //*List
  setWorkflows,
  setIsLoadingWorkflow,
  setResetWorkflows,
  error,
  resetError,

  //*By Id
  setWorkflowById,
  resetWorkflowById,
  setWorkflowByIdShare,

  //*Bookmarks
  setFavoriteWorkflows,
  setFavoriteWorkflowsDetail,
  setListBookMark,
  setBookMark,
  startLoadingBoomark,
  setDeleteBookMark,
  errorBookMarks,
  resetErrorBookMarks,

  //*Create
  setCreateWorkflow,

  //*Update
  setUpdateWorkflow,
  setErrorUpdate,
  resetErrorUpdate,

  //Others
  setParentWorkflowById,
  setFilteredUsersWorkflows,
  resetState,
  startLoadingWorkflow,
  startLoadingSearch,
  startLoadingDetailProject,

  //*Replicate
  setReplicatingError,
  resetReplicatingError,
  setReplicatedWorkflow,
  resetReplicatedWorkflow,
  //*Delete
  setDeletedWorkflow,

  //*Lazy
  setOnChangeLazy,
  setOnChangeWorkflowLazyDetail,

} = workflowsSlice.actions;
export const workflowReducer = workflowsSlice.reducer;