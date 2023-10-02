import React, { useEffect, useMemo, useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/index";
import { decode, encode } from "base-64";
import { StatusBar } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import NetInfo from "@react-native-community/netinfo";
import { enGB, registerTranslation } from "react-native-paper-dates";

//intl
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";
import { useEncryptDecryptData } from "./src/hooks/auth/useEncryptDecryptData";
import { useCheckConnectionAndSync } from "./src/hooks/conectivity/useCheckConnectionAndSync";
import { useSyncFilledForms } from "./src/hooks/conectivity/useSyncFilledForms";
import { useAppDispatch, useAppSelector } from "./src/app/hooks";
import { autenticationThunk, authPermissionsThunk } from "./src/redux/thunks/authThunk";
import { autentication as setAuthentication } from "./src/redux/slices/authSlice";
import * as Notifications from "expo-notifications";
import { Argument, WebSocketNotificationsResponse } from "./src/interfaces/notifications/notificationInterface";
import { setNotifications } from "./src/redux/slices/notifications/notificationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsConnected } from "./src/redux/slices/connection/connectionSlice";
import { NavigationProps } from "./src/interfaces/functionalInterfaces";
import { OverlaidLoadingScreen } from "./src/screens/loading/OverlaidLoadingScreen";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

if (Platform.OS === "android") {
  // See https://github.com/expo/expo/issues/6536 for this issue.
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}
registerTranslation("en-GB", enGB);


// on top of your index.android.js file
const isAndroid = require('react-native').Platform.OS === 'android' // this line is only needed if you don't use an 

// in your index.js file
if (isAndroid) {
  // this line is only needed if you don't use an .android.js file

  require('@formatjs/intl-getcanonicallocales/polyfill')
  require('@formatjs/intl-locale/polyfill')

  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-displaynames/polyfill')
  require('@formatjs/intl-displaynames/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-listformat/polyfill')
  require('@formatjs/intl-listformat/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/polyfill')
  require('@formatjs/intl-datetimeformat/locale-data/en.js') // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/add-golden-tz.js')

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    // If you are using react-native-cli
     Intl.DateTimeFormat.__setDefaultTimeZone
  }
} // this line is only needed if you don't use an .android.js file


if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const urlNotification =
process.env.VITE_API_URL_NOTIFICATION ??
"notificationsservicesapp.azurewebsites.net";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});



