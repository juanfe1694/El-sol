import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const FormRenderStyles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    fontSize: RFPercentage(2),
    marginVertical: 10,
    textAlign: "center",
  },
});