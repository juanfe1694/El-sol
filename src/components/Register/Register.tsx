import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, TextInput, Platform, ScrollView } from "react-native";
import * as yup from "yup";
import { UserRegisterFetch } from "./../../interfaces/auth/authInterfaces";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import { registerThunk } from "./../../redux/thunks/authThunk";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { registerStyles } from "./RegisterStyles";
import { BackButton } from "./../buttons/BackButton";
import { AcceptButton } from "./../buttons/AcceptButton";
import ToastComponent from "../../utilities/ToastComponent";

interface Props extends NativeStackScreenProps<any, any> {}

export const Register = ({ navigation }: Props) => {
  const {
    register: registerUser,
    error,
    isLoading,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  /* validation schema - react hook form */
  const schema = yup
    .object({
      firstName: yup
        .string()
        .required("First Name is required")
        .max(30, "max 30"),
      lastName: yup
        .string()
        .required("Last Name is required")
        .max(30, "max 30"),
      userName: yup
        .string()
        .required("User name is required")
        .max(50, "max 50"),
      email: yup.string().required("Email is required").email("Wrong email"),
      newPassword: yup
        .string()
        .required("Password is required")
        .min(8, "min 8")
        .max(20, "max 20")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@.+-]{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit."
        ),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("newPassword")], "Passwords do not match"),
    })
    .required();

  const {
    register,
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFetch>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const resetFrom = () => {
    reset({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  //Redireccionamiento al componente de correo enviado
  useEffect(() => {
    if (registerUser.resultCode) {
      navigation.navigate("EmailSendScreen");
      resetFrom();
    }
  }, [registerUser]);

  const onSubmit = (data: UserRegisterFetch) => {
    dispatch(registerThunk(data));
  };

  return (
    <View style={registerStyles.container}>
      <ToastComponent
        type={"error"}
        text1={"Register Error"}
        text2={"Cannot be registered please contact the administrator"}
        error={error}
      />


      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={registerStyles.titleContainer}>
          <Text style={[registerStyles.title, { marginTop: 30 }]}>
            Register
          </Text>
        </View>

        <Text style={registerStyles.label}>First Name: </Text>

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter First Name"
              keyboardType="default"
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="firstName"
          defaultValue=""
        />

        <Text style={registerStyles.textValidation}>
          {errors.firstName && errors.firstName.message}
        </Text>

        <Text style={registerStyles.label}>Last Name: </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter First Name"
              keyboardType="default"
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="lastName"
          defaultValue=""
        />
        <Text style={registerStyles.textValidation}>
          {errors.lastName && errors.lastName.message}
        </Text>

        <Text style={registerStyles.label}>User Name: </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter Last Name:"
              keyboardType="default"
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="userName"
          defaultValue=""
        />
        <Text style={registerStyles.textValidation}>
          {errors.userName && errors.userName.message}
        </Text>

        <Text style={registerStyles.label}>Email: </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter Last Name:"
              keyboardType="email-address"
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="email"
          defaultValue=""
        />
        <Text style={registerStyles.textValidation}>
          {errors.email && errors.email.message}
        </Text>

        <Text style={registerStyles.label}>Password: </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter Last Name:"
              secureTextEntry
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="newPassword"
          defaultValue=""
        />

        <Text style={registerStyles.textValidation}>
          {errors.newPassword && errors.newPassword.message}
        </Text>

        <Text style={registerStyles.label}>Confirm Password: </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              // placeholder="Enter Last Name:"
              secureTextEntry
              underlineColorAndroid="black"
              style={[
                registerStyles.inputField,
                Platform.OS === "ios" && registerStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="confirmPassword"
          defaultValue=""
        />
        <Text style={registerStyles.textValidation}>
          {errors.confirmPassword && errors.confirmPassword.message}
        </Text>

        <View style={registerStyles.buttonsContainer}>
          <BackButton
            onPress={() => navigation.navigate("LoginScreen")}
            disabled={isLoading}
          />

          <AcceptButton
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            title="Enter"
            from="register"
          />
        </View>
      </ScrollView>
    </View>
  );
};
