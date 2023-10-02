import { createSlice } from '@reduxjs/toolkit';
import { GanttI } from '../../../interfaces/planner/management/ganttInterfaces';

type InitialState = {
    gantt:GanttI[],
    loading:boolean,
    error:boolean,
    errorData:{}

}

const initialState:InitialState = {
gantt: [
  {
    start: new Date(2022, 2, 1).toISOString().substring(0, 10),
    end: new Date(2022, 2, 15).toISOString().substring(0, 10),
      name: "string new descript",
      id: "1",
      progress: 0,
      projectsDeliverables: null,
      typeDescription: null,
      type: "Projects",
      userInformation: {
          id: 0,
          fullName: null,
          userName: null, 
          email: null,
          imageProfilePath: null
      }
  }],
  loading: false, 
  error: false,
  errorData:{}
  
};

const ganttSlice = createSlice({
  name: 'gantt',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },


    setGantt(state, action) {
      // state.loading = false;
      state.gantt = action.payload;
    },
    error: (state, action) => {
      state.errorData = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading,setGantt, error } = ganttSlice.actions;

export const ganttReducer = ganttSlice.reducer;