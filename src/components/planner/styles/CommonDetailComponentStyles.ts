import { Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

const screenWidth = Dimensions.get("screen").width;

export const commonDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RFPercentage(2),
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remainingTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: RFPercentage(3),
  },
  taskDetailContainer: {
    flex: 2,
    marginTop: RFPercentage(5),
    alignItems: "center",
  },
  remainingTime: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    backgroundColor: "#17a5e6",
    borderRadius: RFPercentage(3),
    justifyContent: "center",
    alignItems: "center",
  },
  generalText: {
    fontSize: RFPercentage(2.3),
  },
  remainingDateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFPercentage(4),
  },
  remainingDescriptionText: {
    color: "white",
    fontSize: RFPercentage(2.3),
  },
  detailView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetailView: {
    width: screenWidth / 2.5,
    margin: RFPercentage(1.5),
    padding: RFPercentage(1.5),
    backgroundColor: "white",
  },
  cardStateDetailView: {
    alignItems: "center",
  },
  datailViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  sectionTitle:{
    fontSize: RFPercentage(2.8),
    marginVertical: RFPercentage(1),
    fontWeight: '600'
  },

  /** Workflow detail */
  workFlowSections:{
    flex: 1,
    marginTop: RFPercentage(5)
  }
});