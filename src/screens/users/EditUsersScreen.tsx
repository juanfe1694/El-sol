import React from "react";
import { View } from "react-native";
import { EditUser } from "../../components/user/EditUser";

export const EditUsersScreen = () => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "center", paddingHorizontal: 20, }}>
    
      <EditUser />
    </View>
  );
};
