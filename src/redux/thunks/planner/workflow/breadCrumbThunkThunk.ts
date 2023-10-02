import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BodyBreadCrumb } from '../../../../interfaces/planner/workflow/breadCrumbInterface';
import { setError,resetError, setBreadCrumb, setIsLoading } from '../../../slices/planner/workflow/breadCrumbSlice';

//get the url from the .env file
const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!


//*List Worflows Types By Id:
export const fetchBreadCrumbThunk = (body: BodyBreadCrumb) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {

    dispatch(setIsLoading())
    let { data } = await axios.post(`${urlWorkFlow}/Breadcrumbs`, body, { headers });
    dispatch(setBreadCrumb(data));
    return data;
  } catch (err: any) {
    dispatch(setError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return err;
  }
}