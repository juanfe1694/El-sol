import { Dispatch } from "redux";
import axios from 'axios';
import { ProjectFunder } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { resetError, setCreatedFunder, setDeletedFunder, setEditedFunder, setError, setFunders, startLoading, stopLoading } from "../../../slices/planner/projects/projectFunderSlice";
import { Lazy } from "../../../../interfaces/functionalInterfaces";
//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!

//get Funders from the API
export const fetchProjectFundersThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<ProjectFunder[]>(`${url}/ProjectFunder/GetProjectsFunders`, lazyLoad, { headers });
    dispatch(setFunders(data));
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
 * @param {string} funderName - string - the name of the funder
 * @returns The return type is ProjectFunder.
 */

export const createProjectFunderThunk = (funderName: string) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<ProjectFunder>(`${url}/ProjectFunder?funderName=${funderName}`, {}, { headers });
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

export const updateProjectFunderThunk = (funder: ProjectFunder) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectFunder>(`${url}/ProjectFunder`, funder, { headers });
    dispatch(setEditedFunder(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const disableProjectFunderThunk = (funder: ProjectFunder) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.put<ProjectFunder>(`${url}/ProjectFunder/changeFunderState`, funder, { headers });
    dispatch(setDeletedFunder(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}
