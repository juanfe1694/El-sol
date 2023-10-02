import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { CardPortal } from "../../components/portal/CardPortal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCheckNavigationData } from "../../hooks/useCheckNavigationData";
import { filterCard } from "../../helpers/filterCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Path } from "react-native-svg";
import { RFPercentage } from "react-native-responsive-fontsize";
import { styles } from "./PortalStyles";
import {
  autenticationThunk,
  logoutThunk,
  resetAuthPermissionsThunk,
} from "../../redux/thunks/authThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { search } from "../../redux/slices/searchSlice";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { useCachedProfileImage } from "../../hooks/profile/useCachedProfileImage";

function PortalScreen() {
  const { downloadImage } = useCachedProfileImage();
  const [userProfileImage, setUserProfileImage] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);

  const { authPermissions, authUserInfo, autentication } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const { search: searchText } = useAppSelector((state) => state.search);
  const cards = useCheckNavigationData(filterCard(searchText), authPermissions);
  const onLogout = () => {
    AsyncStorage.removeItem("Authorization");
    dispatch(logoutThunk());
    //Clear current premissions
    dispatch(resetAuthPermissionsThunk());
  };

  const labelAvatar = `${authUserInfo?.firstName?.[0] ?? ""}`;

  useEffect(() => {
    downloadImage().then((localUri) => {
      setUserProfileImage(localUri);
    });
  }, [authUserInfo]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(autenticationThunk());
    } catch (error) {
      console.error("Error downloading image:", error);
    }
    setRefreshing(false);
  };

  const profileImage = () => {
    return userProfileImage ? (
      <Avatar.Image
        size={RFPercentage(13)}
        source={{ uri: userProfileImage }}
      />
    ) : (
      <Avatar.Text size={RFPercentage(13)} label={labelAvatar} />
    );
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View
          style={{
            height: "20%",
            width: "100%",
            bottom: "1%",
          }}
        >
          <Svg
            height={RFPercentage(20)}
            width={RFPercentage(60)}
            viewBox="0 0 500 150"
          >
            <Path
              fill="#f79530"
              d="M-1.97,133.72 C157.16,210.70 350.73,-57.70 500.27,82.41 L500.00,0.00 L0.00,0.00 Z"
            />
          </Svg>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.titleContainer}>
            {profileImage()}
            <View style={styles.heroContainer}>
              <Text style={styles.title}>Hello, </Text>
              <Text style={styles.titleOrange}>{authUserInfo.firstName}</Text>
            </View>
            <Text style={styles.subtitle}>Welcome back</Text>
            <View>
              <TouchableOpacity onPress={onLogout}>
                <Text>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modulesContainer}>
            <Text
              style={[
                styles.modulesText,
                { borderBottomColor: "#f79530", borderBottomWidth: 3 },
              ]}
            >
              Mod
            </Text>
            <Text style={styles.modulesText}>ules</Text>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={RFPercentage(1.8)}
              color="#000"
              style={{ marginHorizontal: 5 }}
            />
            <TextInput
              value={searchText}
              onChangeText={(text: string) => dispatch(search(text))}
              placeholder="Search"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                padding: RFPercentage(0.5),
                fontSize: RFPercentage(1.8),
              }}
            />
          </View>

          {cards.length > 0 ? (
            <View style={styles.cardsContainer}>
              {cards.map(
                ({ id, title, description, to, icon, textColor, entity }) => (
                  <View key={id}>
                    <CardPortal
                      title={title}
                      description={description}
                      to={to}
                      icon={icon}
                      textColor={textColor}
                      entity={entity}
                    />
                  </View>
                )
              )}
            </View>
          ) : (
            <CardPortal
              title={"Not found"}
              description={
                "Permission not found. Please contact your administrator."
              }
              to="NotFound"
              icon={"pi pi-question-circle"}
              textColor={"#f79530"}
              entity={""}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default PortalScreen;
