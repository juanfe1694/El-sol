import React from 'react'
import { ErrorResponse } from '../../interfaces/functionalInterfaces';
import Toast from 'react-native-toast-message';

export const useToastError = ( error : ErrorResponse) => {

    const type ="error";
    const errorTexts =
    error?.map !== undefined ? error?.map((error) => error?.errorText) : null;

    if (error.errorType !== undefined) {
        Toast.show({
          type: type,
          text1: error.errorType === "RuntimeError" ? "Error" : error.errorType,
          text2: error.exception ? error.exception : error.errorText,
          visibilityTime: 5000,
        });
      } else if (Array.isArray(errorTexts)) {
        Toast.show({
          type: type,
          text1: "Error",
          text2: errorTexts?.toString(),
          visibilityTime: 5000,
        });
      } else if (error?.title) {
        Toast.show({
          type: type,
          text1: "Error",
          text2: "Error, please contact administrator",
          visibilityTime: 5000,
        });
      }
    
  return {}
}
