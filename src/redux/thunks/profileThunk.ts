
import { Dispatch } from "redux";
import axios from "axios";
import { UserProfileImagesViewModel } from "../../interfaces/admin/userInterfaces";
import { error, resetState, setProfileImage, setShowCamera } from "../slices/profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = process.env.EXPO_PUBLIC_VITE_API_URL;

/* functions to perform user requests */

export const uploadImageProfileThunk =
  (userId: string, image: FormData) => async (dispatch: Dispatch) => {
    const token = await AsyncStorage.getItem("Authorization");
    const headers = {
      "Content-Type": "multipart/form-data",
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    };

    try {
      let { data } = await axios.post<UserProfileImagesViewModel>(`${url}/UserProfileImages?userId=${userId}`, image, {headers});
      dispatch(setProfileImage(data));
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return;
    }
  };

  export const setMediaShowThunk =
  (display: boolean) => async (dispatch: Dispatch) => {
    try {
      dispatch(setShowCamera(display));
    } catch (err: any) {
      dispatch(error(err?.response?.data));
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return;
    }
  };

  