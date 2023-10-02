import { Dispatch } from "redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormInUse } from "../../../interfaces/form/formInUseInterfaces";
import { Projects } from "../../../interfaces/planner/projects/projectsInterfaces";
import { setForms, setProjects, startSinchronizingProjects } from "../../slices/connection/connectionSlice";

const urlForms = process.env.EXPO_PUBLIC_VITE_DYNAMICFORMS_API_URL;
const urlProjects = process.env.EXPO_PUBLIC_VITE_API_URL_PROJECTS;

export const fetchUserProjectsThunk = () => async (dispatch: Dispatch) => {

  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };

  try {
    dispatch(startSinchronizingProjects());
    let { data } = await axios.get<Projects[]>(`${urlProjects}/Project/GetProjectByUserInSession`, { headers });
    dispatch(setProjects(data));
    
    return (data);
  } catch (err: any) {
    throw err;

  }
}

export const getFormsInUseByProjectIdThunk = (projectId: number) => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem("Authorization");

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
  try {

    let { data } = await axios.get<FormInUse[]>(`${urlForms}/FormsInUse/GetFormsInUseByUserInSessionAndProjectId?projectId=${projectId}`, { headers });
    
    let forms: FormInUse[] = []
    

    data.map(form => {
      forms.push({
        ...form,
        projectId: projectId
        })
    })

    
    dispatch(setForms(forms));

    return forms;
  }
  catch (err: any) {
    throw err;
   }
}