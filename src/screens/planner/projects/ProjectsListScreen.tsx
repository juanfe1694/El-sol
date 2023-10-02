import { View } from "react-native";
import { ProjectList } from "../../../components/planner/projectSection/ProjectList";
import React, { useEffect, useState } from "react";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { useIsFocused } from "@react-navigation/native";

export const ProjectListScreen = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])
  
  return (
    <View style={{ flex: 1 }}>
      <ProjectList
        setOverlayOptions={setOverlayOptions}
        setOverlayVisible={setOverlayVisible}
        overlayVisible={overlayVisible}
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
