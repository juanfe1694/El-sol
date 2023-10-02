import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, TextInput, Platform, ScrollView } from "react-native";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import { AcceptButton } from "./../buttons/AcceptButton";
import { User } from "../../interfaces/admin/userInterfaces";
import { fetchUsersThunk, updateUserThunk } from "../../redux/thunks/userThunk";
import { editStyles } from "./EditUserStyles";
import { useNavigation } from "@react-navigation/native";


export const EditUser = () => {
  const {
    register: registerUser,
    isLoading,
    authUserInfo: currentUserInfo,
  } = useAppSelector((state) => state.auth);

  const { lazyUser } = useAppSelector((state) => state.user);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {
    user,
    error: userError,
    updateUser,
    userSelected,
  } = useAppSelector((state) => state.user);

 
  

  /* validation schema - react hook form */
  const schema = yup
    .object({
      documentId: yup
        .string()
        .required("Document is required")
        .max(15, "max 15"),
      firstName: yup
        .string()
        .required("First name is required")
        .max(15, "max 15"),
      lastName: yup
        .string()
        .required("Last name is required")
        .max(15, "max 15"),
      userName: yup
        .string()
        .required("User name is required")
        .max(30, "max 30"),
      email: yup
        .string()
        .required("Email is required")
        .email("Wrong email")
        .max(30, "max 30"),
      phone: yup.string().required("Phone is required").max(15, "max 15"),
      mobile: yup.string().required("Mobile is required").max(15, "max 15"),
    })
    .required();

  const {
    register,
    setValue,
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
  });

  useEffect(() => {
    setValue("firstName", userSelected?.firstName);
    setValue("lastName", userSelected?.lastName);
    setValue("userName", userSelected?.userName);
    setValue("email", userSelected?.email);
    setValue("mobile", userSelected?.mobile);
    setValue("phone", userSelected?.phone);
    setValue("documentId", userSelected?.documentId);
  }, [userSelected]);

  const onSubmit = (data: User) => {
    dispatch(
      updateUserThunk({
        ...data,
        id: userSelected.id,
        inactive: userSelected.inactive,
        isDeleted: userSelected.isDeleted,
        changePasswordNextLogin: userSelected.changePasswordNextLogin,
      })
    ).then(() => {
      dispatch(fetchUsersThunk(lazyUser));
      setTimeout(() => {
      navigation.navigate("UsersScreen");
      }, 5000);

    });
  };

  return (
    <View style={editStyles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={editStyles.label}>First Name: </Text>

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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="firstName"
          defaultValue={""}
        />

        <Text style={editStyles.textValidation}>
          {errors.firstName && errors.firstName.message}
        </Text>

        <Text style={editStyles.label}>Last Name: </Text>
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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="lastName"
          defaultValue=""
        />
        <Text style={editStyles.textValidation}>
          {errors.lastName && errors.lastName.message}
        </Text>

        <Text style={editStyles.label}>User Name: </Text>

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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="userName"
          defaultValue=""
        />

        <Text style={editStyles.textValidation}>
          {errors.userName && errors.userName.message}
        </Text>

        <Text style={editStyles.label}>Document: </Text>

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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="documentId"
          defaultValue=""
        />

        <Text style={editStyles.textValidation}>
          {errors.documentId && errors.documentId.message}
        </Text>

        <Text style={editStyles.label}>Email: </Text>

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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="email"
          defaultValue=""
        />

        <Text style={editStyles.textValidation}>
          {errors.email && errors.email.message}
        </Text>

        <Text style={editStyles.label}>Phone: </Text>
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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="phone"
          defaultValue=""
        />
        <Text style={editStyles.textValidation}>
          {errors.phone && errors.phone.message}
        </Text>

        <Text style={editStyles.label}>Mobile: </Text>
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
                editStyles.inputField,
                Platform.OS === "ios" && editStyles.inputFieldIOS,
              ]}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="mobile"
          defaultValue=""
        />
        <Text style={editStyles.textValidation}>
          {errors.mobile && errors.mobile.message}
        </Text>

        <View style={editStyles.buttonsContainer}>
          <AcceptButton
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            title="Save"
            from={"user"}
          />
        </View>
      </ScrollView>
    </View>
  );
};
