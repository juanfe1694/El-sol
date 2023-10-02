import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { SyncStates } from '../interfaces/functionalInterfaces'
import { ActivityIndicator } from 'react-native-paper'

type Props = {
    state: SyncStates
}
export const SyncIcon = ({ state } : Props) => {

    switch (state) {

        case "Synchronizing":
            return (
                <ActivityIndicator
                    size={RFPercentage(2.3)}
                    color='#ffcc32'
                />
            )

        case "Synchronized":
            return (
                <Ionicons
                    name='checkmark-circle'
                    size={RFPercentage(3)}
                    style={{ color: 'green'}}
                />
            )

        case "Error":
            return (
                <Ionicons
                    name='alert-circle'
                     size={RFPercentage(3)}
                    style={{ color: 'red'}}
                />
            )
    
        default:
            return (
                <Ionicons
                    name='alert-circle'
                    size={RFPercentage(3)}
                    style={{ color: '#ffcc32'}}
                />
            )
    }
  
}
