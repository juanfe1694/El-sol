import { FormikProps } from 'formik';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { Checkbox } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { OptionsObject } from '../../../interfaces/form';

type key = { [key:string] : string; }
interface Props{
    label: string;
    name: string;
    type?: 'checkbox';
    placeholder?: string;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
    validaterequiredfields: (fields: Fields) => void;
    isRequired?:boolean;
    [x:string]:any
}
export const MultipleOptionComponent = ({
  label, 
  options, 
  description, 
  other, 
  otheroptionlabel,                            
  otheroptionlabelplaceHolder, 
  isRequired, 
  validaterequiredfields,
  formik, 
  ...props} : Props) => {

    const [checkValues, setCheckValues] = useState<string[]>([])

    const { errors, setFieldValue, values, handleChange } = formik;
    
    useEffect(() => {
      if(values[props.name] != '')
      setCheckValues(values[props.name] as string[])
    }, [values[props.name]])
    

    const onInputChange =  (item: string) => {

      let items = checkValues;
      const itemIndex = items.indexOf(item);

      if( itemIndex == - 1 ) {
        items.push(item)
      }else{
        items.splice(itemIndex, 1)
      }

      setCheckValues(items)

      setFieldValue(props.name, items)
      
      const fieldInfo : Fields = {
        name: props.name,
        value:  checkValues.length > 0 
          ? checkValues 
          : [ item ]
      }
      
      validaterequiredfields(fieldInfo);

    }

    return (
    <View style={{flex:1, backgroundColor:'white',  flexDirection: 'column'}}>
    <Text>
          {(isRequired) && <Text style={{color: 'red'}}> * </Text> }
          { label }
    </Text>

      <View>
          {
          options.map((x: OptionsObject) => {

            return(
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center',
              }}
              key={x.Option}
              >
              <Checkbox.Item
                  color='#0d3c61'
                  label={x.Option} 
                  status={ 
                    checkValues.indexOf(x.Option) != -1 
                      ? 'checked' 
                      : 'unchecked'}
                  onPress={() => {
                    onInputChange(x.Option)
                  }} 
                  position='leading' />
            </View>)
          })}
      </View>
  
    {
      errors[props.name] && 
              <Text style={{alignSelf:'flex-end', color: 'red'}}>
                  {errors[props.name]}
              </Text>
              
    }
  </View>
  )
}
