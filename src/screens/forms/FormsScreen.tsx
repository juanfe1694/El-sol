import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationProps } from "../../interfaces/functionalInterfaces";

export const FormsScreen = ({ navigation } : NavigationProps) => {
  return (
    <View>
      <Text>FormsScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('FormRendererScreen', {
          formInUseId: '64776df54c534a548b4f948a'
        })}
      >
        <Text>Renderer</Text>
      </TouchableOpacity>
    </View>
  );
};
