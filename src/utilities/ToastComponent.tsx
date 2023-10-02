import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useEffect, useRef } from "react";
import React from "react";
import { ErrorResponse } from "../interfaces/functionalInterfaces";
import { StyleSheet, View } from "react-native";

interface ToastProps {
  type: "error" | "success";
  text1: string;
  text2: string;
  error: ErrorResponse;
}

const ToastComponent = ({ type, error, text1, text2 }: ToastProps) => {
  const toastContainerRef = useRef(null);

  //The styling format of the messages in the Toast component
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green", backgroundColor: "white" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: "400",
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: "400",
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red", backgroundColor: "white" }}
        text1Style={{
          fontSize: 14,
          fontWeight: "400",
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: "400",
        }}
      />
    ),
  };

  //Caso expecifico cuando el error viene en [array]
  const errorTexts =
    error?.map !== undefined ? error?.map((error) => error?.errorText) : null;

  useEffect(() => {
    if (type === "success") {
      Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        visibilityTime: 5000,
      });
    } else {
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
          text1: text1,
          text2: text2,
          visibilityTime: 5000,
        });
      }
    }
  }, [error, text1]);

  return (
    <View style={styles.toastContainer} ref={toastContainerRef}>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    justifyContent: "flex-start",
    backgroundColor: "aqua",
    position: "relative",
    zIndex: 9999,
    elevation: 9999,
  },
});

export default ToastComponent;
