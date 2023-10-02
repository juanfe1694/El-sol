import { FormikProps } from "formik";
import { useEffect } from "react";
import { Fields } from "../../../interfaces/form/formInUseInterfaces";
import { MultipleOptionsForGrid } from "./MultipleOptionsForGrid";
import { View, Text, ScrollView } from "react-native";
import * as Yup from "yup";

type key = { [key: string]: string };

interface Props {
  label: string;
  name: string;
  type?: "checkbox";
  placeholder?: string;
  validaterequiredfields: (fields: Fields) => void;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  isRequired?: boolean;
  validations: Yup.ObjectSchema<{ [x: string]: any }, Yup.AnyObject>;
  [x: string]: any;
}

export const MultipleOptionGridComponent = ({
  label,
  options,
  description,
  other,
  otheroptionlabel,
  otheroptionlabelplaceHolder,
  isRequired,
  validaterequiredfields,
  formik,
  validations,
  ...props
}: Props) => {
  const { values } = formik;
 
  useEffect(() => {
    const fieldInfo: Fields = {
      name: props.name,
      value: values[props.name] as string[],
    };
    validaterequiredfields(fieldInfo);
  }, [values[props.name]]);


  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        {label}
      </Text>
      <ScrollView horizontal>
        <View>
          <View
            style={{ flexDirection: "row", flexWrap: "nowrap", marginTop: 15 }}
          >
            <View>
              <View style={{ flex: 1 }}></View>

              {options.Rows.map((z: string) => (
                <View key={z} style={{ flex: 1, justifyContent: "center" }}>
                  <View>
                    <Text> {z} </Text>
                  </View>
                </View>
              ))}
            </View>
            {options.Columns.map((x: string, index: number) => (
              <MultipleOptionsForGrid
                name={props.name}
                columns={options.Columns}
                rows={options.Rows}
                key={x}
                formik={formik}
                index={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>

    </View>
  );
};
