import { createSlice } from '@reduxjs/toolkit';

/* gloabal states and functions */
const searchSlice = createSlice({
  name: 'serach',
  initialState: {
    search: ""
  },
  reducers: {
  
    search: (state,action) => {
      state.search = action.payload;
    },
  
  },
})

export const {search} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;