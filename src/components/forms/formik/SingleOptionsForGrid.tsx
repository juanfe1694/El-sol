import { FormikProps } from "formik";
import { SetStateAction, useEffect, useState } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

type key = { [key: string]: string };
interface OptionsProps {
  name: string;
  type?: "text" | "password" | "email";
  columns: string[];
  label: string;
  dimensions: number[];
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
}

export const SingleOptionsForGrid = ({
  columns,
  name,
  formik,
  dimensions,
}: OptionsProps) => {
  const { setFieldValue, values } = formik;
  const [selectedOption, setSelectedOption] = useState("");

  const baseName = name;
  const getName = baseName.split(".", 2);
  const val: key = values[getName[0]] as key;

  useEffect(() => {
    setSelectedOption(val[getName[1]]);
  }, [getName]);

  const onInputChange = (event: SetStateAction<string>) => {
    setSelectedOption(event);
    setFieldValue(name, event);
  };

  return (
    <View>
      <RadioButton.Group
        onValueChange={(newValue) => onInputChange(newValue)}
        value={selectedOption}
      >
        <View style={{ flexDirection: "row" }}>
          {columns.map((z: string, index) => (
            <View key={z} style={{ flex: 1, width: dimensions[index] }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RadioButton color="#0d3c61" value={z} />
              </View>
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};
