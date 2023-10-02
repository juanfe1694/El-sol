import { createSlice } from '@reduxjs/toolkit';
import { FetcResponseCasePersons } from '../../../../interfaces/planner/casePersons/casePersonsInterface';
import { ErrorResponse, Lazy } from '../../../../interfaces/functionalInterfaces';


type InitialState = {
  casePersons: FetcResponseCasePersons;
  personsIsLoading: boolean;
  recordCount: number;
  errorCasePersons: ErrorResponse;
  lazyCasePersons: Lazy,
 
}

const initialState: InitialState = {
  casePersons: ({} as FetcResponseCasePersons),
  personsIsLoading: false,
  recordCount: 0,
  errorCasePersons: {},
  lazyCasePersons: {
    rows: 20,
    page: 1,
    sort: [
      {
        field: "id",
        dir: "asc",
      },
    ],
    filter: [
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
}

export const casePersonsSlice = createSlice({
  name: 'casePersons',
  initialState,
  reducers: {

    setCasePersons: (state, action) => {
      state.casePersons = action.payload;
      state.personsIsLoading = false;
    },

    setResetCasePersons: (state) => {
      state.casePersons = {} as FetcResponseCasePersons;
      state.personsIsLoading = false;
    },

    isLoadingCasePersons: (state) => {
      state.personsIsLoading = true;
    },

    errorCasePersons: (state, action) => {
      state.errorCasePersons = action.payload;
      state.personsIsLoading = false;
    },

    resetErrorCasePersons: (state) => {
      state.errorCasePersons = {};
    },

    setStopCasePersonsIsLoading: (state) => {
      state.personsIsLoading = false;
    },

    



  }
});


// Action creators are generated for each case reducer function
export const {
  setCasePersons,
  setResetCasePersons,
  isLoadingCasePersons,
  setStopCasePersonsIsLoading,
  errorCasePersons,
  resetErrorCasePersons,
} = casePersonsSlice.actions;

export const casePersonsReducer = casePersonsSlice.reducer;