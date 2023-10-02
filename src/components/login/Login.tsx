import React from "react";
import {
  View,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { loginStyles } from "./LoginStyles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { UserCredentialsFetch } from "../../interfaces/auth/authInterfaces";
import { loginThunk } from "../../redux/thunks/authThunk";
import { NavigationProps } from "../../interfaces/functionalInterfaces";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Login({ navigation }: NavigationProps) {
  const { error, login, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const schema = yup
    .object({
      username: yup.string().required("username is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "min 8")
        .max(20, "max 20"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentialsFetch>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: UserCredentialsFetch) => {
    dispatch(loginThunk(data));
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.titleContainer}>
        <Text style={loginStyles.title}>Welcome</Text>

        <View style={{ flexDirection: "row", paddingBottom: 50 }}>
          <Text
            style={[
              loginStyles.subTitle,
              { borderBottomColor: "orange", borderBottomWidth: 3 },
            ]}
          >
            Sign </Text>
          <Text style={loginStyles.subTitle}>
            in to your registered account
          </Text>
        </View>

        <Text style={loginStyles.label}> Username: </Text>

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter username"
              keyboardType="email-address"
              underlineColorAndroid="black"
              style={[
                loginStyles.inputField,
                Platform.OS === "ios" && loginStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="username"
          defaultValue=""
        />

        {errors.username && <Text>Email is required</Text>}

        <Text style={loginStyles.label}> Password: </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter password"
              secureTextEntry
              underlineColorAndroid="black"
              style={[
                loginStyles.inputField,
                Platform.OS === "ios" && loginStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <Text>Password is required.</Text>}

        <View style={loginStyles.forgotPasswordContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={loginStyles.forgotPassword}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={loginStyles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RegisterScreen")}
            style={loginStyles.signupButton}
          >
            <Text style={{ color: "orange", fontWeight: "bold", fontSize: RFPercentage(1.7) }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
            style={loginStyles.loginButton}
            disabled={isLoading}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: RFPercentage(1.7) }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
