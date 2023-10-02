import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import LoadingScreen from "../../LoadingScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { useSyncFilledForms } from "../../../hooks/conectivity/useSyncFilledForms";
import { FormsToSaveList } from "../../../components/forms/filled forms/FormsToSaveList";
import { useIsFocused } from "@react-navigation/native";

export const FormsToSaveScreen = () => {
  const [overlayVisible, setoverlayVisible] = useState(false);
  const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([]);
  const { isLoading } = useSyncFilledForms();
  const isFocused = useIsFocused();

  useEffect(() => {
    setoverlayVisible(false);
  }, [isFocused])

  return (
    <View style={filledFormStyles.mainContainer}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FormsToSaveList
          setoverlayProps={setoverlayProps}
          setoverlayVisible={setoverlayVisible}
        />
      )}
      <OverlayScreen
        overlayVisible={overlayVisible}
        setoverlayVisible={setoverlayVisible}
        overlayProps={overlayProps}
      />
    </View>
  );
};

const filledFormStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
