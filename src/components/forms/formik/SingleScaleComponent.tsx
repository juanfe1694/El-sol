import { FormikProps } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldConfigurator } from '../../../interfaces/form';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type key = {
    [key:string] : string;
  }
interface Props{
    label: string;
    name: string;
    type: 'range';
    fieldConfiguration: FieldConfigurator;
    placeholder?: string;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
    validaterequiredfields: (fields: Fields) => void;
    isRequired?:boolean;
    description: string;

}
export const SingleScaleComponent = ({
  label,
  fieldConfiguration,
  name,
  formik,
  isRequired,
  validaterequiredfields,
}: Props) => {
  
  const { Min, Max, Step } = fieldConfiguration;

  const [values, setValues] = useState<number>(0);

  useEffect(() => {
    if(formik.values[name] != ''){
      setValues(parseInt(formik.values[name] as string))
    }else if(Min != ''){
      setValues(parseInt(Min as string))
    }
  }, [])
  
  const onChange = useCallback(
    (value: number) => {
      setValues(value);
           
      formik.setFieldValue(name,  value.toString());

      const fieldInfo: Fields = {
        name,
        value: value.toString(),
      };
      validaterequiredfields(fieldInfo);
    },
    [formik, formik.setFieldValue, name, validaterequiredfields]
  );

  const sliderProps = useMemo(
    () => ({
      minimumValue: parseInt(Min as string),
      maximumValue: parseInt(Max as string),
      step: parseInt(Step as string),
      value: values,
      onSlidingComplete: onChange,
      thumbTintColor:'#0d3c61',
       minimumTrackTintColor:'#0d3c61'
    }),
    [Min, Max, Step, values, onChange]
  );
    
  return (
    <View>
      <Text>
        {isRequired && <Text style={{ color: 'red' }}> *</Text>}
        {label}
      </Text>

      <Slider {...sliderProps}  />

      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text>{Min}</Text>
        <Text>{values}</Text>
        <Text>{Max}</Text>
      </View>
                {
                 formik.errors[name] &&
                    <Text style={{alignSelf:'flex-end', color: 'red'}}>
                       { formik.errors[name] }
                    </Text>
                }
    </View>
  );
};