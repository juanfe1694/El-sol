import { useEffect, useState } from "react";

/* react hook form and yup */
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
/* thunks and redux */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { resetPasswordThunk } from "../../../redux/thunks/authThunk";
import { setForgotPasswordState } from "../../../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Platform, TextInput, TouchableOpacity, View, Text } from "react-native";
import { loginStyles } from "../../login/LoginStyles";
import { useGetPasswordExtrenght } from "../../../hooks/auth/useGetPasswordExtrenght";
import { RFPercentage } from "react-native-responsive-fontsize";

/* validation schema - react hook form */
const schema = yup
  .object({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "min 8")
      .max(20, "max 20"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), ''], "Passwords do not match"),
  })
  .required();

interface Props {
  email: string;
  code: number | undefined;
}

interface Form {
  newPassword: string;
  confirmPassword: string;
}

export const ChangePassword = ({ email, code }: Props) => {

    const {
        forgotPassword,
        error,
        isLoading,
        forgotPasswordStep,
        resetPassword,
      } = useAppSelector((state) => state.auth);
      const dispatch = useAppDispatch();
      const navigate = useNavigation();
    
      const {
        register,
        watch,
        reset,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
      } = useForm<Form>({
        resolver: yupResolver(schema),
      });

      const { strength } = useGetPasswordExtrenght(watch('newPassword') || '');
      
      const resetFrom = () => {
        reset();
      };
      const [confirmedPassword, setConfirmedPassword] = useState(false);
    
      useEffect(() => {
        if (forgotPassword) {
          resetFrom();
        }
      }, [forgotPassword]);

      useEffect(() => {
        ;

        if (error?.errorText) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.exception
              });

        }
        resetFrom();
    }, [error]);
    
      const onSubmit = (data: Form) =>
        dispatch(
          resetPasswordThunk({
            activationCode: code!.toString(),
            email: email,
            newPassword: data.newPassword,
          })
        );
    
      const header = <h4>Pick a password</h4>;
      const footer = (
        <>
          {/*<Divider />
          <p className="mt-2">Suggestions</p>
          <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
      </ul>*/}
        </>
      );
    
      const back =  ()=>{
        dispatch(setForgotPasswordState("pending"));
        navigate.navigate("LoginScreen");
      }
      
      useEffect(() => {

        if( resetPassword != null) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2:  "Your password has been updated."
          });
          setTimeout(() => {
            dispatch(setForgotPasswordState("pending"));
            navigate.navigate("LoginScreen");
          }, 2000);

        }
      }, [resetPassword]);
 
      
      return(
        <View style={ loginStyles.container }>
        
          <View style={ loginStyles.titleContainer }>

              <Text style={[ loginStyles.title, {marginBottom: RFPercentage(.8)}] }>
                  Reset password
              </Text>

              <View style={{flexDirection: 'row', paddingBottom:RFPercentage(5)}}>
                      <Text style={[loginStyles.subTitle,
                                  {borderBottomColor: 'orange',
                                  borderBottomWidth: 3}]}> 
                                      Enter { }  
                      </Text> 
                      <Text style={ loginStyles.subTitle }>
                                  your new password
                      </Text>
                  </View>

              <Text  style={ loginStyles.label }> Password: </Text>
                  <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder="Enter new password"
                          secureTextEntry
                          underlineColorAndroid='black'
                          style={[
                              loginStyles.inputField,
                              (Platform.OS === 'ios') && loginStyles.inputFieldIOS]}
                          autoCapitalize='none'
                          autoCorrect={false} 
                          onSubmitEditing={handleSubmit(onSubmit)}/>
                      )}
                      name="newPassword"
                      defaultValue=""
                  />
                  {errors.newPassword && <Text>Password is required.</Text>}

                  {/*
                  (watch("newPassword") != "") 
                  && <View>
                        <PasswordStrengthIndicator strength={strength} />
                          </View>*/}

                  <Text  style={ loginStyles.label }> Confirm password: </Text>
                  <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder="Confirm password"
                          secureTextEntry
                          underlineColorAndroid='black'
                          style={[
                              loginStyles.inputField,
                              (Platform.OS === 'ios') && loginStyles.inputFieldIOS]}
                          autoCapitalize='none'
                          autoCorrect={false} 
                          onSubmitEditing={handleSubmit(onSubmit)}/>
                      )}
                      name="confirmPassword"
                      defaultValue=""
                  />
                  {errors.confirmPassword && <Text>Password is required.</Text>}

              <View style={[loginStyles.buttonsContainer,{marginTop: RFPercentage(5)}]}>
                  
                  <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={back}
                          style={loginStyles.signupButton} >
                              <Text style={{color:'orange', fontWeight:'bold', fontSize: RFPercentage(1.7)}}>
                              Back to login
                              </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleSubmit(onSubmit)}
                      style={loginStyles.loginButton}
                      disabled={isLoading} >
                          <Text style={{color:'white', fontWeight:'bold', fontSize: RFPercentage(1.7)}}>
                          Submit
                          </Text>
                  </TouchableOpacity>

              </View>

          </View>
    <Toast />
</View>
      )
}