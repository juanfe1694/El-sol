import { FormikProps } from 'formik';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDateTimeFormater } from '../../../hooks/useDateTimeFormater';

type key = { [key:string] : string; }
interface Props{
    label: string;
    name: string;
    placeholder: string;
    validaterequiredfields: (fields: Fields) => void;
    isRequired?:boolean;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
}

export const InputTimeComponent = ({
  label,
  name,
  placeholder, 
  isRequired, 
  validaterequiredfields,
  formik} : Props) => {

    const [date, setDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState('');
    const [show, setShow] = useState(false); 
  
    const { errors, setFieldValue, values } = formik;

    const { convertTo12HourFormat } = useDateTimeFormater();
  
      useEffect(() => {
        if(values[name] == ''){
        setFormatedDate(placeholder)
      }else {
        const currentDate = new Date(values[name] as string)
        const formatedTime = convertTo12HourFormat(values[name] as string)
        setFormatedDate(formatedTime)
      }
      }, [])
      
    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {

      const currentDate  = selectedDate as Date;
      const formatedDate = convertTo12HourFormat(currentDate.toString());

      setShow(false);
      setDate(currentDate);
      setFieldValue(name, selectedDate);
      setFormatedDate(formatedDate)
      const fieldInfo : Fields = {
        name: name,
        value: selectedDate!.toString()
      }

      validaterequiredfields(fieldInfo);
  
    };
  
    const showDatepicker = () => {
      setShow(true)
    };
    
  return (
        <View >
          <Text>
            {(isRequired) && <Text style={{color: 'red'}}> * </Text> }
              { label }
          </Text>
          <View style={{
            borderBottomColor: errors[name] ? 'red' : 'gray', 
            borderBottomWidth: 2 }}>
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={showDatepicker}
                  style={{flexDirection: 'row', marginBottom: 5, marginTop: 10}}
                >
                  <Ionicons
                    name={"time-outline"}
                    size={20}
                    color={"black"}
                  />
                  <Text>  {formatedDate} </Text>
              </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="datePicker"
              value={date}
              mode='time'
              is24Hour={false}
              onChange={onChange}
            />
          )}

          {
            errors[name]  && 
              <Text style={{alignSelf:'flex-end', color: 'red'}}>
                { errors[name]} 
              </Text>
            }
        </View>
  )
}
