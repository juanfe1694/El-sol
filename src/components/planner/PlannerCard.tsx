import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { OverlayProps } from "../../interfaces/overlay/overlayInterfaces";
import { Ionicons } from "@expo/vector-icons";
import { PriorityComponent } from "./PriorityComponent";

interface PlannerCardProps {
  title: string;
  entityId: number;
  priority: string;
  date: string;
  setOverlayVisible?: (displayOverlay: boolean) => void;
  setOverlayOptions? : (overlayOptions: OverlayProps[]) => void;
  options: OverlayProps[];
  isSelected?: boolean;
}

export const PlannerCard = ({
  title,
  priority,
  entityId,
  date,
  options,
  setOverlayVisible,
  setOverlayOptions,
  isSelected,
}: PlannerCardProps) => {

  const displayOverlay = () => {
    setOverlayVisible && setOverlayVisible( true )
    setOverlayOptions && setOverlayOptions( options )
  }


  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        cardStyles.mainCardContainer,
        { backgroundColor: isSelected ? '#F0F0F0' : 'white' },
      ]}
      onPress={displayOverlay}
    >
      <View style={cardStyles.mainContainer}>
        <Text style={cardStyles.title}>{title}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <IconButton
            icon="dots-horizontal"
            size={RFPercentage(3)}
            onPress={displayOverlay}
          />
        </View>
      </View>
      <View style={cardStyles.subtitleContainer}>
        <View
          style={{
            backgroundColor: 'white',
            borderColor: '#F0F0F0',
            borderWidth: 1,
            borderRadius: 12,
            marginHorizontal: 15,
            padding: 5,
          }}
        >
          <Text style={{ color: '#606c80', fontWeight: '500' }}>
            {`# ${entityId}`}
          </Text>
        </View>
        <PriorityComponent priority={priority} />
      </View>
      <Text style={cardStyles.priority}>
        <Ionicons name="calendar-outline" size={RFPercentage(2.5)} /> {date}
      </Text>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  mainCardContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 10,
    marginVertical: RFPercentage(2),
    paddingLeft: RFPercentage(2),
    borderRadius: 4,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -15,
    marginBottom: 12,
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    marginRight: RFPercentage(1),
  },
  priority: {
    fontSize: RFPercentage(2),
  },
  subtitle: {
    fontSize: RFPercentage(1),
  },
});
