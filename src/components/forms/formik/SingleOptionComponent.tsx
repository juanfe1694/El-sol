import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { OptionsObject } from '../../../interfaces/form';
import { Fields, QuestionPos } from '../../../interfaces/form/formInUseInterfaces';
import { InputOtherComponent } from './InputOtherComponent';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

type key = { [key:string] : string; }
type formikOther = {Value: string; Other: string}
interface Props{
    label: string;
    name: string;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    options: OptionsObject[];
    shrinkFormTemplates: (question: QuestionPos) => void;
    validaterequiredfields: (fields: Fields) => void;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
    isRequired?:boolean;
    [x:string]:any
}

export const SingleOptionComponent = ({label,  description, other, otheroptionlabel,
                                    otheroptionlabelplaceholder, shrinkFormTemplates, validaterequiredfields, isRequired,
                                    formik, ...props} : Props) => {

    const [showOther, setshowOther] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')    
    const { errors, setFieldValue, values, handleChange } = formik;                              

    const gridOptionsMap : {[x : string] : string} = {};
    const options = [...props.options];
    const getName = (input : string) => {

          if(input == 'Other' && !other){
            return props.name
          }
          return( gridOptionsMap[input])
    }                                  

    useEffect(() => {

      const fieldInfo : Fields = {
        name:props.name,
        value: ''
      }

      const formikValues : formikOther = formik.values[props.name] as formikOther;
      if(formikValues.Value){
        setSelectedOption(formikValues.Value)
      }else{
        setSelectedOption(formik.values[props.name] as string)
      }

      if(other){
        
        if(formikValues.Value == 'Other') {
          
        setshowOther(true);

        }else{
          setshowOther(false);
          formikValues.Other = ' ';
          fieldInfo.value = JSON.stringify(formikValues) 
        }

      }
      
      fieldInfo.value = formik.values[props.name] as string[]
      validaterequiredfields(fieldInfo);
    }, [formik.values[props.name]])
    
    if(other) {

      const other : OptionsObject = {
        LogicalPosition: 0,
        Option: 'Other',
      }
      options.push(other);
      gridOptionsMap['Radio'] = `${props.name}.Value`;
      gridOptionsMap['Other'] = `${props.name}.Other`;

    } else{ gridOptionsMap['Radio'] = props.name }
    
      const onInputChange =  (event: string ) => {

        setFieldValue(getName('Radio'), event)

        if(event == 'Other'){
          formik.setFieldValue(getName('Other'), '')
        }

        options.map((x : OptionsObject )=> {
            if( x.Option == event){ 
             let indexOptionSelected = options.indexOf(x);
             const nextQuestion : QuestionPos  = {
                 logicalPosition: x.LogicalPosition as number,
                 questionId: props.name,
                 questionArrayIndex: indexOptionSelected
               }
               
               shrinkFormTemplates(nextQuestion)
            }
         })   
}


  return (
            
      <View style={{flex:1, backgroundColor:'white',  flexDirection: 'column'}}>
        <Text>
              {(isRequired) && <Text style={{color: 'red'}}> * </Text> }
              { label }
        </Text>
   
          <RadioButton.Group 
            onValueChange={newValue => onInputChange(newValue)} 
            value={selectedOption}>
              {
              options.map((x) => {

                return( 
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  }}
                  key={x.Option}
                  >
                  <RadioButton.Item 
                    color='#0d3c61'
                    label={x.Option} 
                    value={x.Option} 
                    position='leading' />
                </View>)
              })}
          </RadioButton.Group>
      

        {
          (showOther) && <InputOtherComponent 
                              label={otheroptionlabel} 
                              name={getName('Other')}
                              baseName={props.name}
                              placeholder={otheroptionlabelplaceholder} 
                              validaterequiredfields={validaterequiredfields}
                              formik={formik} /> 
        }
        {
          errors[props.name] && 
                  <Text style={{alignSelf:'flex-end', color: 'red'}}>
                    Mandatory answer
                  </Text>
                  
        }
      </View>
  )
}
