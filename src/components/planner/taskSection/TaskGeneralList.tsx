import React, { useEffect, useState } from "react";
import { PlannerCard } from "./../PlannerCard";
import { DataTable } from "react-native-paper";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTaskListThunkWithoutLazy,
  fetchTaskThunk,
} from "../../../redux/thunks/planner/task/taskThunk";
import LoadingScreen from "../../../screens/LoadingScreen";
import { priorityIdToString } from "../../../helpers/convertPriority";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import {
  setResetTask,
  setResetTasks,
  startLoading,
  startLoadingTask,
  setOnChangebodyGetTask,
} from "../../../redux/slices/planner/task/taskSlice";
import { StateFilter } from "../../../redux/thunks/planner/filters/StateFilter";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { fetchProjectsThunk } from "../../../redux/thunks/planner/projects/projectThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import ToastComponent from "../../../utilities/ToastComponent";
import { titleStyles } from "../styles/titleStyles";


interface TaskListProps {
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const TaskGeneralList = ({
  setOverlayVisible,
  setOverlayOptions,
}: TaskListProps) => {
  const {
    tasks,
    lazyTask,
    isLoading,
    bodyGetTaskWitoutLazy,
    errorSearcherTask,
  } = useAppSelector((state) => state.task);


  const { authUserInfo } = useAppSelector((state) => state.auth);
  

  const {
    projects,
    lazyProjects,
    isLoading: isLoadingProject,
  } = useAppSelector((state) => state.project);

  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const [enableScroll, setenableScroll] = useState(true);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, tasks.recordsCount);
  const toProject = Math.min(
    (page + 1) * numberOfItemsPerPage,
    projects.recordsCount
  );
  const navigation = useNavigation();

