import { createSlice } from '@reduxjs/toolkit';
import { UserProfileImagesViewModel } from '../../interfaces/admin/userInterfaces';
import { ErrorResponse } from '../../interfaces/functionalInterfaces';

/* gloabal states and functions */
const prifileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileImage: ({} as UserProfileImagesViewModel),
    error: {} as ErrorResponse,
    isLoading: false,
    showCamera: false
  },
  reducers: {
  
    setProfileImage: (state,action) => {
      state.isLoading = false;
      state.profileImage = action.payload;
    },

    setIsLoading: (state,action) => {
      state.isLoading = true;
    },

    setShowCamera: (state, action) => {
      state.showCamera = action.payload;
    },

    resetState: (state) => {
      state.isLoading = false;
      state.profileImage = {} as UserProfileImagesViewModel;
      state.error = {};
    },

    error: (state,action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

  },
})

export const {
  setProfileImage, 
  resetState, 
  setIsLoading, 
  setShowCamera, 
  error } = prifileSlice.actions;
export const profileReducer = prifileSlice.reducer;