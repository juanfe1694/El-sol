import { Dispatch } from "redux";
import axios from "axios";
import { error, resetState, setFormAssignees, setFormById, setFormToTask, setFormUnassigne, setUpdatedForm, startLoadingForm, startLoadingFormRelate } from "../../../slices/planner/forms/formsRelatedSlice";
import { FetchAssignFormToTask, FormInTask, FormsInTask } from '../../../../interfaces/planner/forms/formsRelatedInterface';
import AsyncStorage from "@react-native-async-storage/async-storage";


//get the url from the .env file
const url = process.env.EXPO_PUBLIC_VITE_DYNAMICFORMS_API_URL;

const urlWokflow = process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW

//* Projects:
//get projects from the API


  export const fetchFormsRelatedThunk =
  (id:number) => async (dispatch: Dispatch) => {
    //get the token from the local storage
    const token = await AsyncStorage.getItem("Authorization")!;
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingFormRelate());
      let { data } = await axios.get<FormsInTask[]>(`${url}/FormsInUse/GetFormInUseBytaskId?taskId=${id}`, { headers });

      data = data.map((form)=>{
        return {...form, title :form.FormsInUse.Name[0].Text }
    });

      dispatch(setFormToTask(data));

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      console.error(err)
      dispatch(setFormToTask([]));

      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };


  export const fetchRelateFormToTaskThunk =
  (body:FetchAssignFormToTask) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization")!;
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingFormRelate());
      let { data } = await axios.post<FormsInTask[]>(`${urlWokflow}/Forms/LinkFormsInUseToTask`, body,{ headers });

      dispatch(setFormAssignees(data));

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



  export const fetchUnRelateFormToTaskThunk =
  (id:number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization")!;
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingFormRelate());
      let { data } = await axios.delete<FormsInTask[]>(`${urlWokflow}/Forms?FormId=${id}`,{ headers });

      dispatch(setFormUnassigne(data));

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

  export const fetchFormByIdThunk =
  (id:number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization")!;
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingForm());
      let { data } = await axios.get<FormInTask>(`${urlWokflow}/Forms?formId=${id}`,{ headers });

      dispatch(setFormById(data));
      
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);

      return data;
    } catch (err: any) {

      dispatch(error(err?.response?.data));
      
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
      return;
    }
  };

  export const updateFormThunk =
  (form: FormInTask) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization")!;
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingFormRelate());
      let { data } = await axios.put<FormInTask>(`${urlWokflow}/Forms/UpdateForm`, form,{ headers });

      dispatch(setUpdatedForm(data));
      
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);

      return data;
    } catch (err: any) {

      dispatch(error(err?.response?.data));
      
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

