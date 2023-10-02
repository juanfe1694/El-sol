import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../../interfaces/functionalInterfaces";

type InitialState = {
  error?: ErrorResponse;
};

const initialState: InitialState = {
    error: {} as ErrorResponse
};

const unShareSlice = createSlice({
  name: "unShare",
  initialState,
  reducers: {


    resetState:(state)=>{
      state.error = {};
    },

    error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { error, resetState } = unShareSlice.actions;

export const unShareReducer = unShareSlice.reducer;
