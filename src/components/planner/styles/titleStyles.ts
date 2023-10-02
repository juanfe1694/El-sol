import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const titleStyles = StyleSheet.create({
   titleProject: {
    fontWeight: 'bold',
    fontSize: RFPercentage(3),
  },
  title: {
    marginLeft: "5%",
    marginVertical: "2%",
    fontWeight: "500",
    fontSize: RFPercentage(3),
  },
  subTitle: {
    fontSize: RFPercentage(2.5),
  },

});