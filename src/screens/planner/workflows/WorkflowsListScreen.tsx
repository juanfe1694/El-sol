import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { WorkflowsList } from "../../../components/planner/workflowSection/WorkflowsList";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { useAppSelector } from "../../../app/hooks";
import { useIsFocused } from "@react-navigation/native";

/* This component is responsible for rendering a view that includes 
  a `WorkflowsList` component and an `OverlayScreen` component. */
export const WorkflowsListScreen = () => {
  const { project } = useAppSelector((state) => state.project);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>
      <WorkflowsList
        projectId={project.workFlowId}
        setOverlayOptions={setOverlayOptions}
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      {overlayVisible && (
        <OverlayScreen
          overlayProps={overlayOptions as OverlayProps[]}
          overlayVisible={overlayVisible}
          setoverlayVisible={setOverlayVisible}
        />
      )}
    </View>
  );
};
