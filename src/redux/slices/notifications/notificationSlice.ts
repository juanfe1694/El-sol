import { createSlice } from '@reduxjs/toolkit';
import { Argument } from '../../../interfaces/notifications/notificationInterface';

type InitialState = {
    notifications: Argument[],
    loading: boolean,
    error:{}
}

const initialState:InitialState = {
    notifications: [],
    loading: false,
    error:{}
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {

    startLoading: (state) => {
      state.loading = true;
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetState: (state) => {
        state.notifications = [],
        state.loading = false,
        state.error = {}
      },
  },
});

export const { startLoading, error, setNotifications, resetState  } = notificationSlice.actions;

export const notificationsReducer = notificationSlice.reducer;