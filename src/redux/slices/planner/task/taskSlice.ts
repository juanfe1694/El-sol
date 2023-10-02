import { createSlice } from "@reduxjs/toolkit";
import { TaskI, FetchResponseTasks, GetTaskListWithoutLazy } from '../../../../interfaces/planner/task/taskInterface';
import { ErrorResponse, Lazy } from '../../../../interfaces/functionalInterfaces';


type InitialState = {
  task: TaskI,
  tasks: FetchResponseTasks,
  isTaskFavorite: boolean,
  isTaskFavoriteDetail: boolean,
  isSubTaskFavorite: boolean,
  isTaskConnected: boolean,
  tasksToLink: FetchResponseTasks,
  taskDetail: TaskI,
  updateTask: boolean,
  lazyTask: Lazy,
  lazyTaskDetail: Lazy,
  lazySubTask: Lazy,
  createTask: TaskI,
  replicatedTask: TaskI[],
  taskRelated: TaskI,
  taskFiltered: TaskI[],
  changeStateFetch?: TaskI,
  isLoading: boolean,
  tasksToLinkIsLoading: boolean,
  isFiltered: boolean,
  error: ErrorResponse;
  errorSearcherTask: ErrorResponse;
  replicatingError: ErrorResponse;
  taskToLinkError: ErrorResponse;
  isCreateTask: boolean;
  loadingSubtasks: boolean;
  loadingTask: boolean;
  deletedTask: TaskI;
  deletedSubTask: TaskI;
  bodyGetTaskWitoutLazy: GetTaskListWithoutLazy;
}

