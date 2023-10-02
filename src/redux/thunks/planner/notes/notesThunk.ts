import { Dispatch } from "redux";
import axios from "axios";


import { FetchCreateNote, FetchGetAllNotes, FetchResponseNotes, FetchUpdateNote, Note } from '../../../../interfaces/planner/notes/notesInterface';
import { setNotes,error,startLoading,resetState, setNote, setUpdateNote, setRichText, setCreateNote } from "../../../slices/planner/notes/notesSlice";
import { Lazy } from "../../../../interfaces/functionalInterfaces";



//get the url from the .env filexd
const url: string = <string>process.env.EXPO_PUBLIC_VITE_API_URL_WORKFLOW;

//get the token from the local storage
const token: string = localStorage.getItem("Authorization")!;

//* Projects:
//get projects from the API


  export const fetchGetNotesThunk =
  (body:Lazy) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoading());
      let { data } = await axios.post<FetchResponseNotes>(`${url}/Notes/GetAllNotes`,body, { headers });

      dispatch(setNotes(data));


    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);


      return;
    }
  };

  export const fetchGetNotesByIdThunk =
  (id:number) => async (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoading());
      let { data } = await axios.get<Note[]>(`${url}/Notes/GetNoteById?id=${id}`, { headers });

      dispatch(setNote(data[0]));
      dispatch(setRichText(data[0].content));



    } catch (err: any) {
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);

      dispatch(error(err?.response?.data));

      return;
    }
  };


  export const UpdateNote =
  (body:FetchUpdateNote) => async (dispatch: Dispatch) => {


    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoading());
      let { data } = await axios.put<Note>(`${url}/Notes/UpdateNote`, body,{ headers });

      dispatch(setUpdateNote(data));
      dispatch(setRichText(data.content));

      setTimeout(() => {
        dispatch(resetState());
      }, 1000);

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);
      return;
    }
  };


  export const CreateNote =
  (body:FetchCreateNote) => async (dispatch: Dispatch) => {


    const headers = {
      "Content-Type": "application/json",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };



    try {
      dispatch(startLoading());
      let { data } = await axios.post<Note>(`${url}/Notes`, body,{ headers });

      dispatch(setCreateNote(data));
      dispatch(setRichText(""));

      setTimeout(() => {
        dispatch(resetState());
      }, 1000);

    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 1000);


      return;
    }
  };
