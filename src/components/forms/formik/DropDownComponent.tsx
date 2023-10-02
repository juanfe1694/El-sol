import { FormikProps } from "formik";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect, useState } from "react";
import { OptionsObject } from "../../../interfaces/form";
import {
  Fields,
  QuestionPos,
} from "../../../interfaces/form/formInUseInterfaces";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputOtherComponent } from "./InputOtherComponent";

type key = { [key: string]: string };
type formikOther = { Value: string; Other: string };
interface Props {
  label: string;
  name: string;
  placeholder?: string;
  options: OptionsObject[];
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  shrinkFormTemplates: (question: QuestionPos) => void;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
  [x: string]: any;
}
//SelectItemOptionsType

export const DropDownComponent = ({
  label,
  formik,
  options,
  description,
  other,
  otheroptionlabel,
  otheroptionlabelplaceholder,
  shrinkFormTemplates,
  validaterequiredfields,
  isRequired,
  placeholder,
  ...props
}: Props) => {
  const [showOther, setshowOther] = useState(false);
  const [defaultValue, setdefaultValue] = useState(placeholder);
  const { errors, setFieldValue, values } = formik;

  const gridOptionsMap: { [x: string]: string } = {};
  const optionList = [];

  options.map((x) => {
    optionList.push(x.Option);
  });

  const getName = (input: string) => {
    if (input == "Other" && !other) {
      return props.name;
    }
    return gridOptionsMap[input];
  };

  useEffect(() => {
    const fieldInfo: Fields = {
      name: props.name,
      value: "",
    };
    const formikValues: formikOther = values[props.name] as formikOther;
    setdefaultValue(formikValues.Value);

    if (other) {
      if (formikValues.Value == "Other") {
        setshowOther(true);
      } else {
        setshowOther(false);
        formikValues.Other = " ";
        fieldInfo.value = JSON.stringify(formikValues);
      }
    }

    fieldInfo.value = values[props.name] as string[];
    validaterequiredfields(fieldInfo);
  }, [values[props.name]]);

  if (other) {
    optionList.push("Other");

    gridOptionsMap["Drop"] = `${props.name}.Value`;
    gridOptionsMap["Other"] = `${props.name}.Other`;
  } else {
    gridOptionsMap["Drop"] = props.name;
  }

  const onInputChange = async (value: string) => {
    setFieldValue(getName("Drop"), value);

    if (value == "Other") {
      setFieldValue(getName("Other"), "");
    }

    let logicalPosition = 0;

    let optionSelected = options.find((x) => x.Option == value);

    let indexOptionSelected = -1;
    if (optionSelected)
      indexOptionSelected = options.indexOf(optionSelected as OptionsObject);

    let optionLogicalPosition = optionSelected?.LogicalPosition as number;
    value == "Other"
      ? (logicalPosition = 0)
      : (logicalPosition = optionLogicalPosition);

    const nextQuestion: QuestionPos = {
      logicalPosition: logicalPosition || 0,
      questionId: props.name,
      questionArrayIndex: indexOptionSelected,
    };

    shrinkFormTemplates(nextQuestion);
  };

  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        {label}
      </Text>

      <View style={{ alignItems: "center" }}>
        <SelectDropdown
          buttonStyle={{
            width: "100%",
            backgroundColor: "white",
            borderBottomColor: errors[props.name] ? "red" : "gray",
            borderBottomWidth: 2,
          }}
          dropdownStyle={{ borderRadius: 10 }}
          defaultButtonText={placeholder}
          defaultValue={defaultValue}
          renderDropdownIcon={() => (
            <Ionicons
              name={"chevron-down-outline"}
              size={20}
              color={"black"}
              style={{ marginRight: 15 }}
            />
          )}
          data={optionList}
          onSelect={(selectedItem, index) => {
            onInputChange(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>

      {showOther && (
        <InputOtherComponent
          label={otheroptionlabel}
          name={getName("Other")}
          baseName={props.name}
          placeholder={otheroptionlabelplaceholder}
          validaterequiredfields={validaterequiredfields}
          formik={formik}
        />
      )}
      {errors[props.name] && (
        <Text style={{ alignSelf: "flex-end", color: "red" }}>
          Mandatory answer
        </Text>
      )}
    </View>
  );
};
