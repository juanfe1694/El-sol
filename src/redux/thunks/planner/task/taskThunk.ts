//Redux
import { Dispatch } from "redux";
//Axios
import axios from "axios";
//Reducer: taskSlice.ts
import {
  error,
  fetchChangeStateById,
  resetFetchChangeStateById,
  fetchTaskById,
  setCreateTask,
  setTasks,
  startLoading,
  setReplicatedTask,
  resetReplicatedTask,
  resetErrorState,
  setReplicatingErrorTask,
  reSetReplicatingErrorTask,
  setUpdateTask,
  tasksToLinkStartLoading,
  fetchTask,
  setRelatedTasks,
  resetTaskRelated,
  fetchTaskByIdDetail,
  fetchSubTaskByIdDetail,
  startLoadingSubtasks,
  startLoadingTask,
  taskToLinkError,
  resetTaskToLinkError,
  errorSearcherTask,
  resetErrorSearcherTask,
  setDeletedTask,
  resetDeletedTask,
  setDeletedSubTask,
} from "../../../slices/planner/task/taskSlice";
//Interfaces
import {
  TaskI,
  CreatorTask,
  FetchAproveTask,
  ReplicateTask,
  UpdateTaskI,
  linkTaskToMilestone,
  FetchResponseTasks,
  TaskInOuterMilestonesRequest,
  TasksInOuterMilestones,
  GetTaskListWithoutLazy,
} from "../../../../interfaces/planner/task/taskInterface";
//Reducer: generalStatesSlice.ts
import { Lazy } from "../../../../interfaces/functionalInterfaces";
import {
  startLoadingShare,
  stopLoadingShare,
} from "../../../slices/planner/share/shareSlice";

import { resetError } from "../../../slices/planner/workflow/workflowSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

//get the url from the .env file
const urlWorkFlow = process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage

//*Tasks:
//get all Task from the API - se utiliza para el listado de tareas
export const fetchTaskThunk =
  (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {

      dispatch(startLoading());
      dispatch(startLoadingSubtasks());
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetAllTasks`,
        lazyLoad,
        { headers }
      );
      dispatch(setTasks(data));
      return data;
    } catch (err: any) {
      dispatch(errorSearcherTask(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorSearcherTask());
      }, 1000);
      return;
    }
  };

//get all Task from the API - se utiliza para el listado de tareas
export const fetchTaskListThunk =
  (lazyLoad: Lazy, projectId: string) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {

      dispatch(startLoading());
      dispatch(startLoadingSubtasks());
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetAllTasks?showBookmarksOnly=false&milestoneId=0&projectId=${projectId}`,
        lazyLoad,
        { headers }
      );
      dispatch(setTasks(data));
      return data;
    } catch (err: any) {
      dispatch(errorSearcherTask(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorSearcherTask());
      }, 1000);
      return;
    }
  };

//get all Task from the API - se utiliza para el listado de tareas
export const fetchTaskListThunkWithoutLazy =
  (body: GetTaskListWithoutLazy) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };
    

    try {

      

      dispatch(startLoading());
      dispatch(startLoadingSubtasks());
      
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetTasksNoLazyLoad`,
        body,
        { headers }
      );
      dispatch(setTasks(data));
      return data;
    } catch (err: any) {
      dispatch(errorSearcherTask(err?.response?.data));
      console.error(err)
      setTimeout(() => {
        dispatch(resetErrorSearcherTask());
      }, 5000);
      return;
    }
  };


//*Tasks: retorno las tareas que son favoritas
export const fetchTasksFavoriteThunk =
  (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      dispatch(startLoadingSubtasks());
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetAllTasks?showBookmarksOnly=true`,
        lazyLoad,
        { headers }
      );
      dispatch(setTasks(data));
      return data;
    } catch (err: any) {
      dispatch(errorSearcherTask(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorSearcherTask());
      }, 1000);
      return;
    }
  };

//*Tasks: retornar las tareas conectadas

