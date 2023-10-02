import { Dispatch, SetStateAction, useEffect, useState } from "react";

/* react hook form and yup */
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
/* thunks and redux */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CheckVerificationCodeFetch } from "../../../interfaces/auth/authInterfaces";
import { vericateCodeThunk } from "../../../redux/thunks/authThunk";
import { setForgotPasswordState } from "../../../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Platform, TextInput, TouchableOpacity, View, Text } from "react-native";
import { loginStyles } from "../../login/LoginStyles";
import { RFPercentage } from "react-native-responsive-fontsize";

/* validation schema - react hook form */
const schema = yup
  .object({
    verificationCode: yup.number().required("Verification Code is required"),
  })
  .required();

interface Props{
  email:string,
  code:number | undefined
  setCode:Dispatch<SetStateAction<number | undefined>>
}

export const VerificationCode = ( { email, code, setCode }: Props ) => {
    const { forgotPassword, error, isLoading, forgotPasswordStep } =
    useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigation();
    const [LocalCode, setLocalCode] = useState<number>()
    const {
        register,
        watch,
        reset,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CheckVerificationCodeFetch>({
        resolver: yupResolver(schema) as any,
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

        if (error?.errorText) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.exception
              });

        }
        resetFrom();
    }, [error]);


    const submitCode = (data: CheckVerificationCodeFetch)=>{
        const verificationCode = parseInt( data.verificationCode );
        setCode( verificationCode)
        setLocalCode( verificationCode )
        dispatch(vericateCodeThunk({emailUser:email, verificationCode: data.verificationCode }))
    }

    return(
        <View style={ loginStyles.container }>
              <View style={ loginStyles.titleContainer }>

                        <Text style={[ loginStyles.title, {marginBottom: RFPercentage(2.5)}] }>
                            Verification code
                        </Text>

                        <View style={{flexDirection: 'row', paddingBottom:RFPercentage(5)}}>

                            <Text style={ loginStyles.subTitle }>
                            Enter the verification code we sent to email, if you don't see it, check your spam folder.
                            </Text>
                        </View>

                        <Text  style={ loginStyles.label }> Verification Code: </Text>

                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onChangeText={ onChange }
                                onBlur={onBlur}
                                value={value.toString() }
                                placeholder="Enter code"
                                keyboardType={'numeric'}
                                underlineColorAndroid='black'
                                style={[
                                    loginStyles.inputField,
                                    (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                    ]}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                onSubmitEditing={handleSubmit(submitCode)}/>
                                )}
                                name="verificationCode"
                                defaultValue=""
                                />

                        {errors.verificationCode && <Text>Verification Code is required</Text>}

                        <View style={[loginStyles.buttonsContainer,{marginTop: RFPercentage(5)}]}>
                            
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
                                onPress={handleSubmit(submitCode)}
                                style={loginStyles.loginButton}
                                disabled={ parseInt(watch('verificationCode'))  < 1000 
                                        || parseInt(watch('verificationCode'))  > 9999 ? true : false} 
                                >
                                    <Text style={{color:'white', fontWeight:'bold', fontSize: RFPercentage(1.7)}}>
                                    Send
                                    </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
             
            <Toast />
        </View>
        
    )

}