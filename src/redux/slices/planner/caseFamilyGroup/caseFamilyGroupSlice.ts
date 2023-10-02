import { createSlice } from "@reduxjs/toolkit";

import { ErrorResponse } from '../../../../interfaces/functionalInterfaces';
import { DuplicateCaseInterface, FetchResponseCaseFamily } from "../../../../interfaces/planner/caseFamilyPerson/caseFamilyPersonInterface";
import { AssignFilledFormToCaseInterface, CaseFamilyGroupsParent, Person } from '../../../../interfaces/planner/casePersons/casePersonsInterface';
import { boolean } from 'yup';


type InitialState = {
  caseFamilyGroup: FetchResponseCaseFamily;
  caseFamilyGroupInfo: FetchResponseCaseFamily;
  caseFamilyGroupPerson: boolean;
  caseFamilyIsLoading: boolean;
  error: ErrorResponse;
  //Añadir persona
  addPerson: Person;
  isAddedPerson: boolean;
  detelePerson: Person;
  isDeletedPerson: boolean;
  visibleAdd: boolean;
  reenterPerson: Person;
  isReenterPerson: boolean;
  errorReenterPerson: ErrorResponse;
  isLoadingPerson: boolean;
  errorDeletePerson: ErrorResponse;
  errorAddPerson: ErrorResponse;
  metaKey: boolean;
  //Duplicar persona
  duplicatePerson: DuplicateCaseInterface[];
  replicateCaseFamilyGroup: boolean;
  errorDuplicate: ErrorResponse;

  //*Display form - Assig Form to case
  isFromAssignCaseFilledForm: boolean;
  formVisible: boolean,
  idsItemForm?: number[];
  selectUserForm: CaseFamilyGroupsParent[];
  qrUse: string;
  assignCaseToFilledForms: AssignFilledFormToCaseInterface;
  errorAssignCaseToFilledForms: ErrorResponse;
}

const initialState: InitialState = {
  caseFamilyGroup: ({} as FetchResponseCaseFamily),
  caseFamilyGroupInfo: ({} as FetchResponseCaseFamily),
  caseFamilyGroupPerson: true,
  caseFamilyIsLoading: false,
  error: {},
  //Añadir persona
  addPerson: ({} as Person),
  isAddedPerson: false,
  detelePerson: ({} as Person),
  isDeletedPerson: false,
  errorReenterPerson: {},
  errorDeletePerson: {},
  reenterPerson: ({} as Person),
  isReenterPerson: false,
  visibleAdd: false,
  isLoadingPerson: false,
  errorAddPerson: {},
  metaKey: true,
  //Duplicar persona
  duplicatePerson: [],
  replicateCaseFamilyGroup: false,
  errorDuplicate: {},
  //*Display form - Assig Form to case
  isFromAssignCaseFilledForm: false,
  formVisible: false,
  idsItemForm: [],
  selectUserForm: [],
  qrUse: "",
  assignCaseToFilledForms: {} as AssignFilledFormToCaseInterface,
  errorAssignCaseToFilledForms: {},
}

