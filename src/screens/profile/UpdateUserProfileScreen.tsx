import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '../../interfaces/admin/userInterfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { autenticationThunk } from '../../redux/thunks/authThunk';
import { ErrorResponseModel, fileObject } from '../../interfaces/functionalInterfaces';
import { fetchUserByIdThunk, updateUserThunk } from '../../redux/thunks/userThunk';
import { loginStyles } from '../../components/login/LoginStyles';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { uploadImageProfileThunk } from '../../redux/thunks/profileThunk';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { RFPercentage } from "react-native-responsive-fontsize";
import LoadingScreen from '../LoadingScreen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCachedProfileImage } from '../../hooks/profile/useCachedProfileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

export const UpdateUserProfileScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    setDisplayCamera(false);
    return () => {
      setDisplayCamera(false);
    };
  }, [isFocused]);
  
    const { authUserInfo: currentUserInfo } = useAppSelector(
        (state) => state.auth
      );
      const { profileImage, error: uploadImageError } = useAppSelector(
        (state) => state.profile
      );
      const {
        updateUser,
        user,
        error: userError,
      } = useAppSelector((state) => state.user);
      
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<fileObject>({} as fileObject);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [isUpdating, setisUpdating] = useState(false);
    const [displayCamera, setDisplayCamera] = useState(false);
    const [cameraType, setCameraType] = useState(CameraType.front);
    const labelAvatar = `${currentUserInfo?.firstName?.[0] ?? ""}`;
    const dispatch = useAppDispatch();
    const cameraRef = useRef<Camera>(null);

    const memorizedAuthUserId = useMemo(
        () => currentUserInfo.id,
        [currentUserInfo]
    );
    const memorizedUser = useMemo(() => user, [user]);

    const { deleteImage } = useCachedProfileImage();

    useEffect(() => {
      //set is loading true
        dispatch(fetchUserByIdThunk(memorizedAuthUserId));
    }, [memorizedAuthUserId, currentUserInfo]);

    //Set input values
    useEffect(() => {
        if (memorizedUser.id) {
        AsyncStorage.getItem('userProfileImagePath')
            .then((data)=> setImage(data))
        setCurrentUser(memorizedUser);
        setValue("mobile", memorizedUser.mobile);
        setValue("firstName", memorizedUser.firstName);
        setValue("lastName", memorizedUser.lastName);
        }
    }, [memorizedUser, memorizedAuthUserId]);

    useEffect(() => {
        if (profileImage.id) {
        success("success", "Success", "File Uploaded");
        dispatch(autenticationThunk());
        deleteImage(image as string);
        }
    }, [profileImage]);

    useEffect(() => {
        showError(uploadImageError);
    }, [uploadImageError]);

    useEffect(() => {
        showError(userError);
    }, [userError]);

    useEffect(() => {
        if (updateUser.id) {
        success("success", "Success", "User profile updated successfully");
        dispatch(autenticationThunk());
        reset();
        }
    }, [updateUser.id]);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const showToast = (
        severity: "error" | "success" | "info" | undefined,
        summary: string,
        detail: string
    ) => {
        Toast.show({
        type: severity,
        text1: summary,
        text2: detail,
        visibilityTime: 2000
        });
    };

    const showError = (
        error: ErrorResponseModel | Array<ErrorResponseModel>
    ): void => {
        setisUpdating(false);

        if (!Array.isArray(error)) {
        if (error.title !== undefined) {
            if (error.message !== undefined) {
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

    const success = (
        severity: "error" | "success" | "info"  | undefined,
        summary: string,
        detail: string
    ) => {
        setisUpdating(false);

        if (
        Object.entries(uploadImageError).length == 0 &&
        Object.entries(userError).length == 0
        ) {
        showToast(severity, summary, detail);
        setTimeout(() => {
            navigation.navigate('PortalScreen');
        }, 2000);
        }
    };

    const selectImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to select an image.');
        return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
        setCurrentUser({...currentUser, imageProfilePath: result.assets[0].uri})
        const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
        saveImageFile(fileInfo);
        setDisplayCamera(false);
        }
    };

    const takePicture = async () => {
        if (cameraRef.current) {
          const { status } = await Camera.requestCameraPermissionsAsync();
          if (status === 'granted') {
            const photo = await cameraRef.current.takePictureAsync();
            const compressedPhoto = await compressImage(photo.uri);
            setCurrentUser({ ...currentUser, imageProfilePath: compressedPhoto.uri });
            const fileInfo = await FileSystem.getInfoAsync(compressedPhoto.uri);
            saveImageFile(fileInfo);
            setDisplayCamera(false);
          } else {
            alert('No camera permission');
          }
        }
      };
      
      const compressImage = async (uri: string) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800 } }], 
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult;
      };

    const saveImageFile = (fileInfo: FileSystem.FileInfo) => {
        //const { size } = fileInfo;
        
        const fileObject = {
            uri: fileInfo.uri,
            name: 'ImageProfile.jpg', 
            type: 'image/jpeg', 
            //size,
            };

            setFile(fileObject);
    }

    const clearImage = () => {
        setFile({} as fileObject);
        setCurrentUser({...memorizedUser});
    };

    const onUpload = () => {
        setisUpdating(true);
        if (file && file.name) {
          uploadImage();
        }
        if (!editUser()) {
          uploadUser();
        }
      };
    
      const uploadImage = () => {

        const formData = new FormData();
        formData.append('image', file as any);

       dispatch(uploadImageProfileThunk(currentUser.id?.toString() as string, formData));
      };
    
      const uploadUser = () => {
        const mobile = watch("mobile");
        const firstName = watch("firstName");
        const lastName = watch("lastName");
    
        const user = {
          ...currentUser,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
        };
    
        dispatch(updateUserThunk(user));
      };
      const editUser = (): boolean => {
        const mobile = watch("mobile");
        const firstName = watch("firstName");
        const lastName = watch("lastName");
    
        if (file && file.name) {
          return false;
        }
    
        if (
          isValid &&
          (mobile != currentUser.mobile ||
            firstName != currentUser.firstName ||
            lastName != currentUser.lastName)
        ) {
          return false;
        }
    
        return true;
      };

    /* Validations */
    const schema = yup.object({
        firstName: yup.string().required("firstName is required").max(20, "max 20"),
        lastName: yup.string().required("firstName is required").max(20, "max 20"),
        mobile: yup.string().required("Mobile is required").max(20, "max 20"),
      });
    
      const {
        setValue,
        watch,
        reset,
        control,
        formState: { errors, isValid },
      } = useForm<User>({
        resolver: yupResolver(schema) as any,
        mode: "onChange",
      });

      const toggleCameraType = () => {
        setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

      const onCancel = () => {
        clearImage();
        setDisplayCamera(false);
        navigation.navigate('UserProfileScreen');
      }

  return (
    <>
      {    
        isUpdating
        ? <LoadingScreen />
        :<View style={{flex:1, backgroundColor: 'white'}}>
              {  
                  displayCamera && hasCameraPermission != null && hasCameraPermission 
                  ?   <View style={{ flex: 1}}>
                          <Camera style={{ flex: 1}} ref={cameraRef} type={cameraType} />
                          <View  style={{
                                  justifyContent: 'flex-start', 
                                  width:'100%',
                                  position: 'absolute',
                                  top: 0,
                                  left: RFPercentage(2),
                                  paddingVertical: RFPercentage(2),
                                  }}>
                              <Ionicons name='arrow-back-outline' 
                                        onPress={() => {
                                            setDisplayCamera(false);
                                        }} 
                                        size={RFPercentage(4)}
                                        color='white'/>
                          </View>
                          <View style={{
                                  flexDirection: 'row', 
                                  justifyContent: 'space-around', 
                                  width:'100%',
                                  position: 'absolute',
                                  bottom: 0,
                                  paddingVertical: RFPercentage(2),
                                  backgroundColor: 'rgba(0,0,0, 0.5)'
                                  }}>
                                  <Ionicons name='images-outline' 
                                          onPress={selectImageFromGallery} 
                                          size={RFPercentage(3)}
                                          color='white'/>

                                  <Ionicons name='aperture-outline' 
                                          onPress={takePicture} 
                                          size={RFPercentage(4)}
                                          color='white'/>

                                  <Ionicons name='camera-reverse-outline' 
                                      onPress={toggleCameraType} 
                                      size={RFPercentage(4)}
                                      color='white'/>
                              </View>
                                      
                      </View>
                  :   
                      <>
                      <ScrollView showsVerticalScrollIndicator={false}>
                          <View style={{flex:1, justifyContent: 'center', alignItems: 'center',  marginTop: RFPercentage(1)}}>
                              
                              <Text style={{fontSize:RFPercentage(4), fontWeight: 'bold', marginBottom:RFPercentage(2)}}>Edit profile</Text>
                              {
                              file.uri
                              ? <Avatar.Image size={RFPercentage(15)} source={{uri: file.uri}} />
                              :  image
                                ? <Avatar.Image size={RFPercentage(15)} source={{uri: image}} />
                                : <Avatar.Text size={RFPercentage(15)} label={labelAvatar} />

                              }
                              <View style={{
                                      marginTop: RFPercentage(1)
                                  }}>
                                  {
                                    hasCameraPermission == null || !hasCameraPermission
                                    ? <Text> You did not provide permissions to access the camera </Text>
                                    :  file.uri  == null  
                                      ? <TouchableOpacity> 
                                            <Ionicons name='camera-outline' 
                                                        onPress={() => {
                                                            setDisplayCamera(true);
                                                        }} 
                                                        size={RFPercentage(4)}
                                                        style={{fontWeight:'bold'}}/>
                                        </TouchableOpacity> 
                                      : <TouchableOpacity> 
                                            <Ionicons name='trash-outline' 
                                                        onPress={clearImage} 
                                                        size={RFPercentage(4)}
                                                        style={{fontWeight:'bold'}}/>
                                        </TouchableOpacity> 
                                  }
                              </View>
                              
                          </View>
                          
                          <View style={{flex: 1, marginTop: RFPercentage(15)}}>
                              <View style={loginStyles.titleContainer}>

                                  <Text style={loginStyles.label}> First name: </Text>

                                  <Controller
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                      onChangeText={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      placeholder="Enter first name"
                                      keyboardType="default"
                                      underlineColorAndroid="black"
                                      style={[
                                          loginStyles.inputField,
                                          Platform.OS === "ios" && loginStyles.inputFieldIOS,
                                      ]}
                                      autoCapitalize="none"
                                      autoCorrect={false}/>
                                  )}
                                  name="firstName"
                                  defaultValue=""
                                  />

                                  {errors.firstName && <Text>First name is required</Text>}

                                  <Text style={loginStyles.label}> Last name: </Text>
                                  <Controller
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                      onChangeText={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      placeholder="Enter last name"
                                      underlineColorAndroid="black"
                                      style={[
                                          loginStyles.inputField,
                                          Platform.OS === "ios" && loginStyles.inputFieldIOS,
                                      ]}
                                      autoCapitalize="none"
                                      autoCorrect={false} />
                                  )}
                                  name="lastName"
                                  defaultValue=""
                                  />
                                  {errors.lastName && <Text>Last name is required.</Text>}

                                  <Text style={loginStyles.label}> Mobile: </Text>

                                  <Controller
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                      <TextInput
                                      onChangeText={onChange}
                                      onBlur={onBlur}
                                      value={value}
                                      placeholder="Enter mobile"
                                      keyboardType="phone-pad"
                                      underlineColorAndroid="black"
                                      style={[
                                          loginStyles.inputField,
                                          Platform.OS === "ios" && loginStyles.inputFieldIOS,
                                      ]}
                                      autoCapitalize="none"
                                      autoCorrect={false} />
                                  )}
                                  name="mobile"
                                  defaultValue=""
                                  />

                                  {errors.mobile && <Text>Mobile is required</Text>}

                                  <View style={loginStyles.buttonsContainer}>
                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      onPress={() => { onCancel(); }}
                                      style={loginStyles.signupButton}
                                  >
                                      <Text style={{ color: "orange", fontWeight: "bold", fontSize: RFPercentage(2.3) }}>
                                      Cancel
                                      </Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      onPress={onUpload}
                                      style={[loginStyles.loginButton, editUser() ? {opacity: 0.6 } : null]}
                                      disabled={editUser()}
                                  >
                                      <Text style={{ color: "white", fontWeight: "bold", fontSize: RFPercentage(2.3)}}>
                                      Edit
                                      </Text>
                                  </TouchableOpacity>
                                  </View>
                              </View>
                          </View>
                          </ScrollView>
                      </>
                  } 
        </View>
      }
    </>
  );
}
