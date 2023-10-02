//Redux
import { Dispatch } from "redux";
//Axios
import axios from 'axios';
//Reducer: taskSlice.ts
import { caseFamilyGroupPerson, error, errorAddPerson, errorDeletePerson, errorRenterPerson, isLoadingPerson, resetErrorAddPerson, resetErrorAssignCaseToFilledForms, resetErrorDeletePerson, resetErrorDuplicate, resetErrorReenterPerson, setAddPerson, setAssignCaseToFilledForms, setCaseFamilyIsLoading, setCaseFamilyPerson, setCaseFamilyPersonInfo, setDeletePerson, setDuplicatePerson, setErrorAssignCaseToFilledForms, setErrorDuplicate, setIsAddedPerson, setIsDeletedPerson, setIsReenterPerson, setReenterPerson, setStopCaseFamilyIsLoading } from "../../../slices/planner/caseFamilyGroup/caseFamilyGroupSlice";
//Interfaces
import { Lazy } from '../../../../interfaces/functionalInterfaces';
import { AssignFormToCaseFamily, DuplicateCaseInterface, FetchResponseCaseFamily, FetchResponseDuplicateCaseFamily } from '../../../../interfaces/planner/caseFamilyPerson/caseFamilyPersonInterface';
import { AssignPerson, Deleteperson, PersonSelect } from "../../../../interfaces/planner/casePersons/casePersonsInterface";
import { resetErrorState } from "../../../slices/planner/task/taskSlice";



const urlWorkFlow: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;
const token: string = localStorage.getItem("Authorization")!


//* Case Family Person
//*Se utiliza para el listado deldialog management
export const fetchCaseFamilyPerson = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    dispatch(setCaseFamilyIsLoading())
    let { data } = await axios.post<FetchResponseCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/GetAllPersonsInCaseFamily`, lazyLoad, { headers });
    dispatch(setCaseFamilyPerson(data))
    dispatch(caseFamilyGroupPerson())
    //dispatch(setStopCaseFamilyIsLoading())


  } catch (err: any) {
    dispatch(error(err?.response?.data));

    setTimeout(() => {
      dispatch(resetErrorState())
    })
    return;
  }
}


//*Se utiliza para el listado en la tabla de info
export const fetchCaseFamilyPersonInfo = (lazyLoad: Lazy) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    dispatch(setCaseFamilyIsLoading())
    let { data } = await axios.post<FetchResponseCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/GetAllPersonsInCaseFamily`, lazyLoad, { headers });
    dispatch(setCaseFamilyPersonInfo(data))
    dispatch(caseFamilyGroupPerson())
    //dispatch(setStopCaseFamilyIsLoading())


  } catch (err: any) {
    dispatch(error(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorState())
    })
    return;
  }
}

//*Añadir persona
export const fetchAddPersonToCaseFamily = (props: AssignPerson) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    dispatch(setIsAddedPerson())
    let { data } = await axios.post<FetchResponseCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/AssignPersonToCaseFamilyGroup`, props, { headers });
    dispatch(setAddPerson(data))

  } catch (err: any) {
    dispatch(errorAddPerson(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorAddPerson())
    }, 1000);
    return;
  }
}


//*Eliminar personas
export const fetchDeletePersonToCaseFamily = (props: Deleteperson) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    dispatch(setIsDeletedPerson())
    let { data } = await axios.put<FetchResponseCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/UpdatePersonToCaseFamilyGroup`, props, { headers });
    dispatch(setDeletePerson(data))

  } catch (err: any) {
    dispatch(errorDeletePerson(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorDeletePerson())
    }, 1000);
    return;
  }
}


//*Reingrear persona
export const fetchReenterPersonToCaseFamily = (props: Deleteperson) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    dispatch(setIsReenterPerson())
    let { data } = await axios.put<FetchResponseCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/UpdatePersonToCaseFamilyGroup`, props, { headers });
    dispatch(setReenterPerson(data))

  } catch (err: any) {
    dispatch(errorRenterPerson(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorReenterPerson())
    }, 1000);
    return;
  }
}

//*Duplicar case Family Group
export const fetchDuplicatePersonToCaseFamily = (props: DuplicateCaseInterface) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(isLoadingPerson())
    let { data } = await axios.post<FetchResponseDuplicateCaseFamily>(`${urlWorkFlow}/CaseFamilyGroup/DuplicateCaseFamilyGroup`, props, { headers });
    dispatch(setDuplicatePerson(data))

  } catch (err: any) {
    dispatch(setErrorDuplicate(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorDuplicate())
    }, 1000);
    return;
  }
}


//*Assing filled Form to case Family Group
export const AssignCaseFamilyGroupsToFilledForms = (props: AssignFormToCaseFamily) => async (dispatch: Dispatch) => {

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    //dispatch(isLoadingPerson())
    let { data } = await axios.post(`${urlWorkFlow}/CaseFamilyGroupsFilledForms/AssignCaseFamilyGroupsToFilledForms`, props, { headers });
    dispatch(setAssignCaseToFilledForms(data))

  } catch (err: any) {
    dispatch(setErrorAssignCaseToFilledForms(err?.response?.data));
    setTimeout(() => {
      dispatch(resetErrorAssignCaseToFilledForms())
    }, 1000);
    return;
  }
}