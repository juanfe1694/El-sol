
import { View, Platform, KeyboardAvoidingView } from 'react-native';

import { registerStyles } from "../../components/Register/RegisterStyles";
import { Register } from "../../components/Register/Register";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from 'react';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = (props: Props) => {

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={registerStyles.container}>
        <Register {...props} />
      </View>
    </KeyboardAvoidingView>
  );
};
