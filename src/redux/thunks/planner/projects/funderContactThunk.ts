import { Dispatch } from "redux";
import axios from 'axios';
import { FunderContacts, ProjectFunder } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { resetError, setCreatedFunder, setError, startLoading, stopLoading } from "../../../slices/planner/projects/projectFunderSlice";
import { Lazy } from "../../../../interfaces/functionalInterfaces";
import { resetCreatedFunderContactInProject, setCreatedFunderContactInProject, setDeletedFunderContact, setFunderContacts, setUpdatedFunderContact } from "../../../slices/planner/projects/funderContactSlice";

//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!

//get Funders from the API
export const fetchFunderContactsThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {

    const funderId = lazyLoad.filter?.find(x => x.field == 'funderId')?.value;

    if(funderId == undefined) return
    
    dispatch(startLoading())
    let { data } = await axios.get<FunderContacts[]>(`${url}/FunderContacts/GetFunderContactsByFunderId${funderId}`, { headers });
  
    dispatch(setFunderContacts(data));
    return data;
  } catch (err: any) {
    dispatch(stopLoading())
    return;
  }
}

/**
 * It's a thunk that dispatches a startLoading action, then makes a post request to the server, then
 * dispatches a setFunders action, and finally returns the data from the post request.
 * @param {string} funderName - string - the name of the funder
 * @returns The return type is ProjectFunder.
 */

export const createFunderContactThunk = (funderContact: FunderContacts) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<FunderContacts>(`${url}/FunderContacts/CreateFunderContact`, funderContact, { headers });
    dispatch(setCreatedFunder(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const updateFunderContactThunk = (funderContact: FunderContacts) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectFunder>(`${url}/FunderContacts/UpdateFunderContact`, funderContact, { headers });
    dispatch(setUpdatedFunderContact(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const disableFunderContactThunk = (funderContact: FunderContacts) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectFunder>(`${url}/FunderContacts/EnableFunderContact?id=${funderContact.id}&value=${funderContact.isDeleted}`, {}, { headers });
    dispatch(setDeletedFunderContact(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const createFunderContactInProjectThunk = (funderContactId: number, projectId: number) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<FunderContacts>(`${url}/FunderContactsInProjects/CreateFunderContactsInProjects?funderContactId=${funderContactId}&projectId=${projectId}`, {}, { headers });
    dispatch(setCreatedFunderContactInProject(data));
    setTimeout(() =>
      dispatch(resetCreatedFunderContactInProject())
      , 3000);
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}
