import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Lazy } from "../../../../interfaces/functionalInterfaces";
import { ProjectFunder } from "../../../../interfaces/planner/projects/projectsInterfaces";

type InitialState = {
  funders: ProjectFunder[];
  createFunder: ProjectFunder;
  deleteFunder: ProjectFunder;
  updateFunder: ProjectFunder;
  lazyFunders: Lazy,
  isLoading: boolean;
  error: ErrorResponse;
};

const initialState : InitialState = {
  funders: [] as ProjectFunder[],
  isLoading: false,
  error: {} as ErrorResponse,
  createFunder: {} as ProjectFunder,
  deleteFunder: {} as ProjectFunder,
  updateFunder: {} as ProjectFunder,
  lazyFunders: {
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



const projectFunderSlice = createSlice({

    name: "projectFunder",
    initialState,
    reducers:{

        setFunders: (state, action) => {
            state.funders = action.payload;
            state.isLoading = false;
          },

          setCreatedFunder: (state, action) => {
            state.createFunder = action.payload;
            state.isLoading = false;
          },

          setDeletedFunder: (state, action) => {
            state.deleteFunder = action.payload;
            state.isLoading = false;
          },

          setEditedFunder: (state, action) => {
            state.updateFunder = action.payload;
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
            state.funders = [];
            state.error = {};
            state.createFunder = {} as ProjectFunder;
            state.updateFunder = {} as ProjectFunder;
            state.deleteFunder = {} as ProjectFunder;
            state.isLoading = false;
          },

          resetFunders: (state) =>{
            state.funders = [];
          },

          startLoading: (state) => {
            state.isLoading = true;
          },

          stopLoading: (state) => {
            state.isLoading = false;
          },
    }
})

export const {setFunders, 
              setError, 
              resetError, 
              resetState, 
              resetFunders,
              setCreatedFunder,
              setDeletedFunder,
              startLoading,
              setEditedFunder,
              stopLoading} = projectFunderSlice.actions;

export const projectFunderReducer = projectFunderSlice.reducer;