import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse } from "../../../../interfaces/functionalInterfaces";
import { Assign } from "../../../../interfaces/planner/share/shareInterface";

type InitialState = {
  userToItem?: Assign;
  idItem?: number;
  typeItem?: string;
  fetchItemById?:{
    id:number
  };
  visibleShared: boolean;
  loading: boolean;
  error?: ErrorResponse;
};

const initialState: InitialState = {
  visibleShared: false,
  loading: false,
};

const sharesSlice = createSlice({
  name: "shares",
  initialState,
  reducers: {


    resetState:(state)=>{
      state.error =undefined;
      state.userToItem = undefined
      state.fetchItemById = undefined
    },
    startLoadingShare: (state) => {
      state.loading = true;
    },
    stopLoadingShare: (state) => {
      state.loading = false;
    },
    setFetchItemById:(state, action)=>{
      state.fetchItemById = action.payload
    },
    setVisibleShared: (state) => {
      state.visibleShared = !state.visibleShared;
    },
    setIdItem(state, action) {
      state.idItem = action.payload;
    },

    setTypeItem(state, action) {
      state.typeItem = action.payload;
    },

    setUserToItem(state, action) {
      state.userToItem = action.payload;
      state.loading = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoadingShare,
  stopLoadingShare,
  error,
  setVisibleShared,
  setIdItem,
  setTypeItem,
  setUserToItem,
  resetState,
  setFetchItemById
} = sharesSlice.actions;

export const sharesReducer = sharesSlice.reducer;
