import { FormikProps } from "formik";
import InputSpinner from "react-native-input-spinner";
import { useEffect, useState } from "react";
import { Fields } from "../../../interfaces/form/formInUseInterfaces";
import { View, Text } from "react-native";

type key = {
  [key: string]: string;
};
interface Props {
  label: string;
  name: string;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
}
export const InputNumberComponent = ({
  label,
  name,
  isRequired,
  validaterequiredfields,
  formik,
}: Props) => {
  const [value, setvalue] = useState<number>(0);
  const { errors, setFieldValue, values } = formik;

  useEffect(() => {
    const initialValue = values[name] ? parseInt(values[name] as string) : 0;
    setvalue(initialValue);
  }, []);

  const onChange = (value: number) => {
    setvalue(value as number);

    const formValue = value?.toString();
    setFieldValue(name, formValue);

    const fieldInfo: Fields = {
      name: name,
      value: value?.toString() as string,
    };
    validaterequiredfields(fieldInfo);
  };

  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        {label}
      </Text>
      <Text style={{ marginTop: 20, alignSelf: "center" }}>
        <InputSpinner
          skin="clean"
          step={1}
          value={value}
          onChange={(num: number) => onChange(num)}
        />
      </Text>

      {errors[name] && (
        <Text style={{ alignSelf: "flex-end", color: "red" }}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};
