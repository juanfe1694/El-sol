import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUsersThunk } from "../../redux/thunks/userThunk";
import { UserList } from "../../components/user/UserList";
import ToastComponent from "../../utilities/ToastComponent";
import { Searcher } from "../../components/filters/Searcher";
import { useToastError } from "../../hooks/toast/useToastError";
import Toast from "react-native-toast-message";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../overlay/OverlayScreen";
import { useIsFocused } from "@react-navigation/native";

export const UsersScreen = () => {
  const { lazyUser, disableUser, error, isLoading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  
  const {
    user,
    error: userError,
    updateUser,
    userSelected,
  } = useAppSelector((state) => state.user);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])
  
  useToastError(userError);
  useToastError(error);

  useEffect(() => {
    updateUser.id &&
      Toast.show({
        type: "success",
        text1: "Update",
        text2: "Update user success",
        visibilityTime: 10000,
        autoHide: true,
        topOffset: 10
      });
  }, [updateUser])

  useEffect(() => {
    disableUser.id &&
      Toast.show({
        type: "success",
        text1: "Delete User",
        text2: "User was delete",
        visibilityTime: 10000,
        autoHide: true,
      });
  }, [disableUser])

  //*get user data
  useEffect(() => {
    dispatch(fetchUsersThunk(lazyUser));
  }, []);

//Get data when disable a user
  useEffect(() => {
    if (disableUser.id) {
      dispatch(fetchUsersThunk(lazyUser));
    }
  }, [disableUser]);


  return (
    <View style={styles.container}>

      {/* //*Componente de filtros */}
      <View style={styles.filters}>
       <Searcher typeItem={"users"} isLoading={isLoading}/> 
      </View>

      <UserList
        setOverlayOptions={setOverlayOptions}
        setOverlayVisible={setOverlayVisible}
      />
      {overlayVisible && (
        <OverlayScreen
          overlayProps={overlayOptions as OverlayProps[]}
          overlayVisible={overlayVisible}
          setoverlayVisible={setOverlayVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filters:{
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 24,
    marginBottom: 8,
    borderRadius: 20,
    elevation: -1,
  },
});
