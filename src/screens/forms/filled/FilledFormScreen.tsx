import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useAppSelector } from '../../../app/hooks'
import { FilledFormList } from '../../../components/forms/filled forms/FilledFormList';
import LoadingScreen from '../../LoadingScreen';
import { OverlayProps } from '../../../interfaces/overlay/overlayInterfaces';
import { OverlayScreen } from '../../overlay/OverlayScreen';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../interfaces/functionalInterfaces';

export const FilledFormScreen = ({ route } : NavigationProps) => {

    const [overlayVisible, setoverlayVisible] = useState(false)
    const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([])
    const { isLoading } = useAppSelector(state => state.filledForms)
    const formName = route?.params?.formName;
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: formName
        })
    }, [formName])
     
  return (
    <View style={filledFormStyles.mainContainer}>
        {
        isLoading 
            ? <LoadingScreen />
            : <FilledFormList 
                setoverlayProps={setoverlayProps} 
                setoverlayVisible={setoverlayVisible} />
        }
        <OverlayScreen
            overlayVisible={overlayVisible}
            setoverlayVisible={setoverlayVisible}
            overlayProps={overlayProps} />
    </View>
  )
}


const filledFormStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    }
})