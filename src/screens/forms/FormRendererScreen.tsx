import React from 'react'
import { Text, View } from 'react-native'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DynamicFormRender, ValidateFormLinkRequest } from "../../interfaces/form/formLinkInterfaces";
import { fetchFormInUseByIdThunk } from '../../redux/thunks/forms/formsLinksThunk';
import { Card } from 'react-native-paper';
import { StyleSheet} from "react-native";
import { NavigationProps } from '../../interfaces/functionalInterfaces';
import { FormRender } from '../../components/forms/FormRender';
import { useCheckConnectionAndSync } from '../../hooks/conectivity/useCheckConnectionAndSync';
import { FormInUse } from '../../interfaces/form';

export const FormRendererScreen = ( { route } : NavigationProps ) => {
    const { formInUseId } = route?.params || {}
    
    const { forms } = useCheckConnectionAndSync();
    const formInUse = forms.find(x => x.Id == formInUseId)
 
   const { error, loadingByFormInUseId} = useAppSelector((state) => state.formLink);
    const dispatch = useAppDispatch();

    const formId = route?.params?.formInUseId;
       
    useEffect(() => {
       dispatch(fetchFormInUseByIdThunk(formInUseId));
    }, [])

    let DynamicFormInfo : DynamicFormRender = {
      formInUse: formInUse as FormInUse,
      formLink: formId as string
    }

      return (
        <View style={RendererStyles.mainContainer} >
            { 
             error.ErrorType
                    ? <View>
                            <Card style={RendererStyles.errorMessage}  >
                                <View>
                                    <Text>
                                        {
                                            (error.Message !== undefined) 
                                            ? error.Message
                                            : error.ErrorText
                                        }
                                    </Text>
                                </View>
                            </Card>
                        </View>
                    : formInUse?.FormTemplate && <FormRender {...DynamicFormInfo} />
                }
            </View>
      )
}

const RendererStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    errorMessage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
