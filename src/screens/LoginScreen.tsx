import React, { useEffect } from "react";
import { View } from "react-native";

import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../components/login/Login";
import CommonFrame from "../components/common/CommonFrame";
import { ErrorResponse, ErrorResponseModel, NavigationProps } from "../interfaces/functionalInterfaces";
import LoadingScreen from "./LoadingScreen";
import { autenticationThunk } from "../redux/thunks/authThunk";

export interface UserCredentialsFetch {
  username: string;
  password: string;
}

interface ToastProps {
  type: "error" | "success",
  text1: string,
  text2: string,
  error: ErrorResponse
}

const LoginScreen = (navProps: NavigationProps) => {

  const { error, login, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      showError(error)
    }
  }, [error]);

  
  const showToast = (
    severity: "error" | "success" | "info" | undefined,
    summary: string,
    detail: string
  ) => {
    Toast.show({
      type: severity,
      text1: summary,
      text2: detail,
      visibilityTime: 4000
    });
  };

  const showError = (
    error: ErrorResponseModel | Array<ErrorResponseModel>
  ): void => {
    if(typeof error === "string"){
      showToast("error", "Connection error", "Please check your connection or contact an administrator");
    }
    if (!Array.isArray(error)) {
      if (error.title !== undefined) {
        if (error.message !== undefined) {
          if( !error.message.includes('Token not valid') )
            showToast("error", error.title, error.message);
        } else {
          let message = "";
          const errors = Object.values(error.errors as string[]);
          errors.map((err) => {
            message += `${err} \n`;
          });
          showToast("error", "Error", message);
        }
      } else if (error.errorText !== undefined) {
        showToast("error", error.errorType as string, error.errorText);
      }
    } else if (error.length > 0) {
      let message = "";
      error.map((err) => {
        message += `${err.errorText} \n`;
      });
      showToast("error", "Error", message);
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
          <CommonFrame />
          <Login {...navProps} />
          <Toast />
      </View>
  );
};

export default LoginScreen;
