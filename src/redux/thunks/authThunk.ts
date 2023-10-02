import axios from "axios";
import { decryptPermissions } from "../../helpers/decryiptPermissions";
import { useFetch } from "../../hooks/useFetch";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  resetState,
  error,
  startLoading,
  stopLoading,
  autentication,
  authPermissions,
  authUserInfo,
  startLoadingLogout,
  setForgotPasswordState,
  confirmEmail,
  resetAuthUserInfo,
  startLoadingPortal,
  resetAuthPermissions,
  permissionsError,
  startLoadingNavbar,
  stopLoadingNavbar,
  startAuthenticating,
  stopAuthenticating,
} from "../slices/authSlice";
import { Dispatch } from "redux";
import {
  RegisterResponse,
  CurrentUser,
  FetchValidation,
  CheckVerificationCodeFetch,
  UpdatePasswordFetch,
} from "../../interfaces/auth/authInterfaces";

import {
  LoginResponse,
  UserCredentialsFetch,
  UserRegisterFetch,
  ForgotPasswordFetch,
  ResetPasswordFetch,
} from "../../interfaces/auth/authInterfaces";
import { Permission } from "../../interfaces/functionalInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = process.env.EXPO_PUBLIC_VITE_API_URL;

/* check if the user is registered */
export const loginThunk =
  (userCredentials: UserCredentialsFetch) => async (dispatch: Dispatch) => {
    const { username, password } = userCredentials;
    try {
      dispatch(startLoading());
      dispatch(startLoadingNavbar());
      let { data } = await axios.post<LoginResponse>(
        `${url}/Authenticate/token`,
        {},
        {
          auth: { username, password },
        }
      );
      dispatch(login(data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
    } catch (err: any) {
      console.error("ERROR", err)
      dispatch(error(err?.response?.data));
      dispatch(stopLoadingNavbar());
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return;
    }
  };

export const logoutThunk = () => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoadingLogout());
    setTimeout(() => {
      dispatch(logout());
      dispatch(resetAuthUserInfo());
    }, 1000);
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    return;
  }
};

export const autenticationThunk = () => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      System: "Security",
      Module: "Authenticate",
      Controller: "Authenticate",
      Action: "Validate",
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'

    };
    dispatch(startLoading());
    dispatch(startAuthenticating());

    let { data } = await axios.post<FetchValidation>(
      `${url}/Authenticate/validate`,
      "",
      { headers }
    );
    dispatch(stopAuthenticating());
    dispatch(stopLoading());
    dispatch(authUserInfo(data.result));
    dispatch(autentication(data));
    dispatch(stopLoadingNavbar());
    return;
  } catch (err: any) {
    const netError = JSON.stringify(err)
    const parseError = JSON.parse(netError)
    dispatch(stopAuthenticating());
    if(parseError?.message != 'Network Error'){
      dispatch(autentication("unauthenticated"));
    }

    dispatch(stopLoading());
    dispatch(stopLoadingNavbar());
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    return;
  }
};

export const authPermissionsThunk =
  (id: number) => async (dispatch: Dispatch) => {

    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    }

    try {
      dispatch(startLoading());
      dispatch(startLoadingPortal());
      
      const { data } = await axios.get(
        `${url}/Permissions/GetPermissionByUserId?userId=${id}`,
        { headers });

      let permissions: Permission[] = JSON.parse(
        decryptPermissions(data.response)
      );

      dispatch(authPermissions(permissions));
    } catch (err: any) {
      dispatch(permissionsError(err?.response?.data));
      dispatch(stopLoading());

      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const registerThunk =
  (body: UserRegisterFetch) => async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      let { data } = await axios.post<RegisterResponse>(
        `${url}/Authenticate/registerUser`,
        body
      );
      dispatch(register(data));

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    } catch (err: any) {
      

      dispatch(error(err?.response?.data));

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return;
    }
  };



export const forgotPasswordThunk =
  (body: ForgotPasswordFetch) => async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      let { data } = await axios.post<RegisterResponse>(
        `${url}/Authenticate/forgotPassword`,
        body
      );
      dispatch(forgotPassword(data));
      dispatch(setForgotPasswordState("sended"));

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };


export const vericateCodeThunk =
  ({ emailUser, verificationCode }: CheckVerificationCodeFetch) => async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      let { data } = await axios.get<RegisterResponse>(
        `${url}/Authenticate/validateVerificationCode?emailUser=${emailUser}&verificationCode=${verificationCode}`
      );

      dispatch(setForgotPasswordState("confirmed"));

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const resetPasswordThunk =
  (body: UpdatePasswordFetch) => async (dispatch: Dispatch) => {

    try {
      dispatch(startLoading());
      let { data } = await axios.put<RegisterResponse>(
        `${url}/Authenticate/updatePassword`,
        body
      );

      dispatch(resetPassword(data));
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };


export const confirmEmailThunk =


  (recordId: string, token: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(startLoading());
      let { data } = await axios.get<RegisterResponse>(
        `${url}/Authenticate/activateNewUser/${recordId}/${token}`);

      dispatch(confirmEmail(data));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

  export const resetAuthPermissionsThunk =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch(resetAuthPermissions());
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

  