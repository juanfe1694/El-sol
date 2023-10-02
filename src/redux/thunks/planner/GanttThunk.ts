import { Dispatch } from "redux";
import axios from "axios";
import {
  FetchGanttProperties,
  GanttI,
} from "../../../interfaces/planner/management/ganttInterfaces";
import { error, setGantt, startLoading,stopLoading } from "../../slices/planner/ganttSlice";

//get the url from the .env file
const url = process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!;

//* Projects:
//get projects from the API
export const fetchGanttThunk =
  (request: FetchGanttProperties) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    let requestType = `requestType=${request.requestType}&`;
    let milestoneId = `milestoneId=${request.milestoneId}&`;
    let workFlowId = `workFlowId=${request.workFlowId}&`;
    let taskId = `taskId=${request.taskId}&`;
    let userId = `userId=${request.userId}&`;

    try {
      dispatch(startLoading());

      let urlFetch = `${url}/GanttInformation?${
        request.requestType ? `${requestType}` : ""
      }${request.milestoneId ? `${milestoneId}` : ""}${
        request.workFlowId ? `${workFlowId}` : ""
      }${request.taskId ? `${taskId}` : ""}${
        request.userId ? `${userId}` : ""
      }`;

      urlFetch = urlFetch.substring(0, urlFetch.length - 1);  
      let { data } = await axios.get<GanttI[]>(urlFetch, { headers });

      dispatch(setGantt(data));
      setTimeout(() => {
        dispatch(stopLoading())
      }, 2000);
      return data;
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  };
