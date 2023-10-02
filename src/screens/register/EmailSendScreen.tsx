import React from "react";
import { View } from "react-native";
import { EmailSend } from "../../components/Register/EmailSend";
import CommonFrame from "../../components/common/CommonFrame";

//interface Props extends NativeStackScreenProps<any, any> {}

export const EmailSendScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CommonFrame />
      <EmailSend />
    </View>
  );
};
