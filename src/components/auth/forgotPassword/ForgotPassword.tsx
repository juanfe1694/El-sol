import { useEffect, useState } from "react";

/* react hook form and yup */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
/* thunks and redux */

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ForgotPasswordFetch } from "../../../interfaces/auth/authInterfaces";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CommonFrame from "../../common/CommonFrame";
import { EmailValidation } from "./EmailValidation";
import { VerificationCode } from "./VerificationCode";
import { ChangePassword } from "./ChangePassword";
import LoadingScreen from "../../../screens/LoadingScreen";

/* validation schema - react hook form */
const schema = yup
  .object({
    emailUser: yup.string().required("Email is required").email("Wrong email"),
  })
  .required();
const schemaCode = yup
  .object({
    verificationCode: yup.number().required("Verification Code is required"),
  })
  .required();
export const ForgotPassword = () => {
  const { forgotPassword, error, isLoading, forgotPasswordStep } =
    useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<number | undefined>(undefined);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFetch>({
    resolver: yupResolver(schema),
  });

  const resetFrom = () => {
    reset({ emailUser: "" });
  };

  useEffect(() => {
    if (forgotPassword) {
      resetFrom();
    }
  }, [forgotPassword]);

  useEffect(() => {
    ;

    if (error?.errorText) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.exception,
      });
    }
    resetFrom();
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <LoadingScreen />
      ) : forgotPasswordStep === "pending" ? (
        <>
          <CommonFrame />
          <EmailValidation email={email} setEmail={setEmail} />
        </>
      ) : forgotPasswordStep === "sended" ? (
        <>
          <CommonFrame />
          <VerificationCode email={email} code={code as number} setCode={setCode} />
        </>
      ) : forgotPasswordStep === "confirmed" ? (
        <>
          <CommonFrame />
          <ChangePassword email={email} code={code as number} />
        </>
      ) : null}
      <Toast />
    </View>
  );
};
