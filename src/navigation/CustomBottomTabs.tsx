import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { iconSize } from "../components/styles/generalStyles";

export const CustomBottomTabs = ({
  navigation,
  descriptors,
  state
}: BottomTabBarProps) => {

  const [tabBarStyles, settabBarStyles] = useState([{}]);

  /* The `useEffect` hook is used to update the `tabBarStyles` state variable whenever the `descriptors` or `state`
  dependencies change. */
  useEffect(() => {
    const tabBarStyles = [{}];
    state?.routes?.map((route) => {
      tabBarStyles.push(descriptors[route?.key]?.options?.tabBarStyle || {});
    });
    settabBarStyles(tabBarStyles);
  }, [descriptors, state]);

  /**
   * The function `renderTab` renders a tab component with an icon based on the provided route and
   * whether it is currently focused.
   * @param {any} route - The `route` parameter represents the current route object. It contains
   * information about the route, such as its key and name.
   * @param {boolean} isFocused - A boolean value indicating whether the tab is currently focused or
   * not.
   * @returns The function `renderTab` returns a `TouchableOpacity` component with a key, an
   * `onPress` event handler, and a style. Inside the `TouchableOpacity`, there is a conditional
   * rendering of a tab icon based on the `tabBarIcon` option provided in the `descriptors` object.
   * The icon is rendered with a color based on the `isFocused` parameter, a size based on
   */
  const renderTab = (route: any, isFocused: boolean) => {
    const options = descriptors[route?.key]?.options;
    const currentRouteName = state.routes[state.index].name;
    const isActiveTab = route?.name === currentRouteName;
  
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={route?.key}
        onPress={() => navigation?.navigate(route?.name)}
        style={[
          TabStyles.sectionContainer,
          isActiveTab && { backgroundColor: 'activeTabColor' }
        ]}
      >
        {/* Get tab icon */}
        {options?.tabBarIcon &&
          options?.tabBarIcon({
            color: isFocused
              ? (options.tabBarActiveTintColor as string)
              : (options.tabBarInactiveTintColor as string),
            size: iconSize,
            focused: isFocused,
          })}
      </TouchableOpacity>
    );
  };
    

  return (
    <View style={[TabStyles.mainContainer, tabBarStyles]}>
      <View style={TabStyles.sectionContainer}>
        {/** Left navigation tabs */}
        {
          renderTab(
            state?.routes.find((route) => route.name === 'ProjectListScreen'), 
            state.routes[state.index].name === 'ProjectListScreen'
          )
        }
        {
          renderTab(
            state?.routes.find((route) => route.name === 'TaskGeneralListScreen'),  
            state.routes[state.index].name === 'TaskGeneralListScreen'
          )
        }
      </View>
      <View style={TabStyles.mainSectionContainer}>
        {/** Main menu tab */}
        <Ionicons
            onPress={() => navigation.navigate("FormsInUseScreen")}
            name="qr-code-outline"
            size={iconSize}
            color={state.routes[state.index].name === "FormsInUseScreen" ? "#0d3c61" : "#A9A6A6"}
            style={[
              TabStyles.mainButtonContainer,
              {
                borderColor: state.routes[state.index].name === "FormsInUseScreen" ? "#0d3c61" : "#A9A6A6",
              },
            ]}
        />
      </View>
      <View style={TabStyles.sectionContainer}>
        {/** Right navigation tabs */}
        {
          renderTab(
            state?.routes.find((route) => route.name === 'NotificationsScreen'),  
            state.routes[state.index].name === 'NotificationsScreen'
          )
        }
        {
          renderTab(
            state?.routes.find((route) => route.name === 'UserProfileScreen'),  
            state.routes[state.index].name === 'UserProfileScreen'
          )
        }
      </View>
    </View>
  );
};

{
  /** Styles */
}
const TabStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: "5%",
    flexDirection: "row",
  },
  mainSectionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sectionContainer: {
    flex: 2,
    width: 'auto',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  mainButtonContainer: {
    borderColor: "#A9A6A6",
    borderWidth: 1,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: RFPercentage(0.5),
  },
});
