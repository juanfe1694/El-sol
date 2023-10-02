import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationProps } from "../../../interfaces/functionalInterfaces";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { RFPercentage } from "react-native-responsive-fontsize";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { TaskStates } from "../../../data/TaskStates";
import LoadingScreen from "../../LoadingScreen";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ProjectDetail } from "../../../components/planner/projectSection/ProjectDetail";
import { fetchProjectsByIdThunk } from "../../../redux/thunks/planner/projects/projectThunk";
import React from "react";
import { ProjectDetailHeader } from "../../../components/planner/projectSection/ProjectDetailHeader";
import { useIsFocused } from "@react-navigation/native";

export const ProjectDetailScreen = ({ route, navigation }: NavigationProps) => {
  const { project, isLoading } = useAppSelector((state) => state.project);

  /**Overlay dependencies */
  const [overlayVisible, setoverlayVisible] = useState(false);
  const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([]);
  const [mapStates, setmapStates] = useState<{ [key: number]: string }>(
    TaskStates
  );

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setoverlayVisible(false);
  }, [isFocused])

  const onPress = () => {
    navigation.navigate("WorkflowsListScreen");
  };

  const displayOverlay = () => {
    setoverlayVisible(true);
    const overlayOptions: OverlayProps[] = [];
    overlayOptions.push({
      option: "Workflows",
      action: () => onPress(),
      icon: 'git-network-outline'
    });
    setoverlayProps(overlayOptions);
  };

  useEffect(() => {
    dispatch(fetchProjectsByIdThunk(route?.params?.projectId)).then((task) => {
      setoverlayVisible(false);
      navigation.setOptions({
        //title: project?.projectName,
        headerTitleStyle: { fontSize: RFPercentage(2.5) },
        headerRight: () => (
          <ProjectDetailHeader displayOverlay={displayOverlay} />
        ),
      });
    });

  }, []);

  return (
    <>
      {isLoading ? (
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
            <ProjectDetail project={project} />
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
