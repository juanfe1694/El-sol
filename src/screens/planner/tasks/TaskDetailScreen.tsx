import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  NavigationProps,
  StateInterface,
} from "../../../interfaces/functionalInterfaces";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { FormInUseList } from "../../../components/forms/formInUse/FormInUseList";
import { TaskDetailHeader } from "../../../components/planner/taskSection/TaskDetailHeader";
import { RFPercentage } from "react-native-responsive-fontsize";
import { OverlayScreen } from "../../overlay/OverlayScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { TaskStates, staticStates } from "../../../data/TaskStates";
import {
  fetchChangeTaskStateThunk,
  fetchTaskByIdThunk,
} from "../../../redux/thunks/planner/task/taskThunk";
import LoadingScreen from "../../LoadingScreen";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setTasks } from "../../../redux/slices/planner/task/taskSlice";
import ToastComponent from "../../../utilities/ToastComponent";
import {
  FetchResponseTasks,
  TaskI,
} from "../../../interfaces/planner/task/taskInterface";
import { fetchStatesThunk } from "../../../redux/thunks/planner/generalStates/generalStatesThunk";
import { TaskDetail } from "../../../components/planner/taskSection/TaskDetail";
import { useIsFocused } from "@react-navigation/native";

export const TaskDetailScreen = ({ route, navigation }: NavigationProps) => {
  const { tasks, loadingTask, changeStateFetch, error } = useAppSelector(
    (state) => state.task
  );
  const { authUserInfo } = useAppSelector((state) => state.auth);
  const { lazyStates } = useAppSelector((state) => state.generalState);

  const { taskId } = route?.params || {}; // Desestructura el objeto o utiliza un objeto vacío si route.params es nulo

  /**Overlay dependencies */
  const [overlayVisible, setoverlayVisible] = useState(false);
  const [overlayProps, setoverlayProps] = useState<OverlayProps[]>([]);
  const [mapStates, setmapStates] = useState<{ [key: number]: string }>(
    TaskStates
  );
  const [task, setTask] = useState<TaskI>({} as TaskI);
  const [taskStates, setTaskStates] = useState(staticStates);
  const asignee = task?.tasksAssignees?.find(
    (x) => x.userId == authUserInfo.id
  );

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setoverlayVisible(false);
  }, [isFocused])

  useEffect(() => {
    dispatch(fetchStatesThunk(lazyStates)).then((res) => {
      const states: { [key: number]: string } = {};
      res?.data.map((x) => {
        states[x.id] = x.state;
      });
      setmapStates(states);
      setTaskStates(res as StateInterface);
    });

    dispatch(fetchTaskByIdThunk(taskId)).then((task) => {
      setoverlayVisible(false);
      const currentTask = task && task[0];
      setTask(currentTask as TaskI);
      navigation.setOptions({
        title: currentTask?.title,
        headerTitleStyle: { fontSize: RFPercentage(2.5) },
        headerRight: () => <TaskDetailHeader displayOverlay={displayOverlay} />,
      });
    });
  }, []);

  useEffect(() => {
    if (changeStateFetch) {
      const taskResponse: TaskI = {
        ...task,
        stateId: changeStateFetch.stateId,
      };

      setTask(taskResponse);
      const currentTasks = [...tasks?.data];
      const filteredTasks = currentTasks.filter((x) => x.id !== taskId);
      const updatedTasks = filteredTasks.concat(taskResponse);
      const newTasks: FetchResponseTasks = {
        data: updatedTasks,
        recordsCount: tasks?.recordsCount,
      };

      dispatch(setTasks(newTasks));

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task state updated.",
      });
    }
  }, [changeStateFetch]);

  const handleUpdateState = (stateId: number) => {
    dispatch(fetchChangeTaskStateThunk({ taskId, state: stateId }));
    setoverlayVisible(false);
  };

  const updateTaskState = () => {
    setoverlayVisible(true);
    //Show done option if user is aprover
    const overlayOptions: OverlayProps[] = [];
    let filteredData = taskStates?.data?.filter((x) => x.state != "None");

    if (!asignee?.isAprover)
      filteredData = filteredData?.filter((x) => x.state != "Done");

    filteredData?.map((x) => {
      overlayOptions.push({
        option: x.state,
        action: () => handleUpdateState(x.id),
      });
    });

    TaskStates;

    setoverlayProps(overlayOptions);
  };

  const displayOverlay = () => {
    setoverlayVisible(true);

    //Show update state if user is not lector
    const overlayOptions: OverlayProps[] = [];
    !asignee?.readOnly &&
      overlayOptions.push({
        option: "Change state",
        action: () => updateTaskState(),
      });

    setoverlayProps(overlayOptions);
  };

  return (
    <>
      {loadingTask ? (
        <View style={taskDetailStyles.mainContainer}>
          <LoadingScreen />
        </View>
      ) : (
        <View style={taskDetailStyles.mainContainer}>
          <ToastComponent
            type={"error"}
            text1={"Update Error"}
            text2={"The task was not updated correctly"}
            error={error}
          />
          <OverlayScreen
            overlayVisible={overlayVisible}
            setoverlayVisible={setoverlayVisible}
            overlayProps={overlayProps}
          />

          <View style={taskDetailStyles.detailContainer}>
            <TaskDetail task={task} taskStates={mapStates} />
          </View>
          <View style={taskDetailStyles.formListContainer}>
            <FormInUseList
              taskId={taskId}
              setoverlayVisible={setoverlayVisible}
              setoverlayProps={setoverlayProps}
            />
          </View>
        </View>
      )}
      <Toast />
    </>
  );
};

const taskDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  detailContainer: {
    flex: 1,
  },
  formListContainer: {
    flex: 1,
  },
});
