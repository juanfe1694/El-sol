import { Dispatch } from "redux";
import axios from "axios";

import { error, resetState } from "../../../slices/planner/share/unShareSlice";
import { GlobalAssignee } from "../../../../interfaces/planner/task/taskInterface";
import { setFetchItemById, startLoadingShare, stopLoadingShare } from "../../../slices/planner/share/shareSlice";

//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;
const urlProject: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!;

export const removeTaskAssigneeThunk =
  (taskId: number, userId: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
    dispatch(startLoadingShare());

      let { data } = await axios.delete<GlobalAssignee>(
        `${url}/TaskAssignees/DeleteTaskAssignees`,
        {
          headers,
          data: {
            taskId,
            userId,
          },
        }
      );

      dispatch(setFetchItemById(data));

      setTimeout(() => {
        dispatch(setFetchItemById(undefined));
      }, 1000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const removeMilestoneAssigneeThunk =
  (milestoneId: number, userId: number) => async (dispatch: Dispatch) => {

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingShare());

      let { data } = await axios.delete<GlobalAssignee>(
        `${url}/MilestonesAssignees/DeleteMilestoneAssignees`,
        {
          headers,
          data: {
            milestoneId,
            userId,
          },
        }
      );
      dispatch(stopLoadingShare());


    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const removeWorkflowAssigneeThunk =
  (workFlowId: number, userId: number) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingShare());

      let { data } = await axios.delete<GlobalAssignee>(
        `${url}/WorkFlowAssignee/DeleteWorkFlowAssignees`,
        {
          headers,
          data: {
            workFlowId,
            userId,
          },
        }
      );
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const removeProjectAssigneeThunk =
  (projectId: number, userId: number) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingShare());

      let { data } = await axios.delete<GlobalAssignee>(
        `${urlProject}/UserInProjects/DeleteProjectsAssignees`,
        {
          headers,
          data: {
            projectId,
            userId,
          },
        }
      );
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };

export const removeNoteAssigneeThunk =
  (noteId: number, userId: number) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingShare());

      let { data } = await axios.delete<GlobalAssignee>(
        `${url}/NotesAssignees/DeleteAssignUserToNote`,
        {
          headers,
          data: {
            noteId,
            userId,
          },
        }
      );
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };
