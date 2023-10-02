import { FormikProps } from 'formik';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { View, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { TextInput } from 'react-native-paper';

type key = { [key:string] : string; }
interface Props{
    label: string;
    name: string;
    placeholder?: string;
    validaterequiredfields: (fields: Fields) => void;
    isRequired?:boolean;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
}
export const InputTextAreaComponent = ({
  label,
  name, 
  isRequired,
  placeholder, 
  validaterequiredfields,
  formik} : Props) => {
    
    const {setFieldValue, handleBlur, values, errors } = formik;

    const onInputChange = (value : string) => {
      setFieldValue(name, value);
      const fieldInfo : Fields = {
        name: name,
        value: value
      }
  
      validaterequiredfields(fieldInfo);
    }
    
  return (
    <View>
    <Text>
    {(isRequired) && <Text style={{color: 'red'}}> * </Text> }
      { label }
    </Text>
    <TextInput
        onChangeText={(value) => onInputChange(value)}
        mode='flat'
        multiline = {true}
        numberOfLines={4}
        onBlur={handleBlur(name)}
        value={values[name] as string}
        placeholder={placeholder}
        activeUnderlineColor='black'
        style={{backgroundColor:'white'}}
        error={errors[name]? true : false}
      />
      {
        errors[name]  && 
          <Text style={{alignSelf:'flex-end', color: 'red'}}>
            { errors[name]} 
          </Text>
      }
      
  </View>
  )
}
