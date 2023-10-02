import React, { useEffect, useState } from 'react'
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native'
import { useAppSelector } from '../../../app/hooks';
import { FilledForm } from '../../../interfaces/form';
import { Card } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

interface Grid{
    rows : string[];
    cols : string[];
}
interface FilledFormDetailProps{
  formId: string;
}
export const FilledFormDetail = ( {formId}: FilledFormDetailProps ) => {

    const  {forms,formInUse,error} = useAppSelector((state) => state.filledForms);
    const [filledForm, setfilledForm] = useState<FilledForm>();
    const [formName, setformName] = useState<string>()
    const navigation = useNavigation();

    useEffect(() => {
        if(forms.RecordsCount && forms.Data.length > 0){
        const form = forms.Data.find(f => f.Id == formId);
        const formName = formInUse?.Name.find(f => f.Language == 'English')?.Text;
        setfilledForm(form);
        setformName(formName);
        navigation.setOptions({title: formName})
      }
    }, [forms])
    
  return (
    <View style={filledFormDetailStyles.mainContainer}>
      <ScrollView>
       <Card style={filledFormDetailStyles.mainContainer}>
         <Image
            source={require('../../../assets/images/Logo.png')}
            style={filledFormDetailStyles.image} />

        {
            filledForm?.ItemsResponses?.map(m => {
                if(m.OptionSelected!.length > 0){
                    return(
                        <View 
                          key={m.QuestionId}
                          style={filledFormDetailStyles.labelContainer}>
                                <Text 
                                  style={filledFormDetailStyles.questionLabel}>
                                    {m.Label}
                                </Text>
                                <Text 
                                  style={filledFormDetailStyles.answerLabel}>
                                    {`${m.OptionSelected}`}
                                </Text> 
                        </View>
                        
                    )
                }

                else if(m.OptionSelectedGrid!.length > 0){

                    const gridOptions : Grid[] = [];

                    m.OptionSelectedGrid?.map(r =>{
                        const grid : Grid = {
                            cols: r.Column as string[],
                            rows: r.Row as string[]
                        }
                        gridOptions.push(grid);
                        
                    })

                    return(
                        <View 
                          key={m.QuestionId}
                          style={filledFormDetailStyles.labelContainer} >
                           
                            <View>
                                <Text style={filledFormDetailStyles.questionLabel}>
                                  {m.Label}
                                </Text>
                                {
                                    gridOptions.map(o => {
                                        return(

                                            <Text 
                                              style={filledFormDetailStyles.multipleAnswerContainer}  
                                              key={o.rows[0]}>
                                                <Text style={filledFormDetailStyles.questionLabel}>
                                                  {`${o.rows}: `}
                                                </Text>
                                                {
                                                    o.cols.map((c, index : number) =>{
                                                        const coma =  o.cols.length - 1 > index ? ', ' : ' ';
                                                        return(
                                                            <Text key={c} > { c }{ coma } </Text>
                                                        )
                                                    })
                                                    
                                                }
                                                
                                            </Text>
    
                                        )
                                    })
                                }
                            </View>
                            
                        </View>
                        
                    )
                }
            })

        }

        </Card>
      </ScrollView>
    </View>
  )
}

const filledFormDetailStyles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    width: RFPercentage(24),
    height: RFPercentage(8),
    alignSelf: 'center',
    margin: RFPercentage(2)
  },
  title:{
    alignSelf: 'center',
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold'
  },
  labelContainer:{
    marginVertical: RFPercentage(1),
    marginHorizontal: RFPercentage(2),
  },
  questionLabel:{
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: '1%'
  },
  answerLabel:{
    fontSize: RFPercentage(2)
  },
  multipleAnswerContainer:{
    marginVertical: '0.5%'
  }
})