  const [showProject, setshowProject] = useState(false);
  const [setEntityId, setSetEntityId] = useState<number>();

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(fetchTaskThunk({ ...lazyTask, page: page + 1 }));
  };

  const onPageChangeProjects = (page: number) => {
    setPage(page);
    dispatch(fetchProjectsThunk({ ...lazyProjects, page: page + 1 }));
  };

  const onPress = (entityId: number) => {
    dispatch(startLoadingTask());
    dispatch(setResetTask());
    navigation.navigate("TaskDetail", { taskId: entityId });
  };
  const transformDateFormat = (date: Date) => {
    return new Date(date).toDateString();
  };

  useEffect(() => {
    const types = [{ label: "Select Project", value: -1 }];
    projects?.data?.map((project) => {
      types.push({
        label: project.projectName,
        value: project.id,
      });
    });
  }, [projects]);

  //Cuando selecciono el project desde el overlay
  const today = new Date();

  const onPressProjects = async (entityId: number, projectTitle: string) => {
    dispatch(startLoading());
    setOverlayVisible(false);
    dispatch(setResetTasks());
    setshowProject(!showProject);
    setSetEntityId(entityId);

    const bodyGetTaskWitoutLazyNew = {
      ...bodyGetTaskWitoutLazy,
      projectId: entityId,
      state: 0,
      showBookmarksOnly: false,
    };

    try {
      await AsyncStorage.setItem("projectId", entityId.toString());
      await AsyncStorage.setItem("projectTitle", projectTitle);

      dispatch(setOnChangebodyGetTask(bodyGetTaskWitoutLazyNew));
      dispatch(fetchTaskListThunkWithoutLazy(bodyGetTaskWitoutLazyNew));
      
    } catch (error) {
      console.error(error)
    }
  };

 

  const resetTitle = async () => {
    dispatch(setResetTasks());
    await AsyncStorage.setItem("projectTitle", "Select Project");
    await AsyncStorage.setItem("projectId", "-1");
  };

  useEffect(() => {
    resetTitle();

    return () => {
      resetTitle();
    }
  }, []);

  useEffect(() => {
    if (setEntityId) {
      dispatch(startLoading());
      dispatch(setResetTasks());
      getProjectTitle();
      //dispatch(fetchTaskListThunk(lazyTask, setEntityId?.toString()));
      dispatch(fetchTaskListThunkWithoutLazy(bodyGetTaskWitoutLazy));
    }
  }, [lazyTask, bodyGetTaskWitoutLazy]);

  const [projectTitle, setProjectTitle] = useState("Select Project...");
  const [projectIsSelect, setprojectIsSelect] = useState<string>();

  let titleReplace = "";
  if (projectTitle) {
    titleReplace =
      projectTitle?.length > 25
        ? projectTitle?.substring(0, 25) + "..."
        : projectTitle;
  }

  useEffect(() => {
    // Obtener el valor guardado en AsyncStorage y establecerlo en el estado
    getProjectTitle();
  }, [onPressProjects]);

  const getProjectTitle = async () => {
    try {
      const projectTitle = await AsyncStorage.getItem("projectTitle");
      const projectId = await AsyncStorage.getItem("projectId");
      if (projectTitle !== null) {
        setProjectTitle(projectTitle);
      }

      if (projectId !== null) {
        setprojectIsSelect(projectId);
      }
    } catch (error) {}
  };

  const onShowProjects = () => {
    setshowProject(!showProject);
  };

  useEffect(() => {
    if(errorSearcherTask.errorText) {
      Toast.show({
        type: 'error',
        text1: errorSearcherTask.errorText,
      });
    }
  }, [errorSearcherTask]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
 
    <ToastComponent type={"error"} text1={""} text2={""} error={errorSearcherTask} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: "5%",
              paddingTop: "10%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={onShowProjects}
              style={{ flexDirection: "row" }}
            >
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  marginRight: RFPercentage(1),
                }}
              >
                {titleReplace}
              </Text>
              <Ionicons
                name={
                  showProject ? "chevron-up-outline" : "chevron-down-outline"
                }
                size={RFPercentage(3.5)}
              />
            </TouchableOpacity>

            {projectIsSelect !== "-1" ? (
              <TouchableOpacity
                onPress={() => resetTitle()}
                style={{ flexDirection: "row" }}
              >
                <Ionicons name={"close-outline"} size={RFPercentage(3.5)} />
              </TouchableOpacity>
            ) : null}
          </View>

          {showProject ? (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Text
                style={titleStyles.title}
              >
                My Projects
              </Text>
              {isLoadingProject ? (
                <View style={{ marginTop: 150 }}>
                  <LoadingScreen />
                </View>
              ) : (
                <ScrollView
                  scrollEnabled={enableScroll}
                  style={{ height: 580, paddingBottom: 10 }}
                >
                  {projects?.data?.map((project) => (
                    <PlannerCard
                      key={project.id}
                      title={project.projectName}
                      entityId={project.id}
                      priority={
                        priorityIdToString(project.priorityId) as string
                      }
                      date={transformDateFormat(project.plannedEndDate)}
                      options={[
                        {
                          option: "Select Project",
                          action: () =>
                            onPressProjects(project.id, project.projectName),
                          icon: "eye-outline",
                        },
                      ]}
                      setOverlayOptions={setOverlayOptions}
                      setOverlayVisible={setOverlayVisible}
                      isSelected={
                        project.id.toString() === projectIsSelect ? true : false
                      }
                    />
                  ))}
                  <DataTable style={{ alignItems: "center" }}>
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(
                        projects?.recordsCount / numberOfItemsPerPage
                      )}
                      onPageChange={(page) => onPageChangeProjects(page)}
                      label={`${from + 1}-${toProject} of ${
                        projects?.recordsCount
                      }`}
                      numberOfItemsPerPage={numberOfItemsPerPage}
                      onItemsPerPageChange={onItemsPerPageChange}
                    />
                  </DataTable>
                </ScrollView>
              )}
            </View>
          ) : (
            <View style={{ flex: 1, backgroundColor: "white" }}>

              <Text
                style={titleStyles.title}
              >
                My Tasks
              </Text>

              {projectIsSelect !== "-1" ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: 5,
                    elevation: -1,
                  }}
                >
                  <StateFilter
                    setOnChangeLazy={setOnChangebodyGetTask}
                    lazy={bodyGetTaskWitoutLazy}
                    filterTask={true}
                    resetElements={setResetTasks}
                    elementList={tasks}
                  />
                </View>
              ) : null}

              {tasks?.data?.length > 0 ? (
                <View style={{flex: 1}}>
                  <ScrollView style={{ height: 580}}>
                    {tasks?.data?.map((task) => (
                      <PlannerCard
                        key={task.id}
                        title={task.title}
                        options={[
                          {
                            option: "View detail",
                            action: () => onPress(task.id),
                            icon: "eye-outline",
                          },
                        ]}
                        entityId={task.id}
                        date={transformDateFormat(task?.plannedEndDate)}
                        priority={priorityIdToString(task.priorityId) as string}
                        setOverlayOptions={setOverlayOptions}
                        setOverlayVisible={setOverlayVisible}
                      />
                    ))}
                  </ScrollView>
                </View>
              ) : (
                <View style={{ height: "85%" }}>
                  <BlankPageScreen />
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
