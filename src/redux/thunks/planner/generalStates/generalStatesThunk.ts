import { Dispatch } from "redux";
import axios from "axios";
import { User } from './../../../../interfaces/admin/userInterfaces';
import { error, errorState, resetError, setImageUser, setListUsers, setStates, setUserPermissions, startLoadingGeneral, startLoadingState, UserImage } from '../../../slices/planner/generalStatesSlice';
import { useFetch } from '../../../../hooks/useFetch';
import { Lazy, StateInterface } from "../../../../interfaces/functionalInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";


const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL;
const urlWorkflow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

/* functions to perform user requests */


//Traerme el listado de states
export const fetchStatesThunk = (lazy: Lazy) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingState());
    let { data } = await axios.post<StateInterface>(`${urlWorkflow}/State/GetAllState`,lazy, {headers});
    dispatch(setStates(data));
    return data
  } catch (err:any) {
    dispatch(errorState(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError(err));
    }, 3000);
    return;
  }
};



export const fetchUsersByList = (userList: number[]) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingGeneral());
    let { data } = await axios.post<User[]>(`${url}/User/getUserByIdList`,userList, {headers});
    dispatch(setListUsers(data));
    return data
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    return;
  }
};


export const fetchImageUsers = (userId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingGeneral());
    let { data } = await axios.get<UserImage[]>(`${url}/UserProfileImages/${userId}`, {headers});
    dispatch(setImageUser(data));
    return data
  } catch (err:any) {
    dispatch(error(err?.response?.data));
    return;
  }
};



/* export const fetchPlannerPermissionsThunk = (userId: number) => async (dispatch: Dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingGeneral());
      let { data } = await axios.get(`${url}/Permissions/GetPermissionByUserId?=${userId}`, {  headers });
      const permissions = JSON.parse(
        decryptPermissions(data.response).toString()
      );
      dispatch(setUserPermissions(permissions));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  }; */

export const fetchPlannerPermissionsThunk = (id: number) => async (dispatch: Dispatch) => {
    let request = {
      url: `Permissions/GetPermissionByUserId?userId=${id}`,
      method: "get",
      body: "",
    };

    try {
      const data = await useFetch(request);
        /* const permissions = JSON.parse(
        decryptPermissions(data.response).toString());
        dispatch(setUserPermissions(permissions)); */
      dispatch(setUserPermissions((data.response).toString()));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  };
