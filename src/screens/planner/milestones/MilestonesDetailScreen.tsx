import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationProps } from "../../../interfaces/functionalInterfaces";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { RFPercentage } from "react-native-responsive-fontsize";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import LoadingScreen from "../../LoadingScreen";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import React from "react";
import { MilestoneDetailHeader } from "../../../components/planner/milestoneSection/MilestoneDetailHeader";
import { fetchMilestonesByIdThunk } from "../../../redux/thunks/planner/milestones/milestonesThunk";
import { MilestoneDetail } from "../../../components/planner/milestoneSection/MilestonesDetail";
import { startLoading } from "../../../redux/slices/planner/task/taskSlice";
import { useIsFocused } from "@react-navigation/native";

export const MilestoneDetailScreen = ({
  route,
  navigation,
}: NavigationProps) => {
  const { milestone, isLoadingMilestoneById } = useAppSelector(
    (state) => state.milestone
  );

  /**Overlay dependencies */
  const [overlayVisible, setoverlayVisible] = useState(false);
  const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([]);
  const dispatch = useAppDispatch();
  
  const isFocused = useIsFocused();

  useEffect(() => {
    setoverlayVisible(false);
  }, [isFocused])
  

  const onPress = () => {
    dispatch(startLoading())
    navigation.navigate("TaskListScreen", {
      milestoneId: route?.params?.milestoneId,
    });
  };

  const displayOverlay = () => {
    setoverlayVisible(true);
    const overlayOptions: OverlayProps[] = [];
    overlayOptions.push({
      option: "Task",
      action: () => onPress(),
    });
    setoverlayProps(overlayOptions);
  };

  useEffect(() => {
    dispatch(fetchMilestonesByIdThunk(route?.params?.milestoneId)).then(
      (task) => {
        setoverlayVisible(false);
        navigation.setOptions({
          //title: milestone?.projectName,
          headerTitleStyle: { fontSize: RFPercentage(2.5) },
          headerRight: () => (
            <MilestoneDetailHeader displayOverlay={displayOverlay} />
          ),
        });
      }
    );
  }, []);

  return (
    <>
      {isLoadingMilestoneById ? (
        <View style={taskDetailStyles.mainContainer}>
          <LoadingScreen />
        </View>
      ) : (
        <View style={taskDetailStyles.mainContainer}>
          <OverlayScreen
            overlayVisible={overlayVisible}
            setoverlayVisible={setoverlayVisible}
            overlayProps={overlayProps}
          />

          <View style={taskDetailStyles.detailContainer}>
            <MilestoneDetail milestone={milestone} />
          </View>
        </View>
      )}
      <Toast />
    </>
  );
};

const taskDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  detailContainer: {
    flex: 1,
  },
  formListContainer: {
    flex: 1,
  },
});
