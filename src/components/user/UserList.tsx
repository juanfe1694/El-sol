import { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Paginator } from "../paginator/Paginator";
import { UserCard } from "./../card/UserCard";
import { fetchUsersThunk } from "../../redux/thunks/userThunk";
import { changeLazy } from "../../redux/slices/userSlice";
import LoadingScreen from "../../screens/LoadingScreen";
import ToastComponent from "../../utilities/ToastComponent";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";

interface UserListProps {
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const UserList = ({
  setOverlayVisible,
  setOverlayOptions,
}: UserListProps) => {
  const { users, lazyUser, isLoading, disableUser, error } = useAppSelector(
    (state) => state.user
  );

  console.log("users", users.recordsCount);

  const dispatch = useAppDispatch();

  //*get user data

  useEffect(() => {
    if (disableUser.id) {
      dispatch(fetchUsersThunk(lazyUser));
    }
  }, [disableUser]);


  return (
    <View style={styles.userList}>
      <ToastComponent type={"error"} text1={""} text2={""} error={error} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={{ height: 580 }}>
            <LoadingScreen />
          </View>
        ) : (
          <View style={{ height: "auto", width: "100%" }}>
            {users?.data?.map((user) => {
              return (
                <UserCard
                  user={user}
                  key={user.id}
                  setOverlayOptions={setOverlayOptions}
                  setOverlayVisible={setOverlayVisible}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
      <Paginator
        lazy={lazyUser}
        onChangeLazy={changeLazy}
        fetchThunk={fetchUsersThunk}
        recordsCount={users.recordsCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userList: {
    flex: 1,
    // height: 600,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
});
