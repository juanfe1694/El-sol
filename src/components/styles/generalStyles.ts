import { RFPercentage } from "react-native-responsive-fontsize";
import { StyleSheet } from 'react-native';

export const iconSize = RFPercentage(3);

export const paginatorStyles = StyleSheet.create({
  paginator: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  }
})
