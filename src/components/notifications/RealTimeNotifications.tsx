
import React, { useEffect, useState } from "react";
import { Argument } from "../../interfaces/notifications/notificationInterface";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../app/hooks";
import { Avatar, Card, Chip } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { usePlannerStatusStyles } from "../../hooks/planner/usePlannerStatusStyles";
import moment from "moment";
import { BlankPageScreen } from "../../screens/blank page/BlankPageScreen";

/**
 * Notification Component
 * It opens a WebSocket connection and listens for messages
 * Whenever a new message arrives, it will be added to the notification list
 */

const urlNotification = process.env.VITE_API_URL_NOTIFICATION ?? 'notificationsservicesapp.azurewebsites.net';

export const RealTimeNotifications = () => {
  
const { notifications } = useAppSelector(state => state.notifications)
const [localNotifications, setLocalNotifications] = useState<Argument[]>([]);
const [countNewNotifications, setCountNewNotifications] = useState(0);
const [showNotifications, setShowNotifications] = useState(false);
const navigation = useNavigation();
const { statusItemTemplate } = usePlannerStatusStyles();

useEffect(() => {
  if (notifications.length > 0) {
    setLocalNotifications((prevNotifs) => {
      const combined = [...notifications, ...prevNotifs];
      const unique = Array.from(
        combined
          .reduce((map, obj) => map.set(obj.notification.id, obj), new Map())
          .values()
      );
      return unique;
    });
  }
  if (notifications.length == 1)
    setCountNewNotifications(countNewNotifications + 1);

  if (showNotifications) setCountNewNotifications(0);
}, [notifications]);

const getItemName = (notificationData: Argument) => {
  return notificationData.notification.itemName == "None"
    ? "Backlog"
    : notificationData.notification.itemName;
};

const typeNotifications = (notificationData: Argument) => {

  let reminder =
    notificationData.notification.notificationType.toLowerCase() ===
    "reminder";

  let avatarComponent;
  let message;
  let notificationType;

  if (reminder) {
    avatarComponent = (
      <Avatar.Icon 
        style={{
          alignSelf:'center',
          backgroundColor:'#EEEEEE'}}
        size={RFPercentage(6)} 
        icon="calendar" />
    );
    message = "The task is nearing its scheduled completion date.";
    notificationType = (
    <Chip 
      textStyle= {{color: 'white'}}
      style={{ backgroundColor: "#f79530" }}
      >
      <Text>
        Reminder
      </Text>{" "}
    </Chip>)
  } else {
    avatarComponent = (
      notificationData.userData?.imageProfilePath
        ? <Avatar.Image
            style={{alignSelf:'center'}} 
            size={RFPercentage(6)} 
            source={{uri: notificationData.userData?.imageProfilePath}} 
            />
        : <Avatar.Text 
            style={{alignSelf:'center'}}
            size={RFPercentage(6)} label={`${
              notificationData.userData?.firstName[0] !== undefined
                ? notificationData.userData?.firstName[0]
                : "U"
        }`} />
    );
    message = `The task status was updated by ${notificationData.userData?.firstName} ${notificationData.userData?.lastName[0]} `;

    notificationType = (
      <View
        style={{
          flexDirection:'row',
          alignItems: 'center'
        }}
      >
      <Text> Updated to  </Text>
      {statusItemTemplate(notificationData.notification.notificationType)}
      </View>
    );
  }
  
  return (
    <View >
    
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('TaskDetail', 
              { taskId: notificationData.notification.itemId })}
            >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        marginBottom: RFPercentage(1.5)
                      }}
                    >
                        {avatarComponent} 
                        {notificationType} 
                    </View>
                     
                    <Text
                      style={{

                      }}
                    >
                     
                      {message}

                    </Text>
                    <Chip style={{ 
                      backgroundColor: "#E0E0E0",
                      margin:RFPercentage(1),
                      marginTop: 20
                       }}>
                      <Text>
                        {`#${notificationData.notification.itemId}`}
                      </Text>{" "}
                      <Text>
                        {getItemName(notificationData)}
                      </Text>
                    </Chip>
                    
          </TouchableOpacity>


      <View style={{alignSelf:'flex-end'}}>
        <Text style={{color:"#9E9E9E"}}>
          {moment(notificationData.notification.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

return (

    <View style={cardStyles.mainContainer}>
      <ScrollView>
          {
          localNotifications.length > 0 
            ? localNotifications.slice(0, 5).map((notification, index) => 
              <Card 
                key={ index}
                style={cardStyles.mainCardContainer}>
                  <View>
                    {typeNotifications(notification)}
                  </View>
              </Card>
              )
            : <BlankPageScreen />
          }
      </ScrollView>
    </View>

)
}

const cardStyles = StyleSheet.create({
mainCardContainer: {
  width: '95%', 
  alignSelf: 'center',
  marginVertical: RFPercentage(1),
  padding: RFPercentage(2),
  backgroundColor: 'white'
},
mainContainer:{
flex: 1,
backgroundColor: 'white'
},
subtitleContainer:{
width: '100%',
flexDirection: 'row',
justifyContent: 'space-between',
},
title:{
fontSize: RFPercentage(2.5)
},
subtitle:{
fontSize: RFPercentage(1)
}
})
