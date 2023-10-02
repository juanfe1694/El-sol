import { Dispatch } from "redux";
import axios from "axios";
import { startLoading, error, resetState, generateForm, fetchByFormInUseId, fetchFormInUse, fetchFormLinkState, fetchFormLinkStateAtSave, resetByFormInUseId, resetError, setDeletedFormLink, resetDeletedFormLink, setIsManualFormLink, setLoadingByFormInUseId, resetIsManualFormLink, resetGeneratedForm } from "../../slices/forms/formsLinksSlice";
import { FormLink, FormLinksRequest, FormLinksResponse, ValidateFormLinkRequest } from "../../../interfaces/form/formLinkInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = process.env.EXPO_PUBLIC_VITE_DYNAMICFORMS_API_URL;

export const generateLinkThunk = (form: FormLinksRequest) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.post<FormLink>(`${url}/FormLink/GenerateFormLink`, form, { headers });
    dispatch(generateForm(data));
    setTimeout(() => {
      dispatch(resetGeneratedForm());
    }, 2000);
  }
  catch (err: any) {
    dispatch(error(err?.response?.data));
    return;
  }

}

export const fetchLinkByFormInUseThunk = (id: string) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    dispatch(setLoadingByFormInUseId(true));

    let { data } = await axios.get<FormLink[]>(`${url}/FormLink/GetFormLinksByFormsInUseId?FormsInUseId=${id}`, { headers });
 
    dispatch(fetchByFormInUseId(data));

    dispatch(setLoadingByFormInUseId(false));

    setTimeout(() => {
      dispatch(resetByFormInUseId())
    }, 3000);
  } catch (err: any) {
    dispatch(setIsManualFormLink());
    setTimeout(() => {
      dispatch(resetIsManualFormLink());
    }, 1000);
    return;
  }
};

export const validateFormLinkThunk = (validationData: ValidateFormLinkRequest) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    let { data } = await axios.post<FormLinksResponse>(`${url}/FormLink/ValidateFormLink`, validationData, { headers });

    dispatch(fetchFormInUse(data.FormsInUseByProject));
    dispatch(fetchFormLinkState(data.FormLinkIsValid));

    setTimeout(() => {
    }, 1000);
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    dispatch(fetchFormLinkState(false));
    setTimeout(() => {
      //dispatch(resetState());
    }, 1000);
    return;
  }
};

export const validateFormLinkAtSaveThunk = (validationData: ValidateFormLinkRequest) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.post<FormLinksResponse>(`${url}/FormLink/ValidateFormLink`, validationData, { headers });

    dispatch(fetchFormLinkStateAtSave(data.FormLinkIsValid));

    setTimeout(() => {
    }, 1000);
  } catch (err: any) {

    dispatch(fetchFormLinkStateAtSave(false));
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      //dispatch(resetState());
    }, 1000);
    return;
  }
};

export const blockFormLinkThunk = (formId : string) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(startLoading());
    let { data } = await axios.delete<FormLink>(`${url}/FormLink/BlockFormLink?formLinkId=${formId}`,  { headers });

    dispatch(setDeletedFormLink(data));

    setTimeout(() => {
      dispatch(resetDeletedFormLink());
    }, 3000);
  } catch (err: any) {

    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError());
    }, 3000);
    return;
  }
};

export const fetchFormInUseByIdThunk = (id: string) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    dispatch(setLoadingByFormInUseId(true));

    let { data } = await axios.get(`${url}/FormsInUseByProject/GetFormInUseById?id=${id}`, { headers });

    dispatch(fetchFormInUse(data.FormsInUseByProject));

    //dispatch(setLoadingByFormInUseId(false));

    setTimeout(() => {
     // dispatch(resetByFormInUseId())
    }, 3000);
  } catch (err: any) {
    
    
    //dispatch(setIsManualFormLink());
    setTimeout(() => {
      //dispatch(resetIsManualFormLink());
    }, 1000);
    return;
  }
};


