import { Dispatch } from "redux";
import axios from 'axios';
import { ProjectFunder, ProjectInitiative } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { resetError, setCreatedFunder, setDeletedFunder, setError, setFunders, startLoading, stopLoading } from "../../../slices/planner/projects/projectFunderSlice";
import { Lazy } from "../../../../interfaces/functionalInterfaces";
import { setCreatedInitiative, setDeletedInitiative, setInitiatives } from "../../../slices/planner/projects/projectInitiativeSlice";
//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!

//get Funders from the API
export const fetchProjectInitiativesThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<ProjectInitiative[]>(`${url}/Initiative/GetInitiative`, lazyLoad, { headers });
    dispatch(setInitiatives(data));
    return data;
  } catch (err: any) {
    dispatch(stopLoading())
    /*dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);*/
    return;
  }
}

/**
 * It's a thunk that dispatches a startLoading action, then makes a post request to the server, then
 * dispatches a setFunders action, and finally returns the data from the post request.
 * @param {string} initiativeName - string - the name of the funder
 * @returns The return type is ProjectFunder.
 */

export const createProjectInitiativeThunk = (initiativeName: string) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<ProjectInitiative>(`${url}/Initiative?initiativeName=${initiativeName}`, {}, { headers });
    dispatch(setCreatedInitiative(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const updateProjectInitiativeThunk = (initiative: ProjectInitiative) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectInitiative>(`${url}/Initiative`, initiative, { headers });
    dispatch(setDeletedInitiative(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const disableProjectInitiativeThunk = (initiative: ProjectInitiative) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectFunder>(`${url}/Initiative/ChangeIsDeletedStateInitiative?id=${initiative.id}&isDeleted=${initiative.isDeleted}`, {}, { headers });
    dispatch(setDeletedInitiative(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}
