import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

export interface DropDownValue {
    label: string;
    value: string | number;
}

interface DropdownProps {
    displayLabel: string;
    defaultValue: DropDownValue;
    optionList: DropDownValue[];
    onInputChange: (option: DropDownValue) => void;
    disabled?: boolean;
}

export const DropDownComponent = ( { 
    displayLabel,
    defaultValue,
    optionList,
    onInputChange,
    disabled = false
} : DropdownProps ) => {

  return (
    <View style={{ alignItems: 'center'}}>
              <SelectDropdown
                  buttonStyle={{ 
                    backgroundColor: 'white'
                  }}
                  disabled={disabled}
                  dropdownStyle={{borderRadius: 10}}
                  defaultButtonText={displayLabel}
                  defaultValue={defaultValue}
                  renderDropdownIcon={() => <Ionicons
                    name={"chevron-down-outline"}
                    size={20}
                    color={"black"}
                    style={{ marginRight: 15 }}
                  />}
                  data={optionList}
                  onSelect={(selectedItem, index) => {
                    onInputChange(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.label
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.label
                  }}
                />
            </View>
  )
}
