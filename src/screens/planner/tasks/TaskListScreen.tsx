import { View } from "react-native";

import { useEffect, useState } from "react";
import { TaskList } from "../../../components/planner/taskSection/TaskList";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { NavigationProps } from "../../../interfaces/functionalInterfaces";
import React from "react";
import { useIsFocused } from "@react-navigation/native";

export const TaskListScreen = ({ route, navigation }: NavigationProps) => {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>
      <TaskList
        milestoneId={route?.params?.milestoneId}
        setOverlayOptions={setOverlayOptions}
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
