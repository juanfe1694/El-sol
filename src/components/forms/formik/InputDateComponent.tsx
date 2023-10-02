import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
type key = { [key:string] : string; }
interface Props{
    label: string;
    name: string;
    validaterequiredfields: (fields: Fields) => void;
    isRequired?:boolean;
    placeholder: string;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
}
export const InputDateComponent = ({
    label,
    name, 
    isRequired,
    placeholder, 
    validaterequiredfields,
    formik} : Props) => {
  
  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState('');
  const [show, setShow] = useState(false); 

  const { errors, setFieldValue, values } = formik;

    useEffect(() => {
     if(values[name] == ''){
     setFormatedDate(placeholder)
    }else{
      let currentDate = new Date(values[name] as string)
      setDate(currentDate)
      setFormatedDate(currentDate.toDateString())
  }
    }, [])
    
  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate as Date;
    setShow(false);
    setDate(currentDate);
    setFieldValue(name,currentDate);
    setFormatedDate(currentDate.toDateString())
    
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
    <View>
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
                name={"calendar-outline"}
                size={20}
                color={"black"}
              />
              <Text>  { formatedDate } </Text>
          </TouchableOpacity>
      </View>    
    {show && (
      <DateTimePicker
        testID="datePicker"
        value={date}
        mode='date'
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
