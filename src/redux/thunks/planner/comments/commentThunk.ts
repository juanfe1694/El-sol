import { Dispatch } from "redux";
import axios from "axios";


import { error, setAddComment, setComments, startLoading } from "../../../slices/planner/comments/commentsSlice";
import { Comment, FetchAllComments, FetchCommentAdd } from '../../../../interfaces/planner/comments/commentsInterface';





//get the url from the .env file
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!;

//* Projects:
//get projects from the API
export const fetchCommentsThunk =
  (taskId:string) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoading());




      let { data } = await axios.get<FetchAllComments[]>(`${url}/Comments/${taskId}`, { headers });
      data.sort((a, b) => {
        const dateA = new Date(a.item1.creationDate);
        const dateB = new Date(b.item1.creationDate);
        return dateB.getTime() - dateA.getTime(); // Resta inversa para ordenar ascendentemente
      });
      

      
      
      dispatch(setComments(data));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  };


  export const fetchAddCommentThunk =
  (body:FetchCommentAdd) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };


    try {
      dispatch(startLoading());
      let { data } = await axios.post<Comment>(`${url}/Comments/AddCommentTask`,body, { headers });

      dispatch(setAddComment(data));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      return;
    }
  };