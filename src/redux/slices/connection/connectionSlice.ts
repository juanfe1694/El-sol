import { createSlice } from '@reduxjs/toolkit';
import { Projects } from '../../../interfaces/planner/projects/projectsInterfaces';
import { FormInUse, LocalForm } from '../../../interfaces/form';
import { boolean } from 'yup';

/* global states and functions for disconnection mode */

type InitialState ={
  projects: Projects[],
  forms: FormInUse[],
  filledForms: LocalForm[],
  synchronizingProjects: boolean,
  synchronizingForms: boolean,
  isLoading: boolean,
  isConnected: boolean,
}

const initialState:InitialState ={
  projects: [],
  forms: [],
  filledForms: [],
  synchronizingProjects: false,
  synchronizingForms: false,
  isLoading: false,
  isConnected: false
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {

    startSinchronizingProjects: (state) => {
      state.synchronizingProjects = true;
    },
    startSinchronizingForms: (state) => {
      state.synchronizingForms = true;
    },
    stopSinchronizingForms: (state) => {
      state.synchronizingForms = false;
    },
    setProjects: (state,action) => {
      state.projects = action.payload;
      state.synchronizingProjects = false;
    },
    setForms: (state,action) => {
      state.forms = action.payload;
      state.synchronizingForms = false;
      //state.isLoading = false;
    },
    resetForms: (state) => {
      state.forms = []
    },
    setFilledForms: (state,action) => {
      state.filledForms = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    stopSetIsLoading: (state) => {
      state.isLoading = false;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    }
  },
})

export const {
  startSinchronizingProjects,
  startSinchronizingForms,
  setProjects,
  setForms,
  resetForms,
  stopSinchronizingForms,
  setIsLoading,
  stopSetIsLoading,
  setFilledForms,
  setIsConnected
} = connectionSlice.actions;
export const connectionReducer = connectionSlice.reducer;