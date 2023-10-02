import { Dispatch } from "redux";
import axios from "axios";


import { error, resetState, setFetchItemById, setUserToItem, startLoadingShare, stopLoadingShare } from "../../../slices/planner/share/shareSlice";
import { GlobalAssignee, Milestone, TaskI } from "../../../../interfaces/planner/task/taskInterface";
import { fetchTaskById, fetchTaskByShare, setUpdateTask } from "../../../slices/planner/task/taskSlice";
import { setMilestonesById, setMilestonesByIdShare } from "../../../slices/planner/milestones/milestoneSlice";
import { setIsLoadingWorkflow, setWorkflowById, setWorkflowByIdShare } from "../../../slices/planner/workflow/workflowSlice";
import { WorkFlowI } from "../../../../interfaces/planner/workflow/workflowInterface";
import { Projects } from "../../../../interfaces/planner/projects/projectsInterfaces";
import { setNote } from "../../../slices/planner/notes/notesSlice";
import { Note } from "../../../../interfaces/planner/notes/notesInterface";
import { setIsProjectLoading, setProjectsById, setProjectsByIdShare, setUpdateProject } from "../../../slices/planner/projects/projectsSlice";
import { startLoading } from "../../../slices/planner/milestones/milestoneSlice";





//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;
const urlProject: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;


//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!;

//* Projects:
//get projects from the API
//get the url from the .env file
const urlWorkFlow: string = <string>process.env.VITE_API_URL_WORKFLOW;

//get the token from the local storage


  export const fetchAssignUserToTaskThunk =
  (body:GlobalAssignee) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingShare());
      let { data } = await axios.post<GlobalAssignee>(`${url}/TaskAssignees/AssignTaskManager`,body, { headers });

      // dispatch(setUserToItem(data));
      dispatch(setFetchItemById(data))



      setTimeout(() => {
        dispatch(setFetchItemById(undefined))
      }, 1000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));

      
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

  export const fetchAssignUserToMilestoneThunk =
  (body:GlobalAssignee) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingShare());
      let { data } = await axios.post<GlobalAssignee>(`${url}/MilestonesAssignees`,body, { headers });

      dispatch(setUserToItem(data));

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


  export const fetchAssignUserToWorkFlowThunk =
  (body:GlobalAssignee) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingShare());
      let { data } = await axios.post<GlobalAssignee>(`${url}/WorkFlowAssignee/AssigneeResponsibleWorkFlow`,body, { headers });

      dispatch(setUserToItem(data));

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


  export const fetchAssignUserToProjectThunk =
  (body:GlobalAssignee[]) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingShare());
      let { data } = await axios.post<GlobalAssignee>(`${urlProject}/Project/AssignReadPermissionUser`,body, { headers });

      dispatch(setUserToItem(data));

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

  export const fetchAssignUserToNoteThunk =
  (body:GlobalAssignee) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoadingShare());
      let { data } = await axios.post<GlobalAssignee>(`${url}/NotesAssignees/AssignUserToNote`,body, { headers });

      dispatch(setUserToItem(data));

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


  export const fetchTaskByIdShareThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, { headers });
      dispatch(fetchTaskById(data[0]));
      dispatch(stopLoadingShare())
      // dispatch(setFetchItemById(data[0]))
      // setTimeout(() => {
      //   dispatch(setFetchItemById(undefined));
      // }, 1000);


    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  }


  export const fetchAssignesByTaskIdThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, { headers });
      dispatch(fetchTaskByShare(data[0]));
      dispatch(stopLoadingShare())
      // dispatch(setFetchItemById(data[0]))
      // setTimeout(() => {
      //   dispatch(setFetchItemById(undefined));
      // }, 1000);


    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  }


  export const fetchMilestonesByIdShareThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())

      
      dispatch(startLoading())
      let { data } = await axios.get<Milestone[]>(`${urlWorkFlow}/Milestones/${id}`, { headers });
      dispatch(setMilestonesById(data[0]));
            dispatch(stopLoadingShare())

  
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      dispatch(resetState());
      
      return;
    }
  }

  export const fetchAssignesByMilestoneIdThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
  
      let { data } = await axios.get<Milestone[]>(`${urlWorkFlow}/Milestones/${id}`, { headers });
      dispatch(setMilestonesByIdShare(data[0]));
      dispatch(stopLoadingShare())
  
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      dispatch(resetState());
      
      return;
    }
  }



  export const fetchWorkflowByIdShareThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
      dispatch(setIsLoadingWorkflow())

      let { data } = await axios.get<WorkFlowI[]>(`${urlWorkFlow}/WorkFlow/${id}`, { headers });
      dispatch(setWorkflowById(data[0]));
      dispatch(stopLoadingShare())
  
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  }
  export const fetchAssignesByWorkFlowIdThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
  
      let { data } = await axios.get<WorkFlowI[]>(`${urlWorkFlow}/WorkFlow/${id}`, { headers });
      dispatch(setWorkflowByIdShare(data[0]));
      dispatch(stopLoadingShare())
  
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  }


  export const fetchProjectsByIdShareThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
      dispatch(setIsProjectLoading())

      let { data } = await axios.get<Projects[]>(`${urlProject}/Project/${id}`, { headers });
      dispatch(stopLoadingShare())
      dispatch(setProjectsById(data));
      // dispatch(setUpdateProject(data));


    } catch (err: any) {
      dispatch(error(err?.response?.data));
      //dispatch(resetState());
      return;
    }
  }

  export const fetchAssignesByProjectIdThunk = (id: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
  
    try {
      dispatch(startLoadingShare())
  
      let { data } = await axios.get<Projects[]>(`${urlProject}/Project/${id}`, { headers });
      dispatch(stopLoadingShare())
      dispatch(setProjectsByIdShare(data));

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      //dispatch(resetState());
      return;
    }
  }



  export const fetchGetNotesByIdThunkShare =
  (id:number) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoadingShare())
      let { data } = await axios.get<Note[]>(`${url}/Notes/GetNoteById?id=${id}`, { headers });

      dispatch(setNote(data[0]));

      dispatch(stopLoadingShare())

    } catch (err: any) {
      dispatch(error(err?.response?.data));

      return;
    }
  };


  