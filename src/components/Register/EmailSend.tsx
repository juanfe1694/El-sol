import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { registerStyles } from "../../components/Register/RegisterStyles";
import { BackButton } from "./../buttons/BackButton";

export const EmailSend = () => {
  const navigate = useNavigation();

  return (
    <View style={registerStyles.container}>
      <View style={registerStyles.titleContainer}>
        <Text style={[registerStyles.title, { marginBottom: 25 }]}>
          Confirm your email
        </Text>

        <View style={{ flexDirection: "row", paddingBottom: 50 }}>
          <Text style={registerStyles.subTitle}>
            Confirm your email address by clicking the link in the email we sent.
          </Text>
        </View>

        <BackButton
          onPress={() => navigate.navigate("LoginScreen")} disabled={false}          
          />
      </View>
    </View>
  );
};
