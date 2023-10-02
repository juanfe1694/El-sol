import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  logoutThunk,
  resetAuthPermissionsThunk,
} from "../../redux/thunks/authThunk";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { CheckPermission } from "../../components/CheckPermission";
import { useCachedProfileImage } from "../../hooks/profile/useCachedProfileImage";
import { useCheckConnectionAndSync } from "../../hooks/conectivity/useCheckConnectionAndSync";

/* The above code is a TypeScript React component that represents a user profile screen. It displays
the user's profile information, including their name, avatar, and role. The component also provides
options to edit the profile and logout. */
export const UserProfileScreen = () => {
  const navigation = useNavigation();
  const { getAndSyncProjects } = useCheckConnectionAndSync();
  const { authUserInfo: currentUserInfo } = useAppSelector(
    (state) => state.auth
  );

  /**Local states */
  const [image, setImage] = useState<string>();
  const roles = currentUserInfo?.roles?.split(",");
  const labelAvatar = `${currentUserInfo?.firstName?.[0] ?? ""}`;
  const dispatch = useAppDispatch();

  const { downloadImage } = useCachedProfileImage();

  const gradientColors: { [key: number]: string[] } = {
    0: ["#f24c15", "#f79530"],
    1: ["#0d3c61", "#0C69B2"],
    2: ["#763cad", "#a855f7"],
    3: ["#f24c15", "#f79530"],
    4: ["#0d3c61", "#0C69B2"],
    5: ["#763cad", "#a855f7"],
  };

  useEffect(() => {
    //getAndSyncProjects();
    downloadImage().then((localUri) => {
      setImage(localUri);
    });
  }, [currentUserInfo]);

  /**
   * The function "onLogout" removes the "Authorization" item from AsyncStorage, dispatches two
   * thunks (logoutThunk and resetAuthPermissionsThunk) to handle logout and reset permissions
   * respectively.
   */
  const onLogout = () => {
    AsyncStorage.removeItem("Authorization");
    dispatch(logoutThunk());
    //Clear current premissions
    dispatch(resetAuthPermissionsThunk());
  };

  const editProfile = () => {
    navigation.navigate("UpdateUserProfileScreen");
  };

  const onPressModule = (module: string) => {
    if(module === "planner"){
         navigation.navigate("ProjectListScreen");
    } else if(module === "admin") {
        navigation.navigate("UsersScreen");
    } else if(module === "forms") {
        navigation.navigate("FormsInUseScreen");
    }
  }

  return (
    /**Main container */
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/**Profile information container */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(3),
              fontWeight: "bold",
              marginBottom: RFPercentage(2),
            }}
          >
            Profile
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: RFPercentage(3),
              flexDirection: "row",
            }}
          >
            {image ? (
              <Avatar.Image
                size={RFPercentage(15)}
                source={{ uri: image }}
                style={{ marginRight: "-7%" }}
              />
            ) : (
              <Avatar.Text size={RFPercentage(15)} label={labelAvatar} />
            )}
            {/** Validate edit profile permission */}
            <CheckPermission entity="Users" permissions="Update">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={editProfile}
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Ionicons
                  name="pencil-outline"
                  style={{
                    color: "#f79530",
                    backgroundColor: "white",
                    borderColor: "#f79530",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 3,
                  }}
                  size={RFPercentage(2.5)}
                />
              </TouchableOpacity>
            </CheckPermission>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: RFPercentage(3),
                fontWeight: "bold",
                marginBottom: RFPercentage(2),
              }}
            >
              {`${currentUserInfo.firstName} ${currentUserInfo.lastName}`}
            </Text>

            {roles.map((rol, index) => (
              <View
                key={index}
                style={{
                  height: RFPercentage(5),
                }}
              >
                <LinearGradient
                  style={{ borderRadius: RFPercentage(2) }}
                  colors={gradientColors[index]}
                  start={[0, 0]}
                  end={[1, 0]}
                >
                  <Text
                    style={{
                      fontSize: RFPercentage(2.5),
                      fontWeight: "bold",
                      color: "white",
                      paddingHorizontal: "2%",
                    }}
                  >
                    {rol}
                  </Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>
        {/**Button container */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/** Logout button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout}
            style={{
              borderColor: "#d9362b",
              borderWidth: 1,
              borderRadius: 10,
              width: RFPercentage(30),
              height: RFPercentage(6),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#d9362b",
                fontWeight: "bold",
                fontSize: RFPercentage(2.3),
              }}
            >
              Logout
            </Text>
            <Ionicons
              name="log-out-outline"
              size={RFPercentage(3)}
              style={{
                color: "#d9362b",
                marginLeft: "5%",
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFPercentage(3),
              fontWeight: "bold",
              marginBottom: RFPercentage(2),
              marginRight: RFPercentage(30),
              marginTop: RFPercentage(5),
            }}
          >
            My modules
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressModule("planner")}
            style={{
              borderColor: "#0075af",
              backgroundColor: "#0075af",
              borderWidth: 1,
              borderRadius: 10,
              width: RFPercentage(45),
              height: RFPercentage(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: RFPercentage(2.3),
              }}
            >
              Planner
            </Text>
            <Ionicons
              name="file-tray-full-outline"
              size={RFPercentage(3)}
              style={{
                color: "white",
                marginLeft: "5%",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressModule("admin")}
            style={{
              borderColor: "#ffcc32",
              backgroundColor: "#ffcc32",
              borderWidth: 1,
              borderRadius: 10,
              width: RFPercentage(45),
              height: RFPercentage(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: RFPercentage(2.3),
              }}
            >
              Admin
            </Text>
            <Ionicons
              name="people-outline"
              size={RFPercentage(3)}
              style={{
                color: "white",
                marginLeft: "5%",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressModule("forms")}
            style={{
              borderColor: "#16a34a",
              backgroundColor: '#16a34a',
              borderWidth: 1,
              borderRadius: 10,
              width: RFPercentage(45),
              height: RFPercentage(10),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: RFPercentage(2.3),
              }}
            >
              Forms
            </Text>
            <Ionicons
              name="folder-outline"
              size={RFPercentage(3)}
              style={{
                color: "white",
                marginLeft: "5%",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
