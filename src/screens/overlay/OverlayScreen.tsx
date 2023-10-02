import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Divider } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  overlayVisible: boolean;
  setoverlayVisible: (state: boolean) => void;
  overlayProps: OverlayProps[];
}

/** This component displays an overlay menu. takes in three props:
* @param {boolean} overlayVisible - The value of overlay visibility.
* @param {Function} setoverlayVisible - The function that changes the overlay menu visibility.
* @param {OverlayProps[]} overlayProps - The function that sets menu props. */
export const OverlayScreen = ({
  overlayVisible,
  setoverlayVisible,
  overlayProps,
}: Props) => {
  const navigation = useNavigation();

  /* The `useEffect` hook is used to modify the visibility of tab bar 
      when the component is mounted and unmounted. */
  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.setOptions({ tabBarStyle: {} });
    };
  }, []);

  const onClose = () => {
    setoverlayVisible(false);
  };

  return (
    <>
    {/** Overlay fullscreen */}
    {overlayVisible && (
      <TouchableOpacity
        style={overlayStyles.overlayContainer}
        activeOpacity={1}
        onPress={onClose}
      > 
        <View style={overlayStyles.optionsContainer}>
          <Text style={overlayStyles.title}>Options</Text>
        </View>
        
        {overlayProps?.length > 0 &&
          overlayProps?.map(({ option, action, icon} : OverlayProps) => (
            /** Render options */
            <TouchableOpacity
              key={option}
              onPress={action}
              activeOpacity={0.8}
            >
              <View style={overlayStyles.optionsContainer}>
                <Ionicons
                  name={icon}
                  size={RFPercentage(2.5)}
                  color="black"
                />
                <Text>{"  "}</Text>
                <Text style={overlayStyles.text}>{option}</Text>
              </View>
              <Divider />
            </TouchableOpacity>
          ))}
      </TouchableOpacity>
    )}
  </>
);
};

{/** Styles */}
const overlayStyles = StyleSheet.create({
  overlayContainer: {
    zIndex: 9999,
    position: "absolute",
    maxHeight: Dimensions.get("window").height,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  optionsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: RFPercentage(1),
    alignItems: "center",
  },
  text: {
    fontSize: RFPercentage(2.3),
  },
  title: {
    fontSize: RFPercentage(2.3),
    fontWeight: "400",
  },
});
