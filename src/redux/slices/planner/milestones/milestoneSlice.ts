import { createSlice } from "@reduxjs/toolkit";
import { Milestone, FetchResponseMilestone } from '../../../../interfaces/planner/milestones/milestonesInterface';
import { ErrorResponse, Lazy } from '../../../../interfaces/functionalInterfaces';


type InitialState = {
  milestone: Milestone,
  milestones: FetchResponseMilestone,
  milestoneUpdate: boolean,
  errorMilestoneUpdate: ErrorResponse,
  isMilestonesFavorite: boolean,
  isMilestonesFavoriteDetail: boolean,
  parentMilestones: FetchResponseMilestone,
  newMilestone: boolean,
  lazyMilestones: Lazy,
  lazyMilestonesDetail: Lazy,
  createMilestone: Milestone,
  replicatedMilestones: Milestone[],
  isLoading: boolean,
  isLoadingMilestoneById: boolean,
  isLoadingParents: boolean,
  isFiltered: boolean,
  error: ErrorResponse;
  errors: ErrorResponse[];
  replicatingError: ErrorResponse;
  searchIsLoading: boolean,
  deletedMilestone: Milestone
}

const initialState: InitialState = {
  milestone: ({} as Milestone),
  milestones: ({} as FetchResponseMilestone),
  milestoneUpdate: false,
  errorMilestoneUpdate: {},
  isMilestonesFavorite: false,
  isMilestonesFavoriteDetail: false,
  parentMilestones: ({} as FetchResponseMilestone),
  newMilestone: false,
  lazyMilestones: {
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
  lazyMilestonesDetail: {
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
  createMilestone: {} as Milestone,
  replicatedMilestones: [],
  isLoading: false,
  isLoadingMilestoneById: false,
  isLoadingParents: false,
  isFiltered: false,
  error: {},
  errors: [],
  replicatingError: {},
  searchIsLoading: false,
  deletedMilestone: {} as Milestone
}


const milestoneSlice = createSlice({
  name: 'milestone',
  initialState,
  reducers: {

    //*Get milestones
    setMilestones: (state, action) => {
      state.milestones = action.payload;
      state.isLoading = false;
      state.searchIsLoading = false;
      state.milestoneUpdate = false;
    },

    setFavoriteMilestones: (state, action) => {
      state.isMilestonesFavorite = action.payload;
    },

    setFavoriteMilestonesDetail: (state, action) => {
      state.isMilestonesFavoriteDetail = action.payload;
    },

    setResetMilestones: (state) => {
      state.milestones = {} as FetchResponseMilestone;
      state.isLoading = false;
    },

    setParentMilestones: (state, action) => {
      state.parentMilestones = action.payload;
      state.isLoadingParents = false;
    },

    resetState: (state) => {
      state.createMilestone = {} as Milestone;
      state.error = {};
      state.replicatingError = {};
      state.milestones = {} as FetchResponseMilestone;
      state.parentMilestones = ({} as FetchResponseMilestone);
      state.isLoading = false;
      state.isLoadingParents = false;
      state.deletedMilestone =  {} as Milestone;
    },


    //*Update Milestones
    setUpdateMilestones: (state) => {
      state.milestoneUpdate = true;
      state.replicatedMilestones = [],
      state.isLoading = false;
      state.errorMilestoneUpdate = {};
    },

    setResetUpdate: (state) => {
      state.milestoneUpdate = false;
    },

    setErrorUpdateMilestone: (state, action) => {
      state.errorMilestoneUpdate = action.payload;
      state.isLoading = false;
    },

    resetErrorUpdate: (state) => {
      state.errorMilestoneUpdate = {};
    },

    //*Create Milestones

    // Add a new project to the array of all projects
    setCreateMilestones: (state) => {
      //state.milestones = action.payload;
      state.isLoading = false;
      state.newMilestone = true;
    },


    //*Replicate Milestones

    setReplicatedMilestones: (state, action) => {
      state.replicatedMilestones = action.payload;
      state.milestones.data.concat(action.payload);
      state.isLoading = false;
      state.newMilestone = true;
    },

    resetReplicatedMilestones: (state) => {
      state.replicatedMilestones = [];
      state.isLoading = false;
    },

    setReplicatingError: (state, action) => {
      state.replicatingError = action.payload;
      state.isLoading = false;
    },

    reSetReplicatingError: (state) => {
      state.replicatingError = {};
      state.isLoading = false;
    },

    //*Get milestone by Id
    starLoadingMilestoneById: (state) => {
      state.isLoadingMilestoneById = true;
    },
    
    setMilestonesById: (state, action) => {
      state.milestone = action.payload;
      state.isLoadingMilestoneById = false
      state.searchIsLoading = false;
    },
    setMilestonesByIdShare: (state, action) => {
      state.milestone = action.payload;
    },
    setResetMilestone: (state) => {
      state.milestone = {} as Milestone;
      //state.isLoading = false;
    },

    startLoading: (state) => {
      state.isLoading = true;
    },

    startLoadingSearch: (state) => {
      state.searchIsLoading = true;
    },

    startLoadingParents: (state) => {
      state.isLoadingParents = true;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingMilestoneById = false
    },

    setErrors: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },


    setFilteredUsersMilestones: (state, action) => {
      state.milestones = action.payload;
      state.isLoading = false;
    },

    setDeletedMilestone: (state, action) => {
      state.deletedMilestone = action.payload;
      state.isLoading = false;
    },

    resetDeletedMilestone: (state) => {
      state.deletedMilestone = {} as Milestone;
    },

    //onChange Lazy
    onChangeLazyMilestones: (state, action) => {
      state.lazyMilestones = action.payload;
    },

    onChangeLazyMilestonesDetail: (state, action) => {
      state.lazyMilestonesDetail = action.payload;
    },


  }
});


// Action creators are generated for each case reducer function
export const { setMilestones,
  setFavoriteMilestones,
  setFavoriteMilestonesDetail,
  setResetMilestones,
  setCreateMilestones,
  setMilestonesById,
  starLoadingMilestoneById,
  setResetMilestone,
  startLoading,
  setMilestonesByIdShare,
  //*Update
  setUpdateMilestones,
  setResetUpdate,
  setErrorUpdateMilestone,
  resetErrorUpdate,
  //
  startLoadingSearch,
  error,
  setErrors,
  setReplicatingError,
  reSetReplicatingError,
  resetState,
  setFilteredUsersMilestones,
  resetReplicatedMilestones,
  setReplicatedMilestones,
  setParentMilestones,
  startLoadingParents,
  setDeletedMilestone,
  resetDeletedMilestone,
  //Lazy
  onChangeLazyMilestones,
  onChangeLazyMilestonesDetail,
} = milestoneSlice.actions;
export const milestoneReducer = milestoneSlice.reducer;