import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { styles } from "./BackButtonStyles";

interface Props {
  onPress: () => void;
  disabled: boolean,
}

//Este componente espera la funcion de redireccion correspondiente

export const BackButton = ({
  onPress,
  disabled
}: Props) => {

  return (
    <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={styles.backButton}
          disabled={disabled}
        >
          <Text style={{ color: "orange", fontWeight: "bold", fontSize: 16 }}>
            Back
          </Text>
        </TouchableOpacity>
  );
};

