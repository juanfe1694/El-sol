//Redux
import { Dispatch } from "redux";
//Axios
import axios from 'axios';
//Workflow slice
import { error, resetReplicatedWorkflow, resetReplicatingError, resetState, setBookMark, setCreateWorkflow, setDeleteBookMark, setListBookMark, setReplicatedWorkflow, setReplicatingError, setParentWorkflowById, setUpdateWorkflow, setWorkflowById, setWorkflows, startLoadingWorkflow, startLoadingDetailProject, startLoadingSearch, setIsLoadingWorkflow, resetError, errorBookMarks, resetErrorBookMarks, startLoadingBoomark, setDeletedWorkflow } from "../../../slices/planner/workflow/workflowSlice";
//Interfaces
import { ToBookMark, CardProps } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { WorkFlowI, CreatorWorkFlow, UpdateWorkflowI, FetchResponseWorkflows } from '../../../../interfaces/planner/workflow/workflowInterface';
//General slice
import { User } from "../../../../interfaces/admin/userInterfaces";
import { Lazy } from '../../../../interfaces/functionalInterfaces';
import AsyncStorage from "@react-native-async-storage/async-storage";

//get the url from the .env file
const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage


//*Worflows:
export const fetchWorkflowThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingWorkflow())
    let { data } = await axios.post<FetchResponseWorkflows>(`${urlWorkFlow}/WorkFlow/GetAllWorkFlows`, lazyLoad, { headers });
    dispatch(setWorkflows(data));
    return data;

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
      console.log("holi error y reset")
    }, 3000);
    return err;
  }
}

//*Worflows: traerme los workflwos que son favoritos
export const fetchWorkflowFavoriteThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflow())
    let { data } = await axios.post<FetchResponseWorkflows>(`${urlWorkFlow}/WorkFlow/GetAllWorkFlows?showBookmarksOnly=true`, lazyLoad, { headers });
    dispatch(setWorkflows(data));
    return data;
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return err;
  }
}

//*WorkFlow from detail project
export const fetchWorkflowDetailProjectThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingDetailProject())
    dispatch(setIsLoadingWorkflow())
    let { data } = await axios.post<FetchResponseWorkflows>(`${urlWorkFlow}/WorkFlow/GetAllWorkFlows`, lazyLoad, { headers });
    dispatch(setWorkflows(data));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}

export const fetchWorkflowDetailProjectFavoriteThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingDetailProject())
    dispatch(setIsLoadingWorkflow())
    let { data } = await axios.post<FetchResponseWorkflows>(`${urlWorkFlow}/WorkFlow/GetAllWorkFlows?showBookmarksOnly=true`, lazyLoad, { headers });
    dispatch(setWorkflows(data));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}

//*get WorkFlows by id from the API
export const fetchWorkflowByIdThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsLoadingWorkflow())
    dispatch(startLoadingSearch())

    let { data } = await axios.get<WorkFlowI[]>(`${urlWorkFlow}/WorkFlow/${id}`, { headers });
    
    dispatch(setWorkflowById(data[0]));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}


//*Traerme padre del workflow
export const fetchParentWorkflowByIdThunk = (workflowParentId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    let { data } = await axios.get<WorkFlowI[]>(`${urlWorkFlow}/WorkFlow/${workflowParentId}`, { headers });
    dispatch(setParentWorkflowById(data[0]));
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}


//*Create WorkFlow:
export const createWorkFlowThunk = (body: CreatorWorkFlow) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() }

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingWorkflow())
    let data = await axios.post(`${urlWorkFlow}/WorkFlow`, dataBody, { headers });
    dispatch(setCreateWorkflow());
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}

//*Update WorkFlow:
export const updateWorkflowThunk = (body: UpdateWorkflowI) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() }

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {
    await axios.put(`${urlWorkFlow}/WorkFlow`, dataBody, { headers });
    dispatch(setUpdateWorkflow());

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}

//get List favorite projects from the API
export const fetchBookMarkThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingBoomark())
    let { data } = await axios.get<User>(`${urlWorkFlow}/Bookmark?userId=${id}`, { headers });
    dispatch(setListBookMark(data));


  } catch (err: any) {
    dispatch(errorBookMarks(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorBookMarks())
    }, 3000);
    return;
  }
}



//*Bookmark:
//set the project to favorite
export const setBookMarkThunk = (body: ToBookMark) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingBoomark())
    let { data } = await axios.post(`${urlWorkFlow}/Bookmark`, body, { headers });
    dispatch(setBookMark(data));
  } catch (err: any) {
    dispatch(errorBookMarks(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorBookMarks())
    }, 3000);
    return;
  }
}

//delete the project from favorite
export const deleteBookMarkThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    let { data } = await axios.delete(`${urlWorkFlow}/Bookmark/${id}`, { headers });
    //dispatch(startLoadingBoomark(data.id));
  } catch (err: any) {
    dispatch(errorBookMarks(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorBookMarks())
    }, 3000);
    return;
  }
}

export const replicateWorkflow = (workflowId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingWorkflow())
    let { data } = await axios.post(
      `${urlWorkFlow}/ReplicateWorkFlows/ReplicateWorkflow?WorkFlowId=${workflowId}`,
      null,
      { headers });

    if (data.workFlows) {

      dispatch(setReplicatedWorkflow(data.workFlows));
    } else {

      dispatch(setReplicatingError(data));
      setTimeout(() => {
        dispatch(resetReplicatingError());
      }, 3000);
    }

    setTimeout(() => {
      dispatch(resetReplicatedWorkflow());
    }, 3000);

  } catch (err: any) {
    dispatch(setReplicatingError(err?.response?.data));
    setTimeout(() => {
      dispatch(resetReplicatingError());
    }, 3000);
    return;
  }
}

export const deletehWorkflowThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingWorkflow())
    let { data } = await axios.put<WorkFlowI>(`${urlWorkFlow}/WorkFlow/DisableWorkFlow?workFlowId=${id}`, {}, { headers });
    dispatch(setDeletedWorkflow(data));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetError())
    }, 3000);
    return;
  }
}

