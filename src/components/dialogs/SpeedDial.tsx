import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface Props {
  items: any[];
  showDialog: boolean;
}

export const SpeedDial = ({ items, showDialog }: Props) => {
  return (
    <View style={styles.speedDial}>
      {showDialog && (
        <View>
          {items.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={item.onPress}
                style={styles.dialogButton}
                disabled={item.disabled}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dialogButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  //Dialog
  speedDial: {
    backgroundColor: "white",
    borderRadius: 5,
    position: "absolute",
    top: 25,
    right: 10,
    elevation: 2,
  },
});
