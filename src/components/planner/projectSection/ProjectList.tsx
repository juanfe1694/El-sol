import React, { useEffect, useMemo, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProjectsThunk } from "../../../redux/thunks/planner/projects/projectThunk";
import LoadingScreen from "../../../screens/LoadingScreen";
import { PlannerCard } from "../PlannerCard";
import { DataTable, Avatar } from "react-native-paper";
import { styles } from "./ProjectListStyles";
import { useCachedProfileImage } from "../../../hooks/profile/useCachedProfileImage";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StateFilter } from "../../../redux/thunks/planner/filters/StateFilter";
import { useNavigation } from "@react-navigation/native";
import { priorityIdToString } from "../../../helpers/convertPriority";
import {
  setIsProjectLoading,
  setLazyProjects,
  setResetProject,
} from "../../../redux/slices/planner/projects/projectsSlice";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { StyleSheet } from "react-native";
import { titleStyles } from "../styles/titleStyles";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";

interface ProjectsListProps {
  setOverlayVisible: (displayOverlay: boolean) => void;
  overlayVisible: boolean;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const ProjectList = ({
  setOverlayVisible,
  overlayVisible,
  setOverlayOptions,
}: ProjectsListProps) => {
  const { projects, lazyProjects, isLoading } = useAppSelector(
    (state) => state.project
  );

  const { authUserInfo } = useAppSelector((state) => state.auth);
  const { isConnected } = useAppSelector((state) => state.connection);

  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const [enableScroll, setenableScroll] = useState(true);
  const [localLoading, setlocalLoading] = useState(true);
  const [userProfileImage, setUserProfileImage] = useState<string>();
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, projects.recordsCount);
  const memoizedLocalLoading = useMemo(() => localLoading, [localLoading]);

  /* The code snippet is performing the following tasks: */
  const infoFilter = lazyProjects.filter?.map((filter) => {
    const filterState = filter;
    return filterState;
  });

  const stateIdFilter = infoFilter?.find(
    (filter) => filter.field === "stateId"
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage, stateIdFilter?.value]);

  const fetchProjectsList = () => {
    dispatch(fetchProjectsThunk(lazyProjects)).then(() =>
      setlocalLoading(false)
    );
  };

  useEffect(() => {
    fetchProjectsList();
  }, [lazyProjects, isConnected]);

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(fetchProjectsThunk({ ...lazyProjects, page: page + 1 }));
  };

  const { downloadImage } = useCachedProfileImage();

  const labelAvatar = `${authUserInfo?.firstName?.[0] ?? ""}`;

  useEffect(() => {
    downloadImage().then((localUri) => {
      setUserProfileImage(localUri);
    });
  }, [authUserInfo]);

  //ProjectDetail
  const navigation = useNavigation();

  const onPress = (entityId: number) => {
    dispatch(setIsProjectLoading());
    dispatch(setResetProject());
    navigation.navigate("ProjectDetail", { projectId: entityId });
  };

  const transformDateFormat = (date: Date) => {
    return new Date(date).toDateString();
  };

  const profileImage = () => {
    return userProfileImage ? (
      <Avatar.Image
        size={RFPercentage(6)}
        source={{ uri: userProfileImage }}
        style={{ margin: 5 }}
      />
    ) : (
      <Avatar.Text size={RFPercentage(8)} label={labelAvatar} />
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      {memoizedLocalLoading || isLoading ? (
        <LoadingScreen />
      ) : projects?.data?.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.cardsContainer}>
            <View style={styles.titleContainer}>
              {profileImage()}
              <View>
                <View style={styles.heroContainer}>
                  <Text style={styles.title}>Hello, </Text>
                  <Text style={styles.titleOrange}>
                    {authUserInfo.firstName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.subtitle}>Welcome back</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ margin: 22 }}>
            <Text style={titleStyles.titleProject}>My projects</Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <StateFilter
              setOnChangeLazy={setLazyProjects}
              lazy={lazyProjects}
              elementList={projects}
            />
          </View>

          {projects.data.length > 0 ? (
            <ScrollView scrollEnabled={enableScroll} style={{ height: 580 }}>
              {projects?.data?.map((project) => (
                <PlannerCard
                  key={project.id}
                  title={project.projectName}
                  entityId={project.id}
                  priority={priorityIdToString(project.priorityId) as string}
                  date={transformDateFormat(project.plannedEndDate)}
                  options={[
                    {
                      option: "View detail",
                      action: () => onPress(project.id),
                      icon: "eye-outline",
                    },
                  ]}
                  setOverlayOptions={setOverlayOptions}
                  setOverlayVisible={setOverlayVisible}
                />
              ))}
            </ScrollView>
          ) : (
            projects.recordsCount <= 0 ||
            (projects.recordsCount === undefined && <BlankPageScreen />)
          )}

          {projects.recordsCount && !overlayVisible && (
            <DataTable style={{ alignItems: "center" }}>
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(
                  projects.recordsCount / numberOfItemsPerPage
                )}
                onPageChange={(page) => onPageChange(page)}
                label={`${projects.recordsCount ? from + 1 : 0}-${
                  projects.recordsCount ? to : 0
                } of ${projects.recordsCount ? projects.recordsCount : 0}`}
                numberOfItemsPerPage={numberOfItemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
              />
            </DataTable>
          )}
        </View>
      ) : (
        <View style={styles.cardsContainer}>
          <View style={styles.titleContainer}>
            {profileImage()}
            <View>
              <View style={styles.heroContainer}>
                <Text style={styles.title}>Hello, </Text>
                <Text style={styles.titleOrange}>{authUserInfo.firstName}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Welcome back</Text>
              </View>
            </View>
          </View>
          <View></View>
        </View>
      )}
    </View>
  );
};
