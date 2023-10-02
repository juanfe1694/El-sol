import { FormikProps } from "formik";
import { Rating } from "react-native-ratings";
import { useEffect, useState } from "react";
import { Fields } from "../../../interfaces/form/formInUseInterfaces";
import { View, Text } from "react-native";

type key = {
  [key: string]: string;
};

interface Props {
  label: string;
  name: string;
  type?: "range";
  placeholder?: string;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
  [x: string]: any;
}
export const ValorationComponent = ({
  label,
  other,
  otheroptionlabel,
  fieldConfiguration,
  description,
  otheroptionlabelplaceHolder,
  formik,
  isRequired,
  validaterequiredfields,
  ...props
}: Props) => {
  const [value, setvalue] = useState(0);
  const { Icon, Color } = fieldConfiguration;

  useEffect(() => {
    if (formik.values[props.name] != "")
      setvalue(parseInt(formik.values[props.name] as string));

    const fieldInfo: Fields = {
      name: props.name,
      value: formik.values[props.name] as string,
    };

    validaterequiredfields(fieldInfo);
  }, [formik.values[props.name]]);

  const onChange = (value: number) => {
    formik.setFieldValue(props.name, value.toString());
  };

  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        {label}
      </Text>
      <View>
        <Rating
          type="star"
          startingValue={value}
          ratingCount={5}
          imageSize={30}
          onFinishRating={onChange}
        />
      </View>
    </View>
  );
};
