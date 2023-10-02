//Redux
import { Dispatch } from "redux";
//Axios
import axios from 'axios';
//General slice
//Milestone slice
import {
  setMilestonesById,
  setMilestones,
  setCreateMilestones,
  startLoading,
  error,
  resetState,
  setReplicatedMilestones,
  resetReplicatedMilestones,
  setReplicatingError,
  reSetReplicatingError, setUpdateMilestones, setParentMilestones, startLoadingParents, setErrorUpdateMilestone, resetErrorUpdate, setDeletedMilestone, resetDeletedMilestone, starLoadingMilestoneById
} from "../../../slices/planner/milestones/milestoneSlice";
//Interfaces
import { Milestone, CreatorMilestone, UpdateMilestoneI, FetchResponseMilestone } from '../../../../interfaces/planner/milestones/milestonesInterface';
import { Lazy } from "../../../../interfaces/functionalInterfaces";
import { startLoadingShare, stopLoadingShare } from "../../../slices/planner/share/shareSlice";
import { startLoadingSearch } from "../../../slices/planner/milestones/milestoneSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

//get the url from the .env file
const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage


//*Milestones:
export const fetchMilestonesThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.post<FetchResponseMilestone>(`${urlWorkFlow}/Milestones/GetAllMilestones`, lazyLoad, { headers });
    dispatch(setMilestones(data));
    return data;

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    return;
  }
}

//*Milestones: traerme los milestones que son favoritos
export const fetchMilestonesFavoriteThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.post<FetchResponseMilestone>(`${urlWorkFlow}/Milestones/GetAllMilestones?showBookmarksOnly=true`, lazyLoad, { headers });
    dispatch(setMilestones(data));
    return data;
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    return;
  }
}

//*Milestones tasks parents:
export const fetchParentMilestonesThunk = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoadingParents())
    let { data } = await axios.post<FetchResponseMilestone>(`${urlWorkFlow}/Milestones/GetAllMilestones`, lazyLoad, { headers });
    dispatch(setParentMilestones(data));
    return (data);

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 3000);

    

    return err;
  }
}



//* Create Milestone

export const createMilestone = (body: CreatorMilestone) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() }

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let data = await axios.post(`${urlWorkFlow}/Milestones`, dataBody, { headers });
    dispatch(setCreateMilestones());

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    return;
  }
}

//* Update Milestone

export const updateMilestoneThunk = (body: UpdateMilestoneI) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() }

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };


  try {
    let data = await axios.put(`${urlWorkFlow}/Milestones`, dataBody, { headers });
    dispatch(setUpdateMilestones());

  } catch (err: any) {
    dispatch(setErrorUpdateMilestone(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorUpdate())
    }, 3000)
    return;
  }
}


//*get Milestones by id from the API
export const fetchMilestonesByIdThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(starLoadingMilestoneById())
    dispatch(startLoadingShare())
    dispatch(startLoadingSearch())

    let { data } = await axios.get<Milestone[]>(`${urlWorkFlow}/Milestones/${id}`, { headers });
    dispatch(setMilestonesById(data[0]));
    dispatch(stopLoadingShare())

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    dispatch(resetState());
    
    return;
  }
}

export const replicateMilestone = (milestoneId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())
    let { data } = await axios.post(
      `${urlWorkFlow}/ReplicateWorkFlows/ReplicateMilestone?MilestoneId=${milestoneId}`,
      null,
      { headers });
    
    dispatch(setReplicatedMilestones(data.milestones));

    setTimeout(() => {
      dispatch(resetReplicatedMilestones());
    }, 3000);

  } catch (err: any) {
    dispatch(setReplicatingError(err?.response?.data));
    setTimeout(() => {
      dispatch(reSetReplicatingError());
    }, 3000);
    return;
  }
}

//*Delete Milestones from the API
export const deleteMilestonesThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading())

    let { data } = await axios.put<Milestone[]>(`${urlWorkFlow}/Milestones/DisableMilestones?milestoneId=${id}`,{}, { headers });
    dispatch(setDeletedMilestone(data[0]));

    setTimeout(() => {
      dispatch(resetDeletedMilestone());
    }, 2000);

  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetState());
    }, 2000);
    
    
    return;
  }
}
