import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../../app/hooks";
import { changeFilterBy } from "../../redux/slices/userSlice";
import { Button } from "react-native-paper";

interface Props {
  setInputDate: any;
}

export const DialogDown = ({ setInputDate }: Props) => {
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        //animationType="slide"
        transparent={true}
        visible={modalVisible}
        //presentationStyle="pageSheet"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Select Filter Search</Text> */}

            <TouchableOpacity
              activeOpacity={0.8}
              //onPress={toggleDialog}
              style={styles.buttonOption}
              onPress={() => {
                dispatch(changeFilterBy("email"));
                setModalVisible(!modalVisible);
                setInputDate(false);
              }}
            >
              <Ionicons
                name={"mail-outline"}
                size={20}
                color={"black"}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textStyle}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              //onPress={toggleDialog}
              style={styles.buttonOption}
              onPress={() => {
                dispatch(changeFilterBy("creationDate"));
                setModalVisible(!modalVisible);
                setInputDate(true);
              }}
            >
              <Ionicons
                name={"calendar-outline"}
                size={20}
                color={"black"}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textStyle}>Date Creation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              //onPress={toggleDialog}
              style={styles.buttonOption}
              onPress={() => {
                dispatch(changeFilterBy("fullName"));
                setModalVisible(!modalVisible);
                setInputDate(false);
              }}
            >
              <Ionicons
                name={"person-outline"}
                size={20}
                color={"black"}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textStyle}>Name</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* //*Open modal */}
      <Button
        style={[styles.button, styles.filterBy, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="filter-outline"
          //size={RFPercentage(2)}
          color="black"
          style={{ marginHorizontal: 5, fontSize: 25 }}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  searcher: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#F7F8FA",
  },
  filterBy: {
    marginLeft: 20,
  },
  //*Modal
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    
  },
  //Styles in modal filter Users
  modalView: {
    // margin: 10,
    width: "100%",
    borderRadius: 10,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    backgroundColor: "#b8bfcc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOption: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    borderRadius: 7,
    padding: 2,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "400",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
