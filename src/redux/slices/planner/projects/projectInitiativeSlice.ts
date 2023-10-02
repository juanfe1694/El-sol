import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Lazy } from "../../../../interfaces/functionalInterfaces";
import { ProjectInitiative } from "../../../../interfaces/planner/projects/projectsInterfaces";

type InitialState = {
  initiatives: ProjectInitiative[];
  createInitiative: ProjectInitiative;
  deleteInitiative: ProjectInitiative;
  updateInitiative: ProjectInitiative;
  lazyInitiatives: Lazy,
  isLoading: boolean;
  error: ErrorResponse;
};

const initialState : InitialState = {
  initiatives: [] as ProjectInitiative[],
  isLoading: false,
  error: {} as ErrorResponse,
  createInitiative: {} as ProjectInitiative,
  deleteInitiative: {} as ProjectInitiative,
  updateInitiative: {} as ProjectInitiative,
  lazyInitiatives: {
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

const projectInitiativeSlice = createSlice({

    name: "projectInitiative",
    initialState,
    reducers:{

        setInitiatives: (state, action) => {
            state.initiatives = action.payload;
            state.isLoading = false;
          },

          setCreatedInitiative: (state, action) => {
            state.createInitiative = action.payload;
            state.isLoading = false;
          },

          setDeletedInitiative: (state, action) => {
            state.deleteInitiative = action.payload;
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
            state.initiatives = [];
            state.error = {};
            state.createInitiative = {} as ProjectInitiative;
            state.updateInitiative = {} as ProjectInitiative;
            state.deleteInitiative = {} as ProjectInitiative;
            state.isLoading = false;
          },

          resetInitiatives: (state) =>{
            state.initiatives = [];
          },

          startLoading: (state) => {
            state.isLoading = true;
          },

          stopLoading: (state) => {
            state.isLoading = false;
          },
    }
})

export const {setInitiatives, 
              setError, 
              resetError, 
              resetState, 
              resetInitiatives,
              setCreatedInitiative,
              setDeletedInitiative,
              startLoading,
              stopLoading} = projectInitiativeSlice.actions;

export const projectInitiativeReducer = projectInitiativeSlice.reducer;