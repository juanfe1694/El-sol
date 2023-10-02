import { Dispatch } from "redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormInUse, FormsInUseResponse } from "../../../interfaces/form/formInUseInterfaces";
import { Form } from "../../../interfaces/form";
import { error, fetchFormInUseById, fetchFormInUseByProjectId, resetfetchFormInUseByProjectId, startLoading } from "../../slices/forms/formInUse.Slice";

const url = process.env.EXPO_PUBLIC_VITE_DYNAMICFORMS_API_URL;

export const getFormsInUseByProjectIdThunk = (projectId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    let { data } = await axios.get<FormInUse[]>(`${url}/FormsInUseByProject/GetFormsInUseByUserInSessionAndProjectId?projectId=${projectId}`,  { headers });
    return data;
  }
  catch (err: any) {  throw err?.response?.data }
}

export const fetchFormInUseByIdThunk = (formInUseId: string) =>
  async (dispatch: Dispatch) => {
    const token: string = await AsyncStorage.getItem("Authorization") as string
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      //dispatch(startLoading());

      let { data } = await axios.get<FormsInUseResponse>(`${url}/FormsInUseByProject/GetFormInUseById?id=${formInUseId}`, { headers });

      //const data : FilledForm[] = filledForms;
      dispatch(fetchFormInUseById(data.FormsInUseByProject));
    }
    catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        //dispatch(resetState());
      }, 1000);
      return;
    }
  }


export const fetchFormInUseByUserInSessionAndProjectId = (projectId: string) =>
  async (dispatch: Dispatch) => {
    const token: string = await AsyncStorage.getItem("Authorization") as string
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      
      dispatch(startLoading());

      let { data } = await axios.get<Form>(`${url}/FormsInUseByProject/GetFormsInUseByUserInSessionAndProjectId?projectId=${projectId}`, { headers });

      dispatch(fetchFormInUseByProjectId(data));
    }
    catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetfetchFormInUseByProjectId());
      }, 1000);
      return;
    }
  }