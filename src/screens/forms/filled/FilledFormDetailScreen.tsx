import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FilledFormDetail } from '../../../components/forms/filled forms/FilledFormDetail'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../types'

export const FilledFormDetailScreen = ({route} : NativeStackScreenProps<  
  RootStackParamList, 'FilledFormDetailScreen'>  ) => {

  const formId = route?.params.formId;

  return (
    <View style={FilledFormDetailStyles.mainContainer} >
        <FilledFormDetail formId={formId} />
    </View>
  )
}

const FilledFormDetailStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    }
})