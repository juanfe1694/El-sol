import React from "react";
import { View } from "react-native";
import { CreateUser } from "../../components/user/CreateUser";

export const CreateUserScreen = () => {
  return (
    <View style={{flex: 1}}>
      <CreateUser />
    </View>
  );
};
