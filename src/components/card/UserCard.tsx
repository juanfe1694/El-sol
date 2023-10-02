import { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SpeedDial } from "../dialogs/SpeedDial";
import { DialogConfirmation } from "../dialogs/DialogConfirmation";
import { changeIsDeletedStateUser } from "../../redux/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelected } from "../../redux/slices/userSlice";
import { useCheckNavigationData } from "../../hooks/useCheckNavigationData";
import { styles } from "./UserCardStyles";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";
import { RFPercentage } from "react-native-responsive-fontsize";

interface Props {
  user: any;
  setOverlayVisible?: (displayOverlay: boolean) => void;
  setOverlayOptions?: (overlayOptions: OverlayProps[]) => void;
}

export const UserCard = ({
  user,
  setOverlayOptions,
  setOverlayVisible,
}: Props) => {
  const { authPermissions } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.user);

   //Check permission in edit and delete user
  const items = useCheckNavigationData(
    [
      {
        option: "Edit",
        action: () => {
          toggleConfirmationDialog("Edit");
        },
        disabled: isLoading,
        icon: "eye-outline",
        entity: "Users",
        permissions: "Update",
      },
      {
        option: "Delete",
        disabled: isLoading,
        icon: "close-outline",
        action: () => {
          toggleConfirmationDialog("Delete");
        },
        entity: "Users",
        permissions: "Delete",
      },
    ],
    authPermissions
  );

  const displayOverlay = () => {
    setOverlayVisible && setOverlayVisible(true);
    setOverlayOptions && setOverlayOptions(items);
  };

  //States for the dialogs
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const toggleConfirmationDialog = (action: string) => {
    toggleDialog();
    setModalVisible(true);
    dispatch(setSelected(user));

    if (action === "Delete") {
      setInfoDialog("Are you sure you want to delete this user?");
      setIsEdit(false);
      // Handle delete action
    } else if (action === "Edit") {
      // Handle edit action
      setInfoDialog("Are you sure you want to edit this user?");
      setIsEdit(true);
    }
    setShowConfirmationDialog(!showConfirmationDialog);
  };

  const PlaceholderImage = ({ name }: any) => {
    const reducedName = typeof name === "string" ? name.slice(0, 1) : "U";

    return (
      <View style={styles.placeHolderImg}>
        <Text>{reducedName}</Text>
      </View>
    );
  };

  //Function to change format Date
  const formatDateUSA = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  //test
  const [modalVisible, setModalVisible] = useState(false);

 

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={displayOverlay}
      style={cardStyles.mainCardContainer}
    >
      <View key={user.id} style={cardStyles.mainContainer}>
        {user?.imageProfilePath ? (
          <Image
            style={styles.userImage}
            source={{ uri: user?.imageProfilePath }}
            accessibilityLabel={user.fullName}
          />
        ) : (
          <PlaceholderImage name={user?.firstName} />
        )}

        <View style={styles.leftCard}>
          <View style={styles.wraperName}>
            <Text style={styles.textName}>{user?.fullName}</Text>
            <Text style={styles.textName}>{user?.email}</Text>
            <Text style={styles.textName}>
              {formatDateUSA(user?.creationDate)}
            </Text>
          </View>
        </View>

        {/* Confirmation Dialog */}
        <DialogConfirmation
          title={infoDialog}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onConfirm={changeIsDeletedStateUser}
          isEdit={isEdit}
          setOverlayVisible={setOverlayVisible}
        />
      </View>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  mainCardContainer: {
    width: "100%",
    height: 90,
    alignSelf: "center",
    padding: 10,
    marginVertical: RFPercentage(2),
    paddingLeft: RFPercentage(2),
    borderRadius: 4,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -15,
    marginBottom: 12,
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    marginRight: RFPercentage(1),
  },
  priority: {
    fontSize: RFPercentage(2),
  },
  subtitle: {
    fontSize: RFPercentage(1),
  },
});
