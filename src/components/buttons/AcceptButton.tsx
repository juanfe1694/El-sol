import { Text, TouchableOpacity } from "react-native";
import { acceptStyles } from "./AcceptButtonStyles";

interface Props {
  onPress: () => void;
  disabled: boolean;
  title: string;
  from: "user" | "login" | "register";
}

export const AcceptButton = ({ onPress, disabled, title, from }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={
        from === "user" ? acceptStyles.saveUser :
        from === "register" && disabled === true ? acceptStyles.enterBottonDisable :  acceptStyles.enterBotton
      }
      disabled={disabled}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
