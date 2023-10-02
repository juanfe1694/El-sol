import { useCallback, useEffect, useState } from "react";
import { Argument, WebSocketNotificationsResponse } from "../interfaces/notifications/notificationInterface";
import useWebSocket from "react-use-websocket";
import * as Notifications from 'expo-notifications';

export const connectWebSocket = (token: string) => {

    const [notifications, setNotifications] = useState<Argument[]>([]);
    const urlNotification = process.env.VITE_API_URL_NOTIFICATION ?? 'notificationsservicesapp.azurewebsites.net';
    const socketUrl = `wss://${urlNotification}/notificationhub?access_token=${token}`;
    
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
    
      const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
    
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
    
        if (finalStatus !== 'granted') {
          ;
          return;
        }
    
      };
      
      /**Call web socket Hook */
      const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        share: true,
        shouldReconnect: () => false,
      });
    
      const onGetNewNoitifications = () => {
         ;
         //lastMessage?.data =='{}'?setLoading(true):setLoading(false)
    
        try {
          if (lastMessage?.data) {
            let notifications = lastMessage?.data.replace("", "");
            let serialResponse: WebSocketNotificationsResponse = 
              JSON.parse(notifications);
            let filteredResponses: Argument[] = [];
    
            if (
              serialResponse.type === 1 &&
              Object.keys(serialResponse).length > 0
            ) {
              filteredResponses = serialResponse.arguments[0];
              filteredResponses = filteredResponses.filter(
                (response) => response.userData !== null
              );
              //;
              filteredResponses.sort(
                (a, b) =>
                  new Date(b.notification.createdAt).getTime() -
                  new Date(b.notification.createdAt).getTime()
              );
            }
    
            if (filteredResponses.length > 0) {
              /**Display push notification */
              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Notifications',
                  body: 'View my notifications'
                },
                identifier: "goToNotifications",
                trigger: null, 
              });
    
              setNotifications((prevNotifs) => {
                const combined = [...prevNotifs, ...filteredResponses];
                const unique = Array.from(
                  combined
                    .reduce(
                      (map, obj) => map.set(obj.notification.id, obj),
                      new Map()
                    )
                    .values()
                );
                return unique;
              });
            }
          }
        } catch (e) {
          ;
          ;
        }
      };
    
      useEffect(() => {
        onGetNewNoitifications();
      }, [lastMessage]);
    
    
      useEffect(() => {
        registerForPushNotificationsAsync();
        /**Register web socket */
          handleClickSendMessage();
    
        return () => {
          /**Clean net suscription */
        };
    
      }, [token]);
    
      const handleClickSendMessage = useCallback(
        () => sendMessage(`{"protocol":"json","version":1}`),
        []
      );
}
