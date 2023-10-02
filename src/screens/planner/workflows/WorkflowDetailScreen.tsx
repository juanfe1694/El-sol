import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationProps } from "../../../interfaces/functionalInterfaces";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { WorkFlowI } from "../../../interfaces/planner/workflow/workflowInterface";
import { fetchWorkflowByIdThunk } from "../../../redux/thunks/planner/workflow/workflowThunk";
import { WorkflowDetail } from "../../../components/planner/workflowSection/WorkflowDetail";
import LoadingScreen from "../../LoadingScreen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TaskDetailHeader } from "../../../components/planner/taskSection/TaskDetailHeader";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { useIsFocused } from "@react-navigation/native";

export const WorkflowDetailScreen = ({
  route,
  navigation,
}: NavigationProps) => {
  const { workflow, isLoading, isLoadingWorkFlow, error } = useAppSelector(
    (state) => state.workflow
  );

  const { workflowId } = route?.params || {};

  /**Overlay dependencies */
  const [overlayVisible, setoverlayVisible] = useState(false);
  const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([]);
  const [localWorkflow, setLocalWorkflow] = useState<WorkFlowI>(
    {} as WorkFlowI
  );
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setoverlayVisible(false);
  }, [isFocused])

  useEffect(() => {
    /**Dispatch fetch workflow by id */

    dispatch(fetchWorkflowByIdThunk(workflowId));
  }, [workflowId]);

  useEffect(() => {
    /**Set response in localWorkflow state */
    setLocalWorkflow(workflow);
  }, [workflow]);

  useEffect(() => {
    /* This code is conditionally setting the options for the navigation header based on the values
        of `isLoading` and `isLoadingWorkFlow` variables. */
    isLoading || isLoadingWorkFlow
      ? navigation.setOptions({ headerShown: false })
      : navigation.setOptions({
          title: workflow?.title,
          headerTitleStyle: { fontSize: RFPercentage(2.5) },
          headerRight: () => (
            <TaskDetailHeader displayOverlay={displayOverlay} />
          ),
          headerShown: true,
        });
  }, [isLoading, isLoadingWorkFlow]);

  /**Show overlay with asigned properties*/
  const displayOverlay = () => {
    setoverlayVisible(true);

    //Add option to menu
    const overlayOptions: OverlayProps[] = [];
    overlayOptions.push({
      option: "Milestones",
      icon: "git-network-outline",
      action: () =>
        navigation.navigate("MilestonesListScreen", {
          workflowId: workflow.id,
        }),
    });

    setoverlayProps(overlayOptions);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading || isLoadingWorkFlow ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <WorkflowDetail workflow={localWorkflow} />
        </View>
      )}
      <OverlayScreen
        overlayVisible={overlayVisible}
        setoverlayVisible={setoverlayVisible}
        overlayProps={overlayProps}
      />
    </View>
  );
};
