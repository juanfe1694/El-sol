import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { View, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { TextInput } from 'react-native-paper';

type key = { [key:string] : string; }
type formikOther = {Value: string; Other: string}
interface Props{
    label: string;
    name: string;
    baseName: string;
    placeholder?: string;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
    validaterequiredfields: (fields: Fields) => void;
    [x:string]:any
}
export const InputOtherComponent = ({
  label, 
  formik, 
  validaterequiredfields, 
  name,
  baseName,
  placeholder
} : Props) => {

    const { errors, values, handleChange, handleBlur } = formik;
    const [otherValue, setotherValue] = useState('');

       useEffect(() => {
        const fieldName : formikOther = values[baseName] as formikOther;
        if(fieldName){
          setotherValue(fieldName.Other)
        }
       }, [])
       
    const onInputChange = (value : NativeSyntheticEvent<TextInputChangeEventData>) => {
      handleChange(name)(value.nativeEvent.text)
      setotherValue(value.nativeEvent.text)
      const fieldInfo : Fields = {
        name: name,
        value: value.nativeEvent.text
      }
      validaterequiredfields(fieldInfo);
    }

  return (
          <View style={{marginTop: 20}}>
              <Text> { label } </Text>
              <TextInput
                  mode='flat'
                  onBlur={handleBlur(name)}
                  value={otherValue}
                  placeholder={placeholder}
                  onChange={onInputChange}
                  activeUnderlineColor='black'
                  style={{backgroundColor:'white'}}
                  error={errors[name]? true : false}
                />              
          </View>
  )
}
