import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

type Props = {
    component?: React.JSX.Element
}
export const BlankPageScreen = ({ component } : Props) => {
  return (
    <View style={blankPageStyles.container}>
        <View style={blankPageStyles.rowContainer}>
            <Ionicons color='gray' name="planet-outline" size={RFPercentage(10)} />
            <Text style={blankPageStyles.label}>We're sorry</Text>
            <Text style={blankPageStyles.label}>There are no items to display</Text>
            { component }
        </View>
    </View>
  )
}

const  blankPageStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label:{
        fontSize: RFPercentage(3),
        color:'gray'
    }
})
