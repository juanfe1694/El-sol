/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  PortalScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  EmailSendScreen: undefined;
  UsersScreen: undefined;
  EditUsersScreen: undefined;
  CreateUsersScreen: undefined;
  PlannerScreen: undefined;
  FormsScreen: undefined;
  UpdateUserProfileScreen: undefined;
  FormRendererScreen: { formInUseId: string };
  ProjectDetail: { projectId: number };
  FormsInUseScreen: undefined;
  WorkflowsListScreen: undefined;
  WorkflowDetailScreen: { workflowId: number };
  MilestonesListScreen: { workflowId: number };
  MilestoneDetail: { milestoneId: number };
  TaskListScreen: { milestoneId: number };
  TaskGeneralListScreen: undefined;
  TaskDetail: { taskId: number };
  FilledFormScreen: { formName: string };
  FilledFormDetailScreen: { formId: string };
  QrGeneratorScreen: undefined;
  NotificationsScreen: undefined;
  UserProfileScreen: undefined;
  FormsToSaveScreen: undefined;
  LoadingScreen: undefined;
};

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  PortalScreen: undefined;
  UpdateUserProfileScreen: undefined;
  PlannerScreen: undefined;
  NotificationsScreen: undefined;
  ProjectListScreen: undefined;
  TaskListScreen: undefined;
  UserProfileScreen: undefined;
  FormsInUseScreen: undefined;
  LoadingScreen: undefined;
  TaskGeneralListScreen: undefined;
};

export type RootTopTabParamList = {
  Tasks: undefined;
  Projects: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
