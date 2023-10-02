import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../interfaces/admin/userInterfaces";

import {
  CardProps,
} from "../../../interfaces/planner/projects/projectsInterfaces";
import { ErrorResponse, Lazy, StateInterface } from "../../../interfaces/functionalInterfaces";

export interface UserImage {
  id: number;
  userId: number;
  path: string;
}


type InitialState = {
  states: StateInterface,
  lazyStates : Lazy;
  isLoadingState: boolean;
  errorState: ErrorResponse;
  summaryItem: CardProps[];
  listUsers: User[]
  userImage: UserImage[];
  isLoading: boolean;
  isFiltered: boolean;
  errorData: boolean;
  userPermissions: any;
  //Paginador
  sortOrderAsc: boolean;
  newBasicFirstPage: number,
  newBasicRowsPage: number,
  filterStateValue: string,
  searcherField: string,
};

const initialState: InitialState = {
  states: ({} as StateInterface),
  lazyStates:  {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "id",
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
  isLoadingState: false,
  errorState: ({} as ErrorResponse),
  summaryItem: [],
  listUsers: [],
  userImage: [],
  userPermissions: {},
  isLoading: false,
  isFiltered: false,
  errorData: false,
  //Paginador
  sortOrderAsc: false,
  newBasicFirstPage: 1,
  newBasicRowsPage: 10,
  filterStateValue: "",
  searcherField: ""
};

// Create the slice
const generalStatesSlice = createSlice({
  name: "generalStates",
  initialState,
  reducers: {


    // Set the array of states
    setStates: (state, action) => {
      state.states = action.payload;
      state.isLoading = false;
    },

    // Set the loading flag to true
    startLoadingState: (state) => {
      state.isLoading = true;
    },
    // Set the error flag to true
    errorState: (state, action) => {
      state.errorState = action.payload;
      state.isLoading = false;
    },

    resetError: (state) => {
      state.errorState = {};
    },


    setUserPermissions : (state, action) => {
      state.userPermissions = action.payload;
      state.isLoading = false;
    },

    // Set the array of summary info
    setSummaryItem: (state, action) => {
      state.summaryItem = action.payload;
      state.isLoading = false;
    },

    //Reset the summary item
    setResetSummaryItem: (state) => {
      state.summaryItem = [];
    },

    setListUsers: (state, action) => {
      state.listUsers = action.payload;
      state.isLoading = false;
    },

    setImageUser: (state, action) => {
      state.userImage = action.payload;
      state.isLoading = false;
    },

    // Set the loading flag to true
    startLoadingGeneral: (state) => {
      state.isLoading = true;
    },

    error: (state, action) => {
      state.errorData = action.payload;
      state.isLoading = false;
    },

    setFilteredItems: (state, action) => {
      state.summaryItem = action.payload;
      state.isLoading = false;
    },

    //*Sort Order Asc - Paginador
    setSortOrderAsc: (state, action) => {
      state.sortOrderAsc = action.payload;
    },

    setNewBasicFirstPage: (state, action) => {
      state.newBasicFirstPage = action.payload;
    },

    setNewBasicRowsPage: (state, action) => {
      state.newBasicRowsPage = action.payload;
    },


    setFilterStateValue: (state, action) => {
      state.filterStateValue = action.payload;
    },

    setSearcherField: (state, action) => {
      state.searcherField = action.payload;
    }


  },
});

// Action creators are generated for each case reducer function
export const {

  setStates,
  startLoadingState,
  errorState,
  resetError,

  setSummaryItem,
  setResetSummaryItem,
  setListUsers,
  setImageUser,
  startLoadingGeneral,
  error,
  setFilteredItems,
  setUserPermissions,
  //Sort Order Asc
  setSortOrderAsc,
  setNewBasicFirstPage,
  setNewBasicRowsPage,
  setFilterStateValue,
  setSearcherField,
} = generalStatesSlice.actions;
export const generalStateReducer = generalStatesSlice.reducer;