export default function Main( { navigation } : NavigationProps) {

  const { 
    autentication, 
    authUserInfo, 
    login, 
    isAuthenticating, 
    isLoadingNavbar, 
    isLoadingLogout } = useAppSelector((state) => state.auth);
  const { synchronizingProjects } = useAppSelector(state => state.connection);
  const [isConnected, setisConnected] = useState(true);
  const [socketUrl, setSocketUrl] = useState(`wss://${urlNotification}`);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { saveKeySecureStore } = useEncryptDecryptData();
  const { syncFilledForms } = useSyncFilledForms();
  const { synchronizeAll } = useCheckConnectionAndSync();
  const dispatch = useAppDispatch();
  const memoizedConnectionState = useMemo(() => isConnected, [isConnected]);
  const ws = new WebSocket(socketUrl);

  useEffect(() => {
    /** Set encrypt / decrypt key into secure store */
    saveKeySecureStore();
    /**Listening network status */
    
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisConnected(state.isConnected as boolean);
    });

    return () => {
      /**Clean net suscription */
      unsubscribe();
    };

  }, []);

  useEffect(() => {
    handleConnectivityChange(memoizedConnectionState);
  }, [memoizedConnectionState])

  /* When the user has been authenticated, their permissions
    are queried once and connected to the web socket and
    push notifications service */
    
    

    useEffect(() => {
      if (authUserInfo?.id) {
        dispatch(authPermissionsThunk(authUserInfo.id));
        getTokenAndConnect();
        registerForPushNotificationsAsync();
      }
    }, [autentication]);

    useEffect(() => {
 
      /**Enable push notification listener */
      const notificationListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          //Check if the notification comes from a specific action
          if (response.notification.request.identifier === "goToNotifications") {
            // Navigate to NotificationsScreen
            navigation.navigate("NotificationsScreen");
          }
        });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        /**Close socket conection */
        ws.close();
      };
    }, []);

  
    useEffect(() => {

      subscribeToWS();
  
    }, [socketUrl])

    useEffect(() => {
      if (login?.token) {
        handleSaveToken(login.token)
      }
    }, [login]);

    const handleSaveToken = async (token: string) => {
      try {
        await AsyncStorage.setItem("Authorization", token);
        await dispatch(autenticationThunk());
        navigation && navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
      } catch (error) {  }
    }
    
    const subscribeToWS = () => {

        ws.onopen = () => {
          // open connection
          ws.send(`{"protocol":"json","version":1}`); // send a message
      }
      // Escucha por mensajes
      ws.onmessage = (event) => {
        sendNotification(event);
      };
      ws.onerror = (e) => {
        
      }
    }
    const sendNotification = (e: MessageEvent<any>) => {
  
      // a message was received
      let notifications = e.data.replace("", "");
      let serialResponse: WebSocketNotificationsResponse =
        JSON.parse(notifications);
      let filteredResponses: Argument[] = [];
  
      if (serialResponse.type === 1 && Object.keys(serialResponse).length > 0) {
        filteredResponses = serialResponse.arguments[0];
  
        filteredResponses = filteredResponses.filter((response) => {
          const isReminder =
            response.notification.notificationType.toLowerCase() === "reminder";
          const isString =
            response.notification.notificationType.toLowerCase() === "string";
          const isDifferentUser = response.userData?.id !== authUserInfo.id;
  
          if (isReminder) {
            return true;
          } else if (!isReminder && isDifferentUser && !isString) {
            return true;
          }
          return false;
        });
  
        filteredResponses.sort((a, b) => b.notification.id - a.notification.id);
  
        /**Display push notification */
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Notifications",
            body: "View my notifications",
          },
          identifier: "goToNotifications",
          trigger: null,
        });
      }
  
      if (filteredResponses.length > 0) {
        dispatch(setNotifications(filteredResponses));
      }
    };
  
    /**Get token for websocket conection */
    const getTokenAndConnect = async () => {
      const token = await AsyncStorage.getItem("Authorization");
      const socketUrl = `wss://${urlNotification}/notificationhub?access_token=${token}`;
      setSocketUrl(socketUrl);
    };
  
    /**
     * The function checks for existing permissions for push notifications and requests permissions if
     * necessary.
     * @returns If the finalStatus is not "granted", nothing is being returned.
     */
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== "granted") {
        return;
      }
    };

   const handleConnectivityChange = (isConnected : boolean) => {
    try{
      if (isConnected) {
        dispatch(autenticationThunk());
        subscribeToWS();
        syncFilledForms().then(() => synchronizeAll())
        registerBackgroundFetchAsync();
        Toast.show({
          type: "success",
          text1: "¡Internet connection established!",
          topOffset: 10
        });
        dispatch(setIsConnected(true));
      } else {

        Toast.show({
          type: "error",
          text1: "Internet connection lost",
          topOffset: 10
        });

        dispatch(setIsConnected(false));
        dispatch(setAuthentication('disconnected'));

      }
    }catch(error){}
  };

  /** Register background task for form sync */
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

    syncFilledForms().then(() => synchronizeAll())
    unregisterBackgroundFetchAsync() 

    return BackgroundFetch.BackgroundFetchResult.NewData;
  })

   const registerBackgroundFetchAsync = async() => {

    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, 
      stopOnTerminate: false, 
      startOnBoot: false, 
    });

  }

  const unregisterBackgroundFetchAsync = async() => {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
          <OverlaidLoadingScreen 
            visible={ 
              isAuthenticating 
              && !isLoadingNavbar
              && autentication !== "verifying" 
              && !synchronizingProjects
            } 
            label="authenticating..." 
          />
            <Navigation colorScheme={colorScheme} />
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
            
      </SafeAreaProvider>
    );
  }
}

