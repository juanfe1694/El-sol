/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ColorSchemeName,
  TouchableOpacity,
} from "react-native";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "./../../types";
import PortalScreen from "../screens/portal/PortalScreen";
import LoginScreen from "../screens/LoginScreen";
import { useAppSelector } from "../app/hooks";
import LoadingScreen from "../screens/LoadingScreen";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ForgotPasswordScreen } from "../screens/auth/forgotPassword/ForgotPasswordScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { EmailSendScreen } from "../screens/register/EmailSendScreen";
import { UsersScreen } from "../screens/users/UsersScreen";
import { EditUsersScreen } from "../screens/users/EditUsersScreen";
import { FormsScreen } from "../screens/forms/FormsScreen";
import { CreateUserScreen } from "../screens/users/CreateUserScreen";
import { CheckPermission } from "../components/CheckPermission";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { FormRendererScreen } from "../screens/forms/FormRendererScreen";
import { TaskDetailScreen } from "../screens/planner/tasks/TaskDetailScreen";
import { FilledFormScreen } from "../screens/forms/filled/FilledFormScreen";
import { FilledFormDetailScreen } from "../screens/forms/filled/FilledFormDetailScreen";
import { QrGeneratorScreen } from "../screens/forms/Qr/QrGeneratorScreen";
import { NotificationsScreen } from "../screens/notifications/NotificationsScreen";
import { TaskListScreen } from "../screens/planner/tasks/TaskListScreen";
import { ProjectDetailScreen } from "../screens/planner/projects/ProjectDetailScreen";
import { WorkflowsListScreen } from "../screens/planner/workflows/WorkflowsListScreen";
import { WorkflowDetailScreen } from "../screens/planner/workflows/WorkflowDetailScreen";
import { MilestonesListScreen } from "../screens/planner/milestones/MilestonesListScreen";
import { MilestoneDetailScreen } from "../screens/planner/milestones/MilestonesDetailScreen";
import { UserProfileScreen } from "../screens/profile/UserProfileScreen";
import { FormsToSaveScreen } from "../screens/forms/filled/FormsToSaveScreen";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { autentication, isLoadingLogout, isLoadingNavbar } =
    useAppSelector((state) => state.auth);

  if ( 
    autentication === "verifying" ||
    isLoadingNavbar ||  
    isLoadingLogout 
    )
    return <LoadingScreen />;

  return (
      <RootNavigator />
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {

  const { autentication } = useAppSelector((state) => state.auth);
  
  /**Function used if the navigation has not been loaded */
  const fallbackNavigation = {
    navigate: () => {},
    reset: () => {},
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, any, undefined>>() || fallbackNavigation;

  /* The above code is using the useEffect hook in a React component. It checks the value of the
  "autentication" variable and based on its value, it navigates to different screens. If the value
  is "unauthenticated", it resets the navigation stack to only have the "LoginScreen" as the active
  screen. If the value is anything other than "unauthenticated", it resets the navigation stack to
  only have the "Root" screen as the active screen. */

  useEffect(() => {

    if (autentication === "unauthenticated") {
      navigation &&
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
    } 
  }, [autentication]);

    //Header in user route
  /**
   * A custom header title component with a button for creating users.
   *
   * @param {object} props - The component props.
   * @param {object} props.navigation - The navigation object from React Navigation.
   * @returns {JSX.Element} JSX element representing the custom header title component.
   */
  const CustomHeaderTitleComponent = () => {

    return (
      <CheckPermission entity="Users" permissions="Create">
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateUsersScreen")}
        >
          <Ionicons
            name={"add-circle"}
            size={30}
            color={"#0075af"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </CheckPermission>
    );
  };

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{
          title: "User Administration",
          headerRight: () => (
            <CustomHeaderTitleComponent/>
          ),
        }}
      />
      
      <Stack.Screen
        name="FormsScreen"
        component={FormsScreen}
        options={{ title: "Forms" }}
      />
      <Stack.Screen
        name="EditUsersScreen"
        component={EditUsersScreen}
        options={{ title: "User Edit" }}
      />
      <Stack.Screen
        name="CreateUsersScreen"
        component={CreateUserScreen}
        options={{ title: "User Create" }}
      />
      <Stack.Screen
        name="PortalScreen"
        component={PortalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailSendScreen"
        component={EmailSendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormRendererScreen"
        component={FormRendererScreen}
        options={{
          headerShown: true,
          title: " ",
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{
          title: "Project Detail...",
        }}
      />

      <Stack.Screen
        name="WorkflowDetailScreen"
        component={WorkflowDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MilestonesListScreen"
        component={MilestonesListScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MilestoneDetail"
        component={MilestoneDetailScreen}
        options={{
          title: "Milestone Detail..."
        }}
      />

      <Stack.Screen
        name="TaskListScreen"
        component={TaskListScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: "Task detail" }}
      />


      <Stack.Screen
        name="FilledFormScreen"
        component={FilledFormScreen}
        options={{ title: "Filled forms" }}
      />
      <Stack.Screen
        name="FilledFormDetailScreen"
        component={FilledFormDetailScreen}
      />
      <Stack.Screen
        name="QrGeneratorScreen"
        component={QrGeneratorScreen}
        options={{ title: "QR Generator" }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="WorkflowsListScreen"
        component={WorkflowsListScreen}
        options={{
          title:'My workflows',
          headerShown: false
        }}
      />

      <Stack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title:'Profile', headerShown: false }}
      />

      <Stack.Screen
        name="FormsToSaveScreen"
        component={ FormsToSaveScreen }
        options={{ 
          title:'Filled forms', 
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={RFPercentage(3.5)}
              style={{ marginRight: '15%' }}
              onPress={() => {
                navigation.navigate('FormsInUseScreen'); 
              }}
            />
        )
        }}
      />
      
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
