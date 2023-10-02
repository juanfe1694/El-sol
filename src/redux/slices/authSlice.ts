import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, Permission } from '../../interfaces/functionalInterfaces';
import { LoginResponse, RegisterResponse, CurrentUser } from '../../interfaces/auth/authInterfaces';

/* gloabal states and functions */


type InitialState ={
  autentication:string,
  authUserInfo: CurrentUser,
  authPermissions:Permission[],
  register:RegisterResponse,
  login:LoginResponse,
  forgotPassword:any,
  resetPassword: any,
  confirmEmail:any,
  isLoading:boolean,
  isLoadingNavbar:boolean,
  isAuthenticating: boolean,
  isLoadingLogout:boolean,
  isLoadingPortal:boolean,
  error: ErrorResponse,
  permissionsError: ErrorResponse,
  forgotPasswordStep:"pending"|"sended"|"confirmed",
}

const initialState:InitialState ={
  autentication: 'verifying', //verifying - info - unauthenticated
  authUserInfo: ({} as CurrentUser),
  authPermissions: [],
  login:{},
  register:{},
  forgotPassword:null,
  forgotPasswordStep:"pending",
  resetPassword: null,
  confirmEmail:null,
  isLoading: false,
  isLoadingNavbar: false,
  isAuthenticating: false,
  isLoadingLogout: false,
  isLoadingPortal: false,
  error: {},
  permissionsError: {}
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    startLoading: (state) => {
      state.isLoading = true;
    },
    startLoadingPortal: (state) => {
      state.isLoadingPortal = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
      state.isLoadingPortal = false;
    },
    startLoadingNavbar: (state) => {
      state.isLoadingNavbar = true;
    },
    stopLoadingNavbar: (state) => {
      state.isLoadingNavbar = false;
    },
    startAuthenticating: (state) => {
      state.isAuthenticating = true;
    },
    stopAuthenticating: (state) => {
      state.isAuthenticating = false;
    },
    resetState: (state)=>{
      state.login = {
        token:'',
        expiration:''
      };
      state.error = {};
      state.permissionsError = {};
      state.register = {
        title: '',
        description: '',
        resultCode: '',
      };
      state.forgotPassword = null;
      state.resetPassword = null;
      state.isLoadingPortal = false;
    },
    autentication: (state,action) => {
      state.autentication = action.payload;
      state.isLoading = false;
    },
    authUserInfo: (state,action: PayloadAction<CurrentUser> ) => {
      state.authUserInfo = action.payload;
      state.isLoading = false;
    },
    resetAuthUserInfo: (state) => {
      state.authUserInfo = {} as CurrentUser;
    },
    authPermissions: (state,action) => {
      state.authPermissions = action.payload;
      state.isLoading = false;
      state.isLoadingPortal = false;
    },
    resetAuthPermissions: (state) => {
      state.authPermissions = [];
    },
    login: (state,action:PayloadAction<LoginResponse>) => {
      state.login = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.autentication = "unauthenticated";
      state.isLoadingLogout = false;
    },
    startLoadingLogout: (state) => {
      state.isLoadingLogout = true;
    },
    register: (state,action:PayloadAction<RegisterResponse>) => {
      state.register = action.payload;
      state.isLoading = false;
    },
    forgotPassword: (state,action) => {
      state.forgotPassword = action.payload;
      state.isLoading = false;
    },
    setForgotPasswordState: (state,action:PayloadAction<"pending" | "sended" | "confirmed">) => {
      state.forgotPasswordStep = action.payload;
      state.isLoading = false;


    },
    resetPassword: (state,action) => {
      state.resetPassword = action.payload;
      state.isLoading = false;
    },
    confirmEmail: (state,action) => {
      state.confirmEmail = action.payload;
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingPortal = false;
    },
    permissionsError: (state, action) => {
      state.permissionsError = action.payload;
      state.isLoading = false;
      state.isLoadingPortal = false;
    },
    resetPermissionsError: (state) => {
      state.permissionsError = {};
    },

  },
})


export const {
  startLoading,
  startLoadingPortal,
  stopLoading,
  startLoadingLogout,
  autentication,
  authUserInfo,
  resetAuthUserInfo,
  login,
  logout,
  register,
  confirmEmail,
  forgotPassword,
  setForgotPasswordState,
  resetPassword,
  resetState,
  authPermissions,
  resetAuthPermissions,
  error,
  permissionsError,
  startLoadingNavbar,
  stopLoadingNavbar,
  resetPermissionsError,
  startAuthenticating,
  stopAuthenticating} = authSlice.actions;
export const authReducer = authSlice.reducer;