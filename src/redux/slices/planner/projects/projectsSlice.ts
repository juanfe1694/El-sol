import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, Lazy } from '../../../../interfaces/functionalInterfaces';


import {
  FetchResponseProjects,
  Initiative,
  ProjectAssignees,
  ProjectFunders,
  Projects,
} from "../../../../interfaces/planner/projects/projectsInterfaces";

type InitialState = {
  // Array of all projects
  project: Projects;
  projectIdWorkflow: FetchResponseProjects;
  projectPlaceHolder: Projects;
  projects: FetchResponseProjects;
  projectDeleted: Projects;
  isLoading: boolean;
  isLoadingProjectsList: boolean;
  error: ErrorResponse;
  isProjectsFavorite: boolean;
  newProject: boolean;
  createProjects: boolean;
  updateProject: Projects;
  lazyProjects: Lazy,
  // Flags for loading, filtering, and error state
  isLoadingProject: boolean;
  searchIsLoading: boolean;
  isFiltered: boolean;
  projectBanner: string;
  organizationalDiagram: string;
  //
  fundersProject: ProjectFunders[];
  initiative: Initiative[];
  projectAssignees: ProjectAssignees[];
};

const initialState: InitialState = {
  project: ({} as Projects),
  projectPlaceHolder: ({} as Projects),
  organizationalDiagram: "",
  projectBanner: "",
  projects: {} as FetchResponseProjects,
  projectDeleted: {} as Projects,
  isProjectsFavorite: false,
  newProject: false,
  searchIsLoading: false,
  createProjects: false,
  updateProject: {} as Projects,
  lazyProjects: {
    rows: 10,
    page: 1,
    sort: [
      {
        field: "creationDate",
        dir: "desc"
      }
    ],
    filter: [
      {
        field: "isDeleted",
        value: "false",
        matchMode: "equals"
      }
    ]
  },
  isLoading: false,
  isLoadingProjectsList: true,
  isLoadingProject: false,
  isFiltered: false,
  error: {},
  projectIdWorkflow: {} as FetchResponseProjects,
  //Funders
  fundersProject: [{} as ProjectFunders],
  initiative: [{} as Initiative],
  projectAssignees: [],
};

// Create the slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    //* Set the array of all projects
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.searchIsLoading = false;
      state.isLoadingProjectsList = false;
    },

    setResetProjects: (state) => {
      state.projects = {} as FetchResponseProjects;
    },

    //*Estado boleano para los projectos favoritos
    setFavoriteProjects: (state, action) => {
      state.isProjectsFavorite = action.payload;
    },


    //*Project en detail workflow info
    setProjectIdWorkflow: (state, action) => {
      state.projectIdWorkflow = action.payload;
      state.isLoading = false;
    },

    setResetsetProjectIdWorkflow: (state) => {
      state.projectIdWorkflow = {} as FetchResponseProjects;
    },

    setOrganizationalDiagram: (state, action) => {
      state.organizationalDiagram = action.payload;
      state.isLoading = false;
    },

    setProjectBanner: (state, action) => {
      state.projectBanner = action.payload;
      state.isLoading = false;
    },

    setUpdateProject: (state, action) => {
      state.project = action.payload;
      state.updateProject = action.payload;
      state.isLoading = false;
    },
    setProjectsById: (state, action) => {
      state.project = action.payload;
      state.projectPlaceHolder = action.payload;
      state.isLoadingProject = false;
      // state.updateProject = action.payload;

    },
    setProjectsByIdShare: (state, action) => {
      state.project = action.payload;

    },

    //*When project was updated */
    setUpdatedProject: (state, action) => {

      state.updateProject = action.payload;
      state.isLoading = false;
    },


    resetProjectPlaceHolder: (state) => {
      state.projectPlaceHolder = {} as Projects;
    },

    setIsProjectLoading: (state) => {
      state.isLoadingProject = true;
    },

    setResetProject: (state) => {
      state.project = {} as Projects;
      state.isLoading = false;
      state.isLoadingProjectsList = false;
    },

    //* Add a new project to the array of all projects
    setCreateProject: (state) => {
      //state.projects = action.payload;
      state.createProjects = true;
      state.isLoading = false;
      state.newProject = true;
    },

    /* This reducer is likely used to update the state with the assignees of a specific project. */
    setProjectAssignees: (state, action) => {
      state.projectAssignees = action.payload;
      state.isLoading = false;
    },

    setDeletedProject: (state, action) => {
      state.projectDeleted = action.payload;
      state.isLoading = false;
    },


    reSetProjectAssignees: (state) => {
      state.projectAssignees = [];
    },

    //*Reset the form for creating a new project
    resetState: (state) => {
      state.createProjects = false;
      state.updateProject = {} as Projects;
      state.projectAssignees = [];
      state.projectDeleted = {} as Projects;
      state.error = {};
    },

    resetUpdatedProject: (state) => {
      state.updateProject = {} as Projects;
    },

    //*Set the loading flag to true
    startLoading: (state) => {
      state.isLoading = true;
    },

    startLoadingProjectsList: (state) => {
      state.isLoadingProjectsList = true;
    },

    searchStartLoading: (state) => {
      state.searchIsLoading = true;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingProject = false;
    },

    resetError: (state) => {
      state.error = {};
      state.isLoadingProjectsList = false;
    },

    setFilteredUsers: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    },

    //Funders
    setFundersProject: (state, action) => {
      state.fundersProject = action.payload;
      state.isLoading = false;
      state.error = {}
    },

    setInitiative: (state, action) => {
      state.initiative = action.payload;
      state.isLoading = false;
      state.error = {}
    },

    //Lazy Load
    setLazyProjects: (state, action) => {
      state.lazyProjects = action.payload;
    },


  },
});

// Action creators are generated for each case reducer function
export const {
  setProjects,
  setResetProjects,
  setFavoriteProjects,
  setProjectIdWorkflow,
  setResetsetProjectIdWorkflow,
  setResetProject,
  resetProjectPlaceHolder,
  resetUpdatedProject,
  setOrganizationalDiagram,
  setProjectBanner,
  setUpdateProject,
  setUpdatedProject,
  setProjectsById,
  setIsProjectLoading,
  setCreateProject,
  resetState,
  startLoading,
  error,
  resetError,
  searchStartLoading,
  setFilteredUsers,
  setProjectsByIdShare,
  //Funders
  setFundersProject,
  setInitiative,
  setProjectAssignees,
  reSetProjectAssignees,
  setDeletedProject,
  //Lazy Load
  setLazyProjects,
  startLoadingProjectsList
} = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
