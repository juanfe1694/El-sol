
import { createSlice } from "@reduxjs/toolkit";
import { ManagedElement } from "../../../interfaces/functionalInterfaces";

 const toastSlice = createSlice({
  name: "toast",
  initialState: { managedElement: {} as ManagedElement},

  reducers: {

    setToastParameters: (state, action) => {
        state.managedElement = action.payload;

      },
      resetState: (state) => {
        state.managedElement = {} as ManagedElement;
      },
  },
});



export const { setToastParameters, resetState } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
