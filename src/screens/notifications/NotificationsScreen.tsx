import React, { View } from "react-native"
import { RealTimeNotifications } from "../../components/notifications/RealTimeNotifications"
import { StyleSheet } from 'react-native'
export const NotificationsScreen = () => {

    return(
        <View style={notificationStyles.mainContainer}>
            <RealTimeNotifications />
        </View>
        )
}

const notificationStyles = StyleSheet.create({
    mainContainer:{
        flex: 1, 
        backgroundColor: 'white'
    }
})