import React from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface DetailHeaderProps{
  displayOverlay: () => void;
}

export const TaskDetailHeader = ({displayOverlay}:DetailHeaderProps) => {
  return (
    <View style={taskHeaderStyles.mainContainer}>
        <IconButton
            icon="dots-vertical"
            size={RFPercentage(3)}
            onPress={displayOverlay}
            style={{ borderRadius: RFPercentage(1)}}
        />

    </View>
  )
}

const taskHeaderStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

})
