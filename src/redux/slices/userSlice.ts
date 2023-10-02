import { createSlice } from '@reduxjs/toolkit';
import { FetchResponseUsers, User, UserCreateFetch } from '../../interfaces/admin/userInterfaces';
import { ErrorResponse, Lazy } from '../../interfaces/functionalInterfaces';

import { Role } from '../../interfaces/admin/rolesInterfaces';

/* gloabal states and functions */


type InitialState = {
  user: User,
  users: FetchResponseUsers,
  lazyUser: Lazy,
  createUser: User,
  updateUser: User,
  disableUser: User,
  deleteUser: User,
  isLoading: boolean,
  error: ErrorResponse,
  userSelected: User,
  filterBy: "email" | "creationDate" | "fullName",
}

const initialState: InitialState = {
  user: ({} as User),
  users: ({} as FetchResponseUsers),
  lazyUser: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
  createUser: ({} as User),
  updateUser: ({} as User),
  disableUser: ({} as User),
  deleteUser: ({} as User),
  isLoading: false,
  error: {},
  userSelected: ({} as User),
  filterBy: "fullName"
}




const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.updateUser = ({} as User);
      state.createUser = ({} as User);
      state.disableUser = ({} as User);
      state.error = {};
    },
    resetUserById: (state) => {
      state.user = ({} as User);
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    fetchUserById: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    fetchUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    resetUsersList: (state) => {
      state.users = ({} as FetchResponseUsers);
    },
    createUser: (state, action) => {
      state.createUser = action.payload;
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      state.updateUser = action.payload;
      state.isLoading = false;
    },
    disableUser: (state, action) => {
      state.disableUser = action.payload;
      state.isLoading = false;
    },
    deleteUser: (state, action) => {
      state.deleteUser = action.payload;
      state.isLoading = false;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    changeLazy: (state, action) => {
      state.lazyUser = action.payload;
    },

    setSelected: (state, action) => {
      state.userSelected = action.payload;
    },
    changeFilterBy: (state, action) => {
      state.filterBy = action.payload;
    }
  },
})

export const { resetState,setSelected, resetUserById, startLoading, fetchUserById, fetchUsers, resetUsersList, createUser, updateUser, disableUser, deleteUser, error, changeLazy, changeFilterBy } = userSlice.actions;
export const userReducer = userSlice.reducer;