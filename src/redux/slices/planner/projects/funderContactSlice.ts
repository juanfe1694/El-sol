import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Lazy } from "../../../../interfaces/functionalInterfaces";
import { FunderContacts, FundercontactInProject } from "../../../../interfaces/planner/projects/projectsInterfaces";

type InitialState = {
  funderContacts: FunderContacts[];
  createFunderContact: FunderContacts;
  createFunderContactInProject: FunderContacts;
  deleteFunderContact: FunderContacts;
  updateFunderContact: FunderContacts;
  lazyFunderContacts: Lazy,
  isLoading: boolean;
  error: ErrorResponse;
};

const initialState : InitialState = {
  funderContacts: [] as FunderContacts[],
  isLoading: false,
  error: {} as ErrorResponse,
  createFunderContact: {} as FunderContacts,
  createFunderContactInProject: {} as FunderContacts,
  deleteFunderContact: {} as FunderContacts,
  updateFunderContact: {} as FunderContacts,
  lazyFunderContacts: {
    rows: 50,
    page: 1,
    sort: [
      {
        field: "name",
        dir: "desc",
      },
    ],
    filter: [
        {
          field: "isDeleted",
          value: "false",
          matchMode: "equals",
        }
    ],
  }
}

const funderContactSlice = createSlice({

    name: "funderContact",
    initialState,
    reducers:{

        setFunderContacts: (state, action) => {
            state.funderContacts = action.payload;
            state.isLoading = false;
          },

          setCreatedFunderContact: (state, action) => {
            state.createFunderContact = action.payload;
            state.isLoading = false;
          },

          setCreatedFunderContactInProject: (state, action) => {
            state.createFunderContactInProject = action.payload;
            state.isLoading = false;
          },

          resetCreatedFunderContactInProject: (state) => {
            state.createFunderContactInProject = {} as FunderContacts;
            state.isLoading = false;
          },

          setUpdatedFunderContact: (state, action) => {
            state.updateFunderContact = action.payload;
            state.isLoading = false;
          },

          setDeletedFunderContact: (state, action) => {
            state.deleteFunderContact = action.payload;
            state.isLoading = false;
          },

          setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
          },
      
          resetError: (state) => {
            state.error = {};
          },

          resetState: (state) =>{
            state.funderContacts = [];
            state.error = {};
            state.createFunderContact = {} as FunderContacts;
            state.createFunderContactInProject = {} as FunderContacts;
            state.updateFunderContact = {} as FunderContacts;
            state.deleteFunderContact = {} as FunderContacts;
            state.isLoading = false;
          },

          resetFunderContacts: (state) =>{
            state.funderContacts = [];
          },

          startLoading: (state) => {
            state.isLoading = true;
          },

          stopLoading: (state) => {
            state.isLoading = false;
          },
    }
})

export const {setFunderContacts, 
              setError, 
              resetError, 
              resetState, 
              resetFunderContacts,
              setCreatedFunderContact,
              setCreatedFunderContactInProject,
              resetCreatedFunderContactInProject,
              setUpdatedFunderContact,
              setDeletedFunderContact,
              startLoading,
              stopLoading} = funderContactSlice.actions;

export const funderContactReducer = funderContactSlice.reducer;