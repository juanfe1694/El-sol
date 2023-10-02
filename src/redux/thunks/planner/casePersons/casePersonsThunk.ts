//Redux
import { Dispatch } from "redux";
//Axios
import axios from 'axios';
//Reducer: taskSlice.ts
//Interfaces
import { Lazy } from '../../../../interfaces/functionalInterfaces';
import { FetchResponseCaseFamily } from '../../../../interfaces/planner/caseFamilyPerson/caseFamilyPersonInterface';
import { errorCasePersons, isLoadingCasePersons, resetErrorCasePersons, setCasePersons } from "../../../slices/planner/casePersons/casePersonsSlice";



const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;
const token: string = localStorage.getItem("Authorization")!


//* Case Family Person
export const fetchCasePersons = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingCasePersons())
    let { data } = await axios.post<FetchResponseCaseFamily>(`${urlWorkFlow}/CasePersons/GetAllCasePersons`, lazyLoad, { headers });
    dispatch(setCasePersons(data))

  } catch (err: any) {
    dispatch(errorCasePersons(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorCasePersons())
    }, 3000)
    return;
  }
}


