import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  priority: string;
}

export const PriorityComponent = ({ priority }: Props) => {
  return (
    <>
      {priority === "Low" ? (
        <View style={styles.badgeLow}>
          <Text style={styles.textLow}>{priority}</Text>
        </View>
      ) : priority === "Medium" ? (
        <View style={styles.badgeMedium}>
          <Text style={styles.textMedium}>{priority}</Text>
        </View>
      ) : priority === "High" ? (
        <View style={styles.badgeHigh}>
          <Text style={styles.textHigh}>{priority}</Text>
        </View>
      ) : (
        <View style={styles.badgeNone}>
          <Text style={styles.textNone}>{priority}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  badgeHigh: {
    backgroundColor: "#CC292929",
    borderRadius: 12,
  },
  textHigh: {
    color: "#d81d47",
    fontWeight: "500",
    padding: 5
  },
  badgeMedium: {
    backgroundColor: "#FFE04033",
    borderRadius: 12,
  },
  textMedium: {
    color: "#ffcc32",
    fontWeight: "500",
    padding: 5
  },
  badgeLow: {
    backgroundColor: "#61C4544D",
    borderRadius: 12,
  },
  textLow: {
    color: "#16a34a",
    fontWeight: "500",
    padding: 5
  },
  badgeNone: {
    backgroundColor: "#ebeef2",
    borderRadius: 12,
  },
   textNone: {
    fontWeight: "500",
    padding: 4
  }
});
