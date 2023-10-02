import { View } from "react-native";

import { useEffect, useState } from "react";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { NavigationProps } from "../../../interfaces/functionalInterfaces";
import React from "react";
import { TaskGeneralList } from "../../../components/planner/taskSection/TaskGeneralList";
import { useAppSelector } from "../../../app/hooks";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { styles } from '../../../components/buttons/BackButtonStyles';
import { useIsFocused } from "@react-navigation/native";

export const TaskGeneralListScreen = () => {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])

  return (
    <View style={{ flex: 1 }}>
      <TaskGeneralList
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
