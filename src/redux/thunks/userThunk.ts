import {
  resetState,
  startLoading,
  fetchUserById,
  fetchUsers,
  createUser,
  updateUser,
  disableUser,
  deleteUser,
  error,
} from "../slices/userSlice";


import { Dispatch } from "redux";
import axios from "axios";
import { User, UserCreateFetch, AddRolesFetch, FetchResponseUsers } from './../../interfaces/admin/userInterfaces';
import { Lazy } from "../../interfaces/functionalInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";


const url = process.env.EXPO_PUBLIC_VITE_API_URL;

/* functions to perform user requests */

export const fetchUserByIdThunk =
  (id: number | string) => async (dispatch: Dispatch) => {

    const token = await AsyncStorage.getItem("Authorization");

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoading());
      let { data } = await axios.get<User>(`${url}/User/${id}`,{headers});
      dispatch(fetchUserById(data));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 7000);
      return;
    }
  };

export const fetchUsersThunk = (lazyLoad:Lazy) => async (dispatch: Dispatch) => {


  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {
    dispatch(startLoading());
    let { data } = await axios.post<FetchResponseUsers>(`${url}/User/GetUsers`,lazyLoad,{headers});
    dispatch(fetchUsers(data));
    
    return data
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    return;
  }
};

export const createUserThunk = (body:UserCreateFetch) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading());
    let { data } = await axios.post<User>(`${url}/User`,body,{headers});
    dispatch(createUser(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    
  } catch (err:any) {
    
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    return;
  }
};

export const updateUserThunk = (body:UserCreateFetch) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.put<User>(`${url}/User`,body,{headers});
    dispatch(updateUser(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 7000);
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 7000);
    return;
  }
};

export const disableUserThunk = (user:User) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.put<User>(`${url}/User/disableuser?userId=${user.id}&disableUser=${!user.inactive}`,'',{headers});

    dispatch(disableUser(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    return;
  }
};

export const changeIsDeletedStateUser = (user:User) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    //dispatch(startLoading());
    let { data } = await axios.put<User>(`${url}/User/ChangeIsDeletedStateUser?userId=${user.id}&isDeleted=${!user.isDeleted}`,'',{headers});
    
    dispatch(disableUser(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
  } catch (err:any) {
    
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    return;
  }
};

export const deleteUserThunk = (id:number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.delete<User>(`${url}/User/${id}`,{headers});
    dispatch(deleteUser(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 5000);
    return;
  }
};

