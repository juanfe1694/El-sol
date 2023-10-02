import {
  StyleSheet,
} from "react-native";

export const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    width: 360,
    height: 90,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 15,
  },
  leftCard: {
    flexDirection: "row",
  },
  wraperName: {
    width: 265,
    justifyContent: "space-between",
  },
  userImage: {
    marginHorizontal: 10,
    marginTop: 10,
    width: 42,
    height: 42,
    borderRadius: 150,
    resizeMode: "cover",
  },
  placeHolderImg: {
    marginHorizontal: 10,
    marginTop: 10,
    width: 42,
    height: 42,
    borderRadius: 150,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfig: {
    width: 30,
    right: -25,
    position: "absolute",
  },
  textName: {
    fontSize: 14,
    fontWeight: "500",
  },

});
