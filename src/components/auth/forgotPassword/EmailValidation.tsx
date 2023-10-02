import { Dispatch, SetStateAction, useEffect } from "react";
/* react hook form and yup */
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
/* thunks and redux */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ForgotPasswordFetch } from "../../../interfaces/auth/authInterfaces";
import { forgotPasswordThunk } from "../../../redux/thunks/authThunk";
import { setForgotPasswordState } from "../../../redux/slices/authSlice";
import { View } from "../../Themed";
import Toast from "react-native-toast-message";
import { TouchableOpacity, Text, TextInput, Platform } from "react-native";
import { loginStyles } from "../../login/LoginStyles";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

const schema = yup
  .object({
    emailUser: yup.string().required("Email is required").email("Wrong email"),
  })
  .required();

interface Props{
  email:string,
  setEmail:Dispatch<SetStateAction<string>>

}
export const EmailValidation = ({email,setEmail}:Props) => {

    const { forgotPassword, error, isLoading, forgotPasswordStep } =
    useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigation();

    const {
      register,
      reset,
      handleSubmit,
      control,
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
              type: 'error',
              text1: 'Error',
              text2: error.exception
            });
      }
      resetFrom();
    }, [error]);


    const onSubmit = (data: ForgotPasswordFetch) =>
    dispatch(forgotPasswordThunk(data)).then(()=>setEmail(data.emailUser));

  return (
    <View style={ loginStyles.container }>
     <View style={ loginStyles.titleContainer }>

          <Text style={[ loginStyles.title, {marginBottom: RFPercentage(2.5)}] }>
              Reset password
          </Text>

          <View style={{flexDirection: 'row', paddingBottom:RFPercentage(5), backgroundColor: 'white'}}>

              <Text style={ loginStyles.subTitle }>
                  To reset the password enter your email account, an email will be sent
                  with a code for validation.
              </Text>
          </View>

          <Text  style={ loginStyles.label }> Email: </Text>

          <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter email"
                  keyboardType='email-address'
                  underlineColorAndroid='black'
                  style={[
                      loginStyles.inputField,
                      (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                      ]}
                  autoCapitalize='none'
                  autoCorrect={false} 
                  onSubmitEditing={handleSubmit(onSubmit)}/>
                  )}
                  name="emailUser"
                  defaultValue=""
                  />

          {errors.emailUser && <Text>Email is required</Text>}

          <View style={[loginStyles.buttonsContainer,{marginTop: RFPercentage(5), backgroundColor: 'white'}]}>
              
              <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigate.navigate('LoginScreen')
                        dispatch(setForgotPasswordState("pending"))}}
                      style={loginStyles.signupButton} >
                          <Text style={{color:'orange', fontWeight:'bold', fontSize: RFPercentage(1.7)}}>
                          Sign in
                          </Text>
              </TouchableOpacity>

              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit(onSubmit)}
                  style={loginStyles.loginButton}
                  disabled={isLoading} >
                      <Text style={{color:'white', fontWeight:'bold', fontSize: RFPercentage(1.7)}}>
                      Reset
                      </Text>
              </TouchableOpacity>

          </View>

      </View>
    
</View>

  )
}