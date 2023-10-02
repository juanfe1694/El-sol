import { Text, View } from "react-native";
import { ProjectList } from "../../components/planner/projectSection/ProjectList";
import React, { useEffect, useState } from "react";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../overlay/OverlayScreen";
import { FormsInUseByProject } from "../../components/forms/formInUse/FormsInUseByProject";
import { useIsFocused } from "@react-navigation/native";


export const FormsInUseScreen = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])
  
  return (
    <View style={{ flex: 1 }}>
      <FormsInUseByProject
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
