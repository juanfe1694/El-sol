import { StyleSheet, Text, View, Alert, Modal, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  modalVisible: boolean;
  setModalVisible: any;
  setOverlayVisible?: (displayOverlay: boolean) => void;
  onConfirm: any;
  isEdit: boolean;
}

export const DialogConfirmation = ({
  title,
  modalVisible,
  setModalVisible,
  setOverlayVisible,
  onConfirm,
  isEdit,
}: Props) => {
  const dispatch = useAppDispatch();
  const { userSelected, lazyUser } = useAppSelector((state) => state.user);

  const navigation = useNavigation()

  return (
    <View style={styles2.centeredView}>
      <Modal
        //animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles2.centeredView}>
          <View style={styles2.modalView}>
            <Text style={styles2.modalText}>{title}</Text>

            <View style={styles2.modalViewButtons}>
              <Pressable
                style={[styles2.button, styles2.buttonReject]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles2.textStyle}>Reject</Text>
              </Pressable>

              {isEdit ? (
                <Pressable
                  style={[styles2.button, styles2.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate("EditUsersScreen")
                    setOverlayVisible && setOverlayVisible(false)
                  }}
                >
                  <Text style={styles2.textStyle}>Accept</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[styles2.button, styles2.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    dispatch(onConfirm(userSelected));
                    setOverlayVisible && setOverlayVisible(false)
                  }}
                >
                  <Text style={styles2.textStyle}>Accept</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles2 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalViewButtons: {
    justifyContent: "space-around",
    width: 170,
    flexDirection: "row",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonReject: {
    backgroundColor: "#606c80",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
