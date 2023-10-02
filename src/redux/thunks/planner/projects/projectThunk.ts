import { Dispatch } from "redux";
import axios from 'axios';
import { startLoading, setProjects, error, setCreateProject, setProjectsById, resetState, setUpdateProject, setOrganizationalDiagram, setProjectBanner, searchStartLoading, setIsProjectLoading, setProjectIdWorkflow, resetError, setUpdatedProject, setFundersProject, setInitiative, setProjectAssignees, reSetProjectAssignees, setDeletedProject } from "../../../slices/planner/projects/projectsSlice";
import { FetchResponseProjects, ProjectCreate, ProjectUpdate, Projects } from '../../../../interfaces/planner/projects/projectsInterfaces';
import { Lazy } from '../../../../interfaces/functionalInterfaces';
import { startLoadingShare, stopLoadingShare } from "./../../../slices/planner/share/shareSlice";
import { setIsLoadingWorkflow } from "../../../slices/planner/workflow/workflowSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage

//* Projects:
export const fetchProjectsByIdThunk = (id: number) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsProjectLoading())
    dispatch(setIsLoadingWorkflow())
    dispatch(startLoadingShare())

    let { data } = await axios.get<Projects>(`https://projectservicesapp.azurewebsites.net/api/Project/${id}`, { headers });
    dispatch(setProjectsById(data));
    dispatch(stopLoadingShare())

  } catch (err: any) {
    
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

//Traer el projecto por id, despues de actualzar el proyecto
export const fetchProjectsByIdInUpdateThunk = (id: number) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(setIsProjectLoading())
    let { data } = await axios.get<Projects>(`https://projectservicesapp.azurewebsites.net/api/Project/${id}`, { headers });
    dispatch(setProjectsById(data));
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}


//*get projects from the API - Listado
export const fetchProjectsThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.post<FetchResponseProjects>(`https://projectservicesapp.azurewebsites.net/api/Project/GetProjects`, lazyLoad, { headers });
    dispatch(setProjects(data));
    return data;
  } catch (err: any) {
    
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return err;
  }
}

export const fetchProjectIdWorkflowThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.post<Projects[]>(`https://projectservicesapp.azurewebsites.net/api/Project/GetProjects`, lazyLoad, { headers });
    dispatch(setProjectIdWorkflow(data));
    return (data);
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return err;
  }
}

//*Update Project:
export const updateProjectThunk = (body: ProjectUpdate) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");


  const dataBody = {
    ...body,
    plannedStartDate: body.plannedStartDate.toISOString(),
    plannedEndDate: body.plannedEndDate.toISOString()
  }


  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {
    let { data } = await axios.put(`https://projectservicesapp.azurewebsites.net/api/Project`, dataBody, { headers });

    dispatch(setUpdateProject(data));
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

//*Set Organizational Diagram:

const tokemPexels = "aEeEE8eDWCuDOv6EFYv4pDuGfuZn2akUx6koXtaG8r2yBXsoWiSBeIpV";
const urlPexels = "https://api.pexels.com/v1/search/?page=1&per_page=1&query=cat";
const urlPexels2 = "https://api.pexels.com/v1/search/?page=2&per_page=1&query=cat";

export const organizationDiagramThunk = () => async (dispatch: Dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${tokemPexels}`,
  };

  try {
    const response = await axios.get(`${urlPexels}`, { headers });
    const imageUrl = response.data?.photos?.[0]?.src?.medium || "";
    dispatch(setOrganizationalDiagram(imageUrl));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

//*Set Project Banner:
export const projectBannerThunk = () => async (dispatch: Dispatch) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${tokemPexels}`,
  };

  try {
    const response = await axios.get(`${urlPexels2}`, { headers });
    const imageUrl = response.data?.photos?.[0]?.src?.medium || "";
    dispatch(setProjectBanner(imageUrl));

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}



//*Create a new project / and his workflows
export const createProjectThunk = (body: ProjectCreate) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() }

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.post(`${url}/Project`, dataBody, { headers });

    dispatch(setCreateProject());

    //Create the workflows
    const workflowTypes = ["2", "3", "4", "5"];

    workflowTypes.forEach(async (workflowType) => {
      const WorkflowData = {
        //Data from the project
        workFlowParentId: data.workFlowId,
        title: "Workflow",
        description: data.description,
        stateId: "1",
        priorityId: "1",
        workFlowTypeId: workflowType,
        plannedStartDate: dataBody.plannedStartDate,
        plannedEndDate: dataBody.plannedEndDate,
      };

      let workflow = await axios.post(`${urlWorkFlow}/WorkFlow`, WorkflowData, { headers });
    })


  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}



//*Get  Funders Project:
export const fetchFundersThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {

    dispatch(startLoading())
    let { data } = await axios.post(`https://projectservicesapp.azurewebsites.net/api/ProjectFunder/GetProjectsFunders`, lazyLoad, { headers });
    dispatch(setFundersProject(data));
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}


//*Get  Project assignees:
export const fetchProjectAssigneesThunk = (projectId : number) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {

    dispatch(startLoading())
    let { data } = await axios.get(`${url}/UserInProjects/GetUsersInProjectByProjectId?id=${projectId}`, { headers });
    dispatch(setProjectAssignees(data));
    return data;
  } catch (err: any) {

    setTimeout(() =>
      dispatch(reSetProjectAssignees())
      , 3000);
    return;
  }
}


export const DeleteProjectThunk = (id: number) => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.delete<Projects>(`https://projectservicesapp.azurewebsites.net/api/Project/${id}`, { headers });
    dispatch(setDeletedProject(data));
    setTimeout(() =>
      dispatch(resetState())
      , 3000);
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() =>
      dispatch(resetError())
      , 3000);
    return;
  }
}

export const fetchUserProjectsThunk = () => async () => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    let { data } = await axios.get<Projects[]>(`${url}/Project/GetProjectByUserInSession`, { headers });
    return (data);
  } catch (err: any) {
    return err?.response?.data;
  }
}

