import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { Fields } from '../../../interfaces/form/formInUseInterfaces';
import { SingleOptionsForGrid } from './SingleOptionsForGrid';
import { View, Text, ScrollView } from 'react-native'
type key = { [key:string] : string; }

interface Props{
    label: string;
    name: string;
    type?: 'checkbox';
    placeholder?: string;
    validaterequiredfields: (fields: Fields) => void;
    formik: FormikProps<{ [key: string]: string | string[] | key; }>;
    isRequired?:boolean;
    [x:string]:any
}

export const SingleOptionGridComponent = ({
  label, 
  options, 
  description, 
  other, 
  otheroptionlabel,
  otheroptionlabelplaceHolder, 
  isRequired, 
  validaterequiredfields, 
  formik, 
  ...props } : Props) => {
    const [dimensions, setdimensions] = useState<number[]>([])
    const { errors } = formik; 
    const gridOptionsMap : {[x : string] : string} = {};

    options.Rows.map((r : string) => {
      gridOptionsMap[r] = `${props.name}.${r}`;
      
    }) 

    const rowName = (name : string) : string => {
      return(gridOptionsMap[`${name}`]);
    }

    useEffect(() => {
      const fieldInfo : Fields = {
        name:props.name,
        value: formik.values[props.name] as string[]
      }
      validaterequiredfields(fieldInfo);
    }, [formik.values[props.name]])
   
  return (
    <View>
      <Text>
            {(isRequired) && <Text style={{color: 'red'}}> * </Text> }
            { label }
        </Text>
        <ScrollView horizontal>
          <View>

              <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginTop: 15 }}>

                    <View>
                      <View style={{flex: 1}}></View>
                      {
                          options.Rows.map((z : string) =>
                              <View 
                                key={z}  
                                style={{ 
                                flex: 1, 
                                justifyContent: 
                                'center'}} >

                                <View>
                                    <Text > {z} </Text>
                                </View>           
                              </View>)
                      }

                    </View>
                    <View style={{flexDirection:'column', flex: 1}}>
                      <View  style={{flexDirection:'row', flex: 1}}>
                    
                          {
                                options.Columns.map((z : string) =>
                                    <View 
                                      key={z}  
                                      style={{ 
                                        flex: 1,
                                        paddingHorizontal: 5, 
                                        justifyContent: 
                                        'center'}}
                                        onLayout={(event) => {
                                          const { width } = event.nativeEvent.layout;
                                          setdimensions(current => [...current, width])
                                        }} >
                                        <View>
                                              <Text > {z} </Text>
                                        </View>           
                                    </View>
                                    )
                              }
                              </View>
                    {
                      options.Rows.map((x: string) => 

                     <SingleOptionsForGrid 
                            name={rowName(`${x}`)} 
                            label= {x}
                            columns={options.Columns} 
                            key={x}
                            formik={formik}
                            dimensions={dimensions} />
                      )
                        
                            }
                    </View>      
              </View>
          </View>
      </ScrollView>

                {
                  errors[props.name] && 
                    <Text style={{alignSelf:'flex-end', color: 'red'}}>
                        Mandatory answer
                    </Text>
                }
    </View>
  )
}
