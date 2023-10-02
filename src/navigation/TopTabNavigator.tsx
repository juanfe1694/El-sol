import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootTopTabParamList } from '../../types';
import { ProjectListScreen } from '../screens/planner/projects/ProjectsListScreen';

const Tab = createMaterialTopTabNavigator<RootTopTabParamList>();

export const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Projects">
      <Tab.Screen name="Projects" component={ProjectListScreen} />
    </Tab.Navigator>
  );
}