const initialState: InitialState = {
  task: ({} as TaskI),
  isTaskFavorite: false,
  isTaskFavoriteDetail: false,
  isSubTaskFavorite: false,
  isTaskConnected: false,
  tasksToLink: ({} as FetchResponseTasks),
  taskDetail: ({} as TaskI),
  tasks: ({} as FetchResponseTasks),
  updateTask: false,
  isCreateTask: false,
  lazyTask: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
  lazyTaskDetail: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
  lazySubTask: {
    rows: 5,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc",
      },
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals",
      },
      {
        field: "inactive",
        value: "false",
        matchMode: "equals",
      }
    ],
  },
  createTask: {} as TaskI,
  replicatedTask: [],
  taskRelated: {} as TaskI,
  taskFiltered: [],
  isLoading: false,
  tasksToLinkIsLoading: false,
  isFiltered: false,
  error: {},
  errorSearcherTask: {},
  taskToLinkError: {},
  replicatingError: {},
  loadingSubtasks: false,
  loadingTask: false,
  deletedTask: {} as TaskI,
  deletedSubTask: {} as TaskI,
  bodyGetTaskWitoutLazy: {
    milestoneId: 0,
    showBookmarksOnly: false,
    createdInitialDate: null,
    createdFinalDate: null,
    assignedUserId: [],
    state: 0,
    taskId: 0,
    nameTask: ""
  },
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {

    //*Get Tasks for the searcher Task
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.loadingSubtasks = false;
      //state.error = {};
      state.isCreateTask = false;
      state.updateTask = false;
    },

    //*Estado boolena para traer los favoritos
    setFavoriteTasks: (state, action) => {
      state.isTaskFavorite = action.payload;
    },

    setFavoriteTasksDetail: (state, action) => {
      state.isTaskFavoriteDetail = action.payload;
    },

    SetIsSubTaskFavorite: (state, action) => {
      state.isSubTaskFavorite = action.payload;
    },



    //*Estado boolena para traer los conectados
    setConnectedTask: (state, action) => {
      state.isTaskConnected = action.payload;
    },

    //*Get Task by Id
    fetchTaskById: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
      state.loadingTask = false;
      state.isCreateTask = false;
      state.updateTask = false;
    },

    fetchTaskByShare: (state, action) => {
      state.task = action.payload;

    },
    fetchTaskDetail: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
    },

    //*Crear Tarea
    setCreateTask: (state) => {
      //state.tasks = [...state.tasks, action.payload];
      //state.createTask = action.payload;
      state.isLoading = false;
      state.isCreateTask = true;
      state.updateTask = false;
    },

    //*Update Task
    setUpdateTask: (state) => {
      state.isLoading = false;
      state.updateTask = true;
      state.isCreateTask = false;
      state.loadingSubtasks = false;
    },

    //*Error task
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.tasksToLinkIsLoading = false;
      state.loadingSubtasks = false;
      state.loadingTask = false;
    },

    //*Error task reset
    resetErrorState: (state) => {
      state.error = {};
    },


    //*Error task searcher
    errorSearcherTask: (state, action) => {
      state.errorSearcherTask = action.payload;
      state.isLoading = false;
      state.tasksToLinkIsLoading = false;
      state.loadingSubtasks = false;
    },

    //*Error task searcher reset
    resetErrorSearcherTask: (state) => {
      state.errorSearcherTask = {};
      state.isLoading = false;
      state.tasksToLinkIsLoading = false;
      state.loadingSubtasks = false;
    },

    //*Reset tasks state
    setResetTasks: (state) => {
      state.tasks = {} as FetchResponseTasks;
    },

    //*Reset task state
    setResetTask: (state) => {
      state.task = {} as TaskI;
    },

    resetState: (state) => {
      state.createTask = {} as TaskI;
      state.taskRelated = {} as TaskI;
      state.error = {};
      state.replicatingError = {};
      state.isLoading = false;
      state.tasksToLinkIsLoading = false;
      state.tasks = {} as FetchResponseTasks;
      state.replicatedTask = [];
      state.tasksToLink = {} as FetchResponseTasks;
      state.deletedTask = {} as TaskI;
      state.deletedSubTask = {} as TaskI;
    },

    resetDeletedTask: (state) => {
      state.deletedTask = {} as TaskI;
      state.deletedSubTask = {} as TaskI;
    },

    resetTaskRelated: (state) => {
      state.taskRelated = {} as TaskI;
      state.tasksToLinkIsLoading = false;
    },



    setReplicatedTask: (state, action) => {
      state.replicatedTask = action.payload;
      //state.tasks.data.concat(state.replicatedTask);
      state.isLoading = false;
    },

    resetReplicatedTask: (state) => {
      state.replicatedTask = [];
    },

    setReplicatingErrorTask: (state, action) => {
      state.replicatingError = action.payload;
    },
    reSetReplicatingErrorTask: (state) => {
      state.replicatingError = {};
    },

    setRelatedTasks: (state, action) => {
      state.taskRelated = action.payload;
      state.tasksToLinkIsLoading = false;
    },


    fetchTaskByIdDetail: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
      state.loadingTask = false;
    },
    fetchSubTaskByIdDetail: (state, action) => {
      state.taskDetail = action.payload;
      state.isLoading = false;
    },

    fetchChangeStateById: (state, action) => {
      state.changeStateFetch = action.payload;
      state.isLoading = false;
    },

    resetFetchChangeStateById: (state) => {
      state.changeStateFetch = undefined;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.isCreateTask = false;
    },

    startLoadingTask: (state) => {
      state.loadingTask = true;
    },

    startLoadingSubtasks: (state) => {
      state.loadingSubtasks = true;
    },

    tasksToLinkStartLoading: (state) => {
      state.tasksToLinkIsLoading = true;
    },

    setFilteredUsersTask: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    },

    fetchTask: (state, action) => {
      state.tasksToLink = action.payload;
      state.tasksToLinkIsLoading = false;
    },

    taskToLinkError: (state, action) => {
      state.taskToLinkError = action.payload;
      state.tasksToLinkIsLoading = false;
    },

    resetTaskToLinkError: (state) => {
      state.taskToLinkError = {};
    },





    setDeletedTask: (state, action) => {
      state.deletedTask = action.payload;
      state.isLoading = false;
    },

    setDeletedSubTask: (state, action) => {
      state.deletedSubTask = action.payload;
      state.isLoading = false;
    },

    //*Onchange lazy
    setOnChangeLazy: (state, action) => {
      state.lazyTask = action.payload;
    },

    setOnChangeTaskLazyDetail: (state, action) => {
      state.lazyTaskDetail = action.payload;
    },

    setOnChangeSubTaskLazy: (state, action) => {
      state.lazySubTask = action.payload;
    },

    //without lazy
     setOnChangebodyGetTask: (state, action) => {
      state.bodyGetTaskWitoutLazy = action.payload
    },

  }
});

// Action creators are generated for each case reducer function
export const { setTasks,
  setFavoriteTasks,
  setFavoriteTasksDetail,
  SetIsSubTaskFavorite,
  setConnectedTask,
  errorSearcherTask,
  resetErrorSearcherTask,
  setResetTasks,
  setResetTask,
  resetState,
  setCreateTask,
  setReplicatedTask,
  fetchTaskById,
  fetchChangeStateById,
  resetFetchChangeStateById,
  resetTaskToLinkError,
  taskToLinkError,
  startLoading,
  startLoadingTask,
  startLoadingSubtasks,
  error,
  setReplicatingErrorTask,
  reSetReplicatingErrorTask,
  resetErrorState,
  setFilteredUsersTask,
  resetReplicatedTask,
  fetchTaskByIdDetail,
  fetchSubTaskByIdDetail,
  resetTaskRelated,
  setRelatedTasks,
  setUpdateTask,
  tasksToLinkStartLoading,
  fetchTask,
  setDeletedTask,
  fetchTaskByShare,
  fetchTaskDetail,

  resetDeletedTask,
  setDeletedSubTask,
  //Lazy
  setOnChangeLazy,
  setOnChangeTaskLazyDetail,
  setOnChangeSubTaskLazy,
  //without lazy
  setOnChangebodyGetTask


} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;