const caseFamilyGroupSlice = createSlice({
  name: 'caseFamilyGroup',
  initialState,
  reducers: {

    caseFamilyGroupPerson: (state) => {
      state.caseFamilyGroupPerson = !state.caseFamilyGroupPerson;
      state.isLoadingPerson = false;
      //ojo
      state.caseFamilyIsLoading = false;
    },
    //*Start Loading
    setCaseFamilyIsLoading: (state) => {
      state.caseFamilyIsLoading = true;
    },
    //*Stop Loading
    setStopCaseFamilyIsLoading: (state) => {
      state.caseFamilyIsLoading = false;
    },

    //*Se utiliza para el listado del dialog management

    setCaseFamilyPerson: (state, action) => {
      state.caseFamilyGroup = action.payload;
      state.caseFamilyIsLoading = false;
      state.isAddedPerson = false;
      state.error = {};
      //state.addPerson = ({} as Person);
      state.isDeletedPerson = false;
      //state.detelePerson = ({} as Person);
      state.reenterPerson = ({} as Person);
      state.isReenterPerson = false;
    },

    setResetCaseFamilyPerson: (state) => {
      state.caseFamilyGroup = {} as FetchResponseCaseFamily;
      state.caseFamilyIsLoading = false;
      state.error = {};
    },

    //*Se utiliza para el listado en la tabla de info
    setCaseFamilyPersonInfo: (state, action) => {
      state.caseFamilyGroupInfo = action.payload;
      state.caseFamilyIsLoading = false;
      state.isAddedPerson = false;
      state.error = {};
      state.addPerson = ({} as Person);
      state.isDeletedPerson = false;
      state.detelePerson = ({} as Person);
      state.reenterPerson = ({} as Person);
      state.isReenterPerson = false;
    },

    setResetCaseFamilyInfo: (state) => {
      state.caseFamilyGroupInfo = {} as FetchResponseCaseFamily;
    },

    error: (state, action) => {
      state.error = action.payload;
      state.caseFamilyIsLoading = false;
      state.isLoadingPerson = false;
    },

    resetErrorState: (state) => {
      state.error = {};
      state.caseFamilyIsLoading = false;
    },

    //*Se utiliza para cambiar active o inactive en management family case persons
    setMetaKey: (state, action) => {
      state.metaKey = action.payload;
    },

    //*Funcionalidad de añadir personas al case FamilyGroup
    isLoadingPerson: (state) => {
      state.isLoadingPerson = true;
    },

    setVisibleAdd: (state) => {
      state.visibleAdd = !state.visibleAdd;
    },


    setAddPerson: (state, action) => {
      state.addPerson = action.payload;
      state.isAddedPerson = false;
      state.errorAddPerson = {};
    },

    setIsAddedPerson: (state) => {
      state.isAddedPerson = true;
      state.errorAddPerson = {};
    },

    resetAddperson: (state) => {
      state.addPerson = {} as Person;
      state.errorAddPerson = {};
    },

    errorAddPerson: (state, action) => {
      state.errorAddPerson = action.payload;
      //state.isLoadingPerson = false;
    },

    resetErrorAddPerson: (state) => {
      state.errorAddPerson = {};
      state.isLoadingPerson = false;
    },

    //*Eliminar persona

    setDeletePerson: (state, action) => {
      state.detelePerson = action.payload;
      state.isDeletedPerson = false;
    },

    setIsDeletedPerson: (state) => {
      state.isDeletedPerson = true;
    },

    resetDeletePerson: (state) => {
      state.detelePerson = {} as Person;
    },

    errorDeletePerson: (state, action) => {
      state.errorDeletePerson = action.payload;
      //state.isLoadingPerson = false;
    },

    setStopIsLoadingAddPerson: (state) => {
      state.isLoadingPerson = false;
    },

    resetErrorDeletePerson: (state) => {
      state.errorDeletePerson = {};
      state.isLoadingPerson = false;
    },

    //*Reingresar
    setReenterPerson: (state, action) => {
      state.reenterPerson = action.payload;
      state.isReenterPerson = false;
    },

    setIsReenterPerson: (state) => {
      state.isReenterPerson = true;
    },

    errorRenterPerson: (state, action) => {
      state.errorReenterPerson = action.payload
      state.isReenterPerson = false;
      //state.isLoadingPerson = false;
    },

    resetErrorReenterPerson: (state) => {
      state.errorReenterPerson = {}
      state.isLoadingPerson = false;
    },

    //*Replicar case Family Group

    setReplicateCaseFamilyGroup: (state, action) => {
      state.replicateCaseFamilyGroup = action.payload;
    },

    setDuplicatePerson: (state, action) => {
      state.duplicatePerson = action.payload;
      state.replicateCaseFamilyGroup = false;
      state.selectUserForm = [];
      state.errorDuplicate = {};
      state.isLoadingPerson = false;
    },

    setErrorDuplicate: (state, action) => {
      state.errorDuplicate = action.payload;
      state.selectUserForm = [];
      state.replicateCaseFamilyGroup = false;
      state.isLoadingPerson = false;
    },

    resetDuplicatePerson: (state) => {
      state.duplicatePerson = [];
    },

    resetErrorDuplicate: (state) => {
      state.errorDuplicate = {};
    },

    //*Display form - Assig Form to case

    setIsFromAssignCaseFilledForm: (state, action) => {
      state.isFromAssignCaseFilledForm = action.payload;
    },

    setVisibleForm: (state) => {
      state.formVisible = !state.formVisible;
    },

    setIdsItemForm: (state, action) => {
      state.idsItemForm = action.payload;
    },

    setSelectUserForm: (state, action) => {
      state.selectUserForm = action.payload;
    },

    resetSelectUserForm: (state) => {
      state.selectUserForm = [];
    },

    setQrUse: (state, action) => {
      state.qrUse = action.payload;
    },

    setAssignCaseToFilledForms: (state, action) => {
      state.assignCaseToFilledForms = action.payload;
    },

    resetAssignCaseToFilledForms: (state) => {
      state.assignCaseToFilledForms = {} as AssignFilledFormToCaseInterface;
    },

    setErrorAssignCaseToFilledForms: (state, action) => {
      state.errorAssignCaseToFilledForms = action.payload;
    },

    resetErrorAssignCaseToFilledForms: (state) => {
      state.errorAssignCaseToFilledForms = {};
    }

  }
});

// Action creators are generated for each case reducer function
export const {
  setCaseFamilyPerson,
  setCaseFamilyPersonInfo,
  setResetCaseFamilyInfo,
  caseFamilyGroupPerson,
  setResetCaseFamilyPerson,
  setCaseFamilyIsLoading,
  setStopCaseFamilyIsLoading,
  error,
  setMetaKey,
  resetErrorState,
  setVisibleAdd,
  setStopIsLoadingAddPerson,
  isLoadingPerson,

  //Añadir persona
  setAddPerson,
  setIsAddedPerson,
  resetAddperson,
  errorAddPerson,
  resetErrorAddPerson,


  //Eliminar Persona
  setDeletePerson,
  setIsDeletedPerson,
  resetDeletePerson,
  errorDeletePerson,
  resetErrorDeletePerson,

  //Reenter
  setReenterPerson,
  setIsReenterPerson,
  errorRenterPerson,
  resetErrorReenterPerson,

  //Duplicar
  setDuplicatePerson,
  setReplicateCaseFamilyGroup,
  setErrorDuplicate,
  resetDuplicatePerson,
  resetErrorDuplicate,

  //*Display form - Assig Form to case
  setIsFromAssignCaseFilledForm,
  setVisibleForm,
  setIdsItemForm,
  setSelectUserForm,
  resetSelectUserForm,
  setQrUse,
  setAssignCaseToFilledForms,
  resetAssignCaseToFilledForms,
  setErrorAssignCaseToFilledForms,
  resetErrorAssignCaseToFilledForms

} = caseFamilyGroupSlice.actions;
export const caseFamilyGroupReducer = caseFamilyGroupSlice.reducer;