export const fetchTaskConnectedThunk =
  (lazyLoad: Lazy, milestoneId: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      dispatch(startLoadingSubtasks());
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetAllTasks?milestoneId=${milestoneId}`,
        lazyLoad,
        { headers }
      );
      dispatch(setTasks(data));
    } catch (err: any) {
      dispatch(errorSearcherTask(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorSearcherTask());
      }, 1000);
      return;
    }
  };


export const fetchTasksToLinkThunk =
  (lazyLoad: Lazy) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {

      dispatch(tasksToLinkStartLoading());
      let { data } = await axios.post<FetchResponseTasks>(
        `${urlWorkFlow}/Task/GetAllTasks`,
        lazyLoad,
        { headers }
      );
      dispatch(fetchTask(data));
      return data;
    } catch (err: any) {
      dispatch(taskToLinkError(err?.response?.data));
      setTimeout(() => {
        dispatch(resetTaskToLinkError());
      }, 1000);
      return err;
    }
  };

//* Create Task
//Crear Tarea
export const createTaskThunk =
  (body: CreatorTask) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    /* const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() } */

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // en milisegundos
    const plannedStartDateAdjusted = new Date(
      body.plannedStartDate.getTime() - timezoneOffset
    ).toISOString();
    const plannedEndDateAdjusted = new Date(
      body.plannedEndDate.getTime() - timezoneOffset
    ).toISOString();

    const dataBody = {
      ...body,
      plannedStartDate: plannedStartDateAdjusted,
      plannedEndDate: plannedEndDateAdjusted,
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      //dispatch(startLoading())
      let data = await axios.post(`${urlWorkFlow}/Task/CreateTask`, dataBody, {
        headers,
      });
      dispatch(setCreateTask());
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

//* Update Task
//Actualiza la tarea en el planner general
export const updateTaskThunk =
  (body: UpdateTaskI) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    /* const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() } */

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // en milisegundos
    const plannedStartDateAdjusted = new Date(
      body.plannedStartDate.getTime() - timezoneOffset
    );
    const plannedEndDateAdjusted = new Date(
      body.plannedEndDate.getTime() - timezoneOffset
    );
    const dataBody = {
      ...body,
      plannedStartDate: plannedStartDateAdjusted.toISOString(),
      plannedEndDate: plannedEndDateAdjusted.toISOString(),
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      //dispatch(startLoadingTask())
      await axios.put(`${urlWorkFlow}/Task/UpdateTask`, dataBody, { headers });
      dispatch(setUpdateTask());
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);

      return;
    }
  };

// se usa en el detalle de la tarea para acutalizar la tarea(en richText), solo actualiza la descripcion
export const updateTaskThunkDetail =
  (body: UpdateTaskI) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    /* const dataBody = { ...body, plannedStartDate: body.plannedStartDate.toISOString(), plannedEndDate: body.plannedEndDate.toISOString() } */

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // en milisegundos
    const plannedStartDateAdjusted = new Date(
      body.plannedStartDate.getTime() - timezoneOffset
    );
    const plannedEndDateAdjusted = new Date(
      body.plannedEndDate.getTime() - timezoneOffset
    );
    const dataBody = {
      ...body,
      plannedStartDate: plannedStartDateAdjusted.toISOString(),
      plannedEndDate: plannedEndDateAdjusted.toISOString(),
    };

    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingTask());
      let { data } = await axios.put(
        `${urlWorkFlow}/Task/UpdateTask`,
        dataBody,
        { headers }
      );
      dispatch(setUpdateTask(data));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);

      return;
    }
  };

//*Se usa en detalle de tarea para traer la data de la tarea
export const fetchTaskByIdThunk =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      // dispatch(setCaseFamilyIsLoading())
      //dispatch(startLoading());
      // dispatch(startLoadingShare())
      dispatch(startLoadingTask());
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, {
        headers,
      });
      dispatch(fetchTaskById(data[0]));
      return data;
      // dispatch(stopLoadingShare())
      //dispatch(setStopCaseFamilyIsLoading())
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

//*Se usa para depsues de actualziar una tarea en detalle de task para evitar un recarga en el estado de loading de case family
export const fetchTaskByIdThunkCaseFamily =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingTask());
      dispatch(startLoading());
      dispatch(startLoadingShare());
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, {
        headers,
      });
      dispatch(fetchTaskById(data[0]));
      dispatch(stopLoadingShare());
      //dispatch(setStopCaseFamilyIsLoading())
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

//Se usa en detalle de tarea para actualizar solo la  description (rich text)
export const fetchTaskByIdToUpdate =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoadingTask());
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, {
        headers,
      });
      dispatch(fetchTaskByIdDetail(data[0]));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

export const fetchTaskByIdThunkDetail =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, {
        headers,
      });
      dispatch(fetchTaskByIdDetail(data[0]));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

export const fetchSubTaskByIdThunkDetail =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      let { data } = await axios.get<TaskI[]>(`${urlWorkFlow}/Task/${id}`, {
        headers,
      });
      dispatch(fetchSubTaskByIdDetail(data[0]));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

/**
 * This is a TypeScript function that sends a PUT request to change the state of a task and dispatches
 * actions based on the response.
 * @param {FetchAproveTask} body - The `body` parameter is an object of type `FetchAproveTask` which
 * contains two properties: `taskId` and `state`. These properties are used to make a PUT request to
 * change the state of a task.
 * @returns a Promise that resolves to undefined.
 */
export const fetchChangeTaskStateThunk =
  (body: FetchAproveTask) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      let { data } = await axios.put<TaskI>(
        `${urlWorkFlow}/Task/ChangeTaskState?taskid=${body.taskId}&stateid=${body.state}`,
        "",
        { headers }
      );
      dispatch(fetchChangeStateById(data));
      setTimeout(() => {
        dispatch(resetFetchChangeStateById());
      }, 1000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };

//* Replicate Task

export const replicateTaskThunk =
  (taskId: number | string) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      let { data } = await axios.post<ReplicateTask>(
        `${urlWorkFlow}/ReplicateWorkFlows/ReplicateTask?taskId=${taskId}`,
        null,
        { headers }
      );

      dispatch(setReplicatedTask(data.tasks));

      setTimeout(() => {
        dispatch(resetReplicatedTask());
      }, 2000);
    } catch (err: any) {
      dispatch(setReplicatingErrorTask(err?.response?.data));
      setTimeout(() => {
        dispatch(reSetReplicatingErrorTask());
      }, 5000);
      return;
    }
  };
/**
 * This is a TypeScript function that assigns a task to a milestone and dispatches actions based on the
 * result.
 * @param {linkTaskToMilestone}  - - `taskid`: the ID of the task to be linked to a milestone
 * @returns nothing (or undefined) as there is no explicit return statement in the function body.
 */

export const asignTaskToMilestoneThunk =
  ({ taskid, milestoneId }: linkTaskToMilestone) =>
    async (dispatch: Dispatch) => {
      const token = await AsyncStorage.getItem("Authorization");
      const headers = {
        "Content-Type": "application/json",
        Accept: "text/plain",
        Authorization: `Bearer ${token}`,
      };

      const relateTaskPayload: TaskInOuterMilestonesRequest = {
        MilestoneId: milestoneId,
        TaskId: taskid,
        ReadOnly: false,
      };

      try {
        dispatch(tasksToLinkStartLoading());
        let { data } = await axios.post<TasksInOuterMilestones>(
          `${urlWorkFlow}/TasksInOuterMilestones/RelateTaskToMilestone`,
          relateTaskPayload,
          { headers }
        );
        dispatch(tasksToLinkStartLoading());
        dispatch(setRelatedTasks(data.task));
        //dispatch(setCreateTask(data.task));
        dispatch(setCreateTask());
        setTimeout(() => {
          dispatch(resetTaskRelated());
        }, 1000);
      } catch (err: any) {
        dispatch(error(err?.response?.data));
        setTimeout(() => {
          dispatch(resetError());
        }, 1000);
        return;
      }
    };

export const deleteTaskThunk = (id: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startLoading());
    let { data } = await axios.put<TaskI[]>(`${urlWorkFlow}/Task/DisableTask?taskId=${id}`, {}, { headers });

    dispatch(setDeletedTask(data[0]));
    setTimeout(() => {
      dispatch(resetDeletedTask());
    }, 2000);
  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorState());
    }, 3000);
    return;
  }
};

export const deleteSubTaskThunk =
  (id: number) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      dispatch(startLoading());
      let { data } = await axios.put<TaskI[]>(`${urlWorkFlow}/Task/DisableTask?taskId=${id}`, {}, { headers });
      dispatch(setDeletedSubTask(data[0]));
      setTimeout(() => {
        dispatch(resetDeletedTask());
      }, 2000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetErrorState());
      }, 3000);
      return;
    }
  };



