import { Lazy } from './../../../../interfaces/functionalInterfaces';
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorWorkflowType, resetStates, setCreateWorkflowType, setDisableWorkflowType, setErrorWorkflowType, setIsLoadingWorkflowType, setUpdateWorkflowType, setWorkflowTypeById, setWorkflowTypeByWorkflowParentId, setWorkflowTypes } from "../../../slices/planner/workflow/workflowTypesSlice";
import { CreateWorkflowTypeInterface, WorkflowTypeInterface } from "../../../../interfaces/planner/workflow/workflowInterface";
import AsyncStorage from '@react-native-async-storage/async-storage';

//get the url from the .env file
const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;


//*List Worflows Types By Id:
export const fetchWorkflowTypesByIdThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    const id = lazyLoad.filter?.find(x => x.field == 'id')?.value;

    if(id == undefined) return

    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.get<WorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/GetWorkFlowTypeById?id=${id}`, { headers });
    dispatch(setWorkflowTypeById(data));
    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}


//*List Worflows Types:
export const fetchWorkflowTypesThunk = (page: number, rows: number) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.get<WorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/GetWorkFlowTypes?page=${page}&rows=${rows}`, { headers });
    dispatch(setWorkflowTypes(data));
    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}


//*List Worflows Types:
export const fetchWorkflowTypesByWorkflowParentIdThunk = (workFlowParentId: number) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.get<WorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/GetWorkFlowTypeByWorkFlowParentId?workFlowParentId=${workFlowParentId}`, { headers });
    dispatch(setWorkflowTypeByWorkflowParentId(data));
    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}


//*Create Worflows Type:
export const fetchCreateWorkflowTypeThunk = (body: any) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.post<CreateWorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/CreateWorkFlowTypes`, body, { headers });
    dispatch(setCreateWorkflowType(data));

    setTimeout(() => {
      dispatch(resetStates())
    }, 3000)

    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}

//*Update Worflows Type:
export const fetchUpdateWorkflowTypeThunk = (body: any) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.put<WorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/UpdateWorkFlowType`, body, { headers });
    dispatch(setUpdateWorkflowType(data));

    setTimeout(() => {
      dispatch(resetStates())
    }, 3000)

    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}

//*Delete Worflows Type:
export const fetchDisableWorkflowTypeThunk = (id: number) => async (dispatch: Dispatch) => {
  //get the token from the local storage
  const token = await AsyncStorage.getItem("Authorization")
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflowType())
    let { data } = await axios.put<WorkflowTypeInterface>(`${urlWorkFlow}/WorkFlowTypes/DeactivateWorkFlowType?id=${id}`,{}, { headers });
    dispatch(setDisableWorkflowType(data));

    setTimeout(() => {
      dispatch(resetStates())
    }, 3000)
    return data;
  } catch (err: any) {
    dispatch(setErrorWorkflowType(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorWorkflowType())
    }, 3000);
    return err;
  }
}