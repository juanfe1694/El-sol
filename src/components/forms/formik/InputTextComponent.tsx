import { FormikProps } from "formik";
import { Fields } from "../../../interfaces/form/formInUseInterfaces";
import { TextInput } from "react-native-paper";
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";

type key = { [key: string]: string };
interface Props {
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  label: string;
  name: string;
  placeholder?: string;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
}

export const InputTextComponent = ({
  formik,
  label,
  name,
  validaterequiredfields,
  placeholder,
  isRequired,
}: Props) => {
  const { setFieldValue, handleBlur, values, errors } = formik;

  const onInputChange = (
    value: string 
  ) => {
    
    setFieldValue(name, value);
    const fieldInfo: Fields = {
      name: name,
      value: value,
    };
    validaterequiredfields(fieldInfo);
  };

  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        {label}
      </Text>
      <TextInput
        onChangeText={(value) => onInputChange(value)}
        mode="flat"
        onBlur={handleBlur(name)}
        value={values[name] as string}
        placeholder={placeholder}
        activeUnderlineColor="black"
        style={{ backgroundColor: "white" }}
        error={errors[name] ? true : false}
      />
      <View>
        {errors[name] && (
          <Text style={{ alignSelf: "flex-end", color: "red" }}>
            {errors[name]}
          </Text>
        )}
      </View>
    </View>
  );
};
