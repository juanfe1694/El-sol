import { Dispatch } from "redux";
import axios from "axios";
import { startLoading, fetchFilledForms, error, resetState, savedForm, fetchFormInUseById, viewForm } from "../../slices/forms/filledFormSlice";
import { FilledForm, FilledFormsResponse, Form, FormsInUseResponse, GetFilledFormsRequest } from "../../../interfaces/form";
import { resetErrorAssignCaseToFilledForms, setErrorAssignCaseToFilledForms } from "../../slices/planner/caseFamilyGroup/caseFamilyGroupSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";


const url: string = <string>process.env.EXPO_PUBLIC_VITE_DYNAMICFORMS_API_URL;
//const url: string = 'https://dynamicservicesapp.azurewebsites.net/api';

export const fetchFilledFormsThunk = (queryParameters: GetFilledFormsRequest) =>
  async (dispatch: Dispatch) => {
    const token: string = await AsyncStorage.getItem("Authorization") as string
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      let { data } = await axios.get<FilledFormsResponse>(`${url}/FilledForm/GetFilledForm?FormsInUseId=${queryParameters.FormsInUseId}`, { headers });
      dispatch(fetchFilledForms(data));
    }
    catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        //dispatch(resetState());
      }, 1000);
      return;
    }
  }

//Ultima peticion
export const saveFilledFormThunk = (formData: FilledForm, isCase: boolean) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization")

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    dispatch(startLoading());
    let { data } = await axios.post<FilledForm>(`${url}/FormResponse/CreateFormResponse`, formData, { headers });
    dispatch(savedForm(data));
    setTimeout(() => {
      dispatch(resetState());
    }, 3000);
    return data;
  } catch (err: any) {
    const parsedError = JSON.stringify(err);
    const parseError = JSON.parse(parsedError)
    dispatch(error(err?.response?.data));
    dispatch(setErrorAssignCaseToFilledForms(err?.response?.data))
    setTimeout(() => {
      dispatch(resetState());
      dispatch(resetErrorAssignCaseToFilledForms())
    }, 1000);
    throw err;
  }
};

export const loadFilledFormThunk = (formData: FilledForm) => async (dispatch: Dispatch) => {
  const token: string = await AsyncStorage.getItem("Authorization") as string
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    dispatch(startLoading());
    //let { data } = await axios.post<FilledForm>(`${url}/FormResponse/CreateFormResponse`,formData,{headers});
    dispatch(viewForm(formData));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
  } catch (err: any) {

    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    return;
  }
};

