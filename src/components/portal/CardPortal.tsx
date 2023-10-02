import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

type Args = {
  title: string;
  description: string;
  to: string;
  icon: string;
  textColor: string;
  entity: string;
};

export const CardPortal = ({
  title,
  description,
  to,
  icon,
  textColor,
  entity,
}: Args) => {
  const navigation = useNavigation();

  const navigateMap: { [key: string]: () => void } = {
    PlannerScreen: () => {
      navigation.navigate("PlannerScreen");
    },
    UsersScreen: () => {
      navigation.navigate("UsersScreen");
    },

    FormsScreen: () => {
      navigation.navigate("FormsScreen");
    }

  };

  return (
    <View style={portalStyles.CardPortal}>
      <TouchableOpacity onPress={navigateMap[to]}>
        <Ionicons
          name={
            icon === "file-tray-full-outline"
              ? "file-tray-full-outline"
              : icon === "folder-outline"
              ? "folder-outline"
              : icon === "people-outline"
              ? "people-outline"
              : "help-circle-outline"
          }
          size={RFPercentage(4)}
          color={textColor}
          style={{ alignSelf: "center" }}
        />
        <Text style={{ ...portalStyles.CardTitle, color: textColor }}>
          {" "}
          {title}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const portalStyles = StyleSheet.create({
  CardPortal: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F7F8FA",
    padding: 5,
    borderRadius: 15,
    width: RFPercentage(15),
    height: RFPercentage(15),
    margin: 20,
  },
  CardTitle: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },
});
