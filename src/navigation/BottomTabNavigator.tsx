import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "./../../types";
import { RFPercentage } from "react-native-responsive-fontsize";
import { NotificationsScreen } from "../screens/notifications/NotificationsScreen";
import { Keyboard, KeyboardEvent } from "react-native";
import { useAppSelector } from "../app/hooks";
import { ProjectListScreen } from "../screens/planner/projects/ProjectsListScreen";
import { CustomBottomTabs } from "./CustomBottomTabs";
import { TaskGeneralListScreen } from "../screens/planner/tasks/TaskGeneralListScreen";
import { UserProfileScreen } from "../screens/profile/UserProfileScreen";
import { FormsInUseScreen } from "../screens/forms/FormsInUseScreen";


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {

  const { showCamera } = useAppSelector((state) => state.profile);
  const { isConnected } =useAppSelector(state => state.connection);
  const { authUserInfo } = useAppSelector((state) => state.auth);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [tabBarStyle, setTabBarStyle] = useState({});

  /* The code `const isConnected = useNetworkStatus()
    ` is using the `useNetworkStatus` hook to get the current
  network status and store it in the `isConnected` variable. It then logs the value of `isConnected`
  to the console. */
  
  /**
   * Represents a configuration object for a screen module.
   * @property {string} name - The name of the screen.
   * @property {React.ComponentType} component - The React component to be rendered for this screen.
   * @property {Object} options - Additional options for the screen module.
   * @property {Function} options.tabBarIcon - A function that returns the icon to be displayed on the tab bar for this screen.
   * @property {string[]} entity - An array of entities associated with this screen.
   * @property {string} permissions - The type of permissions required for this screen (e.g., "List", "Create", "Update", etc.).
   */

  /**
   * Represents the configuration for the `useCheckNavigationData` hook.
   * @typedef {Object} NavigationDataConfig
   * @property {ScreenModule[]} modules - An array of screen modules.
   * @property {Object} authPermissions - The permissions required for the authenticated user.
   */
  /**
   * Custom hook to handle navigation data and permissions.
   * @function
   * @param {NavigationDataConfig} navigationDataConfig - The configuration object for navigation data.
   * @returns {any} - The processed navigation data.
   */


  /* The `useEffect` hook is used to add event listeners for the keyboard showing and
   hiding events. */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  /* The `useEffect` hook is used to handle changes in the `showCamera` state variable. */
  useEffect(() => {
    showCamera ? handleMediaShow() : handleMediaHide();
  }, [showCamera]);

  const handleMediaShow = () => {
    setTabBarStyle({ display: "none" });
  };

  const handleMediaHide = () => {
    setTabBarStyle({});
  };

  const handleKeyboardShow = (event: KeyboardEvent) => {
    setKeyboardVisible(true);
    setTabBarStyle({ display: "none" });
  };

  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
    setTabBarStyle({});
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0d3c61",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarLabelStyle: { fontSize: RFPercentage(2) },
        tabBarIconStyle: { fontSize: RFPercentage(2.5) },
        tabBarStyle: { ...tabBarStyle },
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      
    {
      isConnected && authUserInfo.id
        ? <BottomTab.Group >
            <BottomTab.Screen
              name="ProjectListScreen"
              component={ProjectListScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="home-outline" color={color} />
                ),
              }}
            />
            <BottomTab.Screen
              name="TaskGeneralListScreen"
              component={TaskGeneralListScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="calendar-outline" color={color} />
                ),
              }}
            />
            <BottomTab.Screen
              name="NotificationsScreen"
              component={NotificationsScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="notifications-outline" color={color} />
                ),
              }}
            />
            <BottomTab.Screen
              name="UserProfileScreen"
              component={UserProfileScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="person-outline" color={color} />
                ),
              }}
            />
            <BottomTab.Screen
              name="FormsInUseScreen"
              component={FormsInUseScreen}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="qr-code-outline" color={color} />
                ),
              }}
            />
          </BottomTab.Group>
        : <BottomTab.Screen
            name="FormsInUseScreen"
            component={FormsInUseScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="qr-code-outline" color={color}  />
              ),
            }}
          />
      }
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return (
    <Ionicons
      size={RFPercentage(3.5)}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
