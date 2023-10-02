import React, { useEffect, useState } from "react";
import { PlannerCard } from "./../PlannerCard";
import { DataTable } from "react-native-paper";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FetchResponseTasks } from "../../../interfaces/planner/task/taskInterface";
import { useNavigation } from "@react-navigation/native";
import { fetchTaskThunk } from "../../../redux/thunks/planner/task/taskThunk";
import LoadingScreen from "../../../screens/LoadingScreen";
import { priorityIdToString } from "../../../helpers/convertPriority";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import {
  setOnChangeLazy,
  setResetTask,
  setResetTasks,
  startLoading,
  startLoadingTask,
} from "../../../redux/slices/planner/task/taskSlice";
import { StateFilter } from "../../../redux/thunks/planner/filters/StateFilter";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { boolean } from "yup";
import { FilterLazy } from "../../../interfaces/functionalInterfaces";

interface TaskListProps {
  milestoneId: number;
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const TaskList = ({
  milestoneId,
  setOverlayVisible,
  setOverlayOptions,
}: TaskListProps) => {
  const { tasks, lazyTask, isLoading } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const localRecords = tasks.recordsCount;

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, tasks.recordsCount);
  const navigation = useNavigation();

  /* The code snippet is performing the following tasks: */
  const infoFilter = lazyTask.filter?.map((filter) => {
    const filterState = filter;
    return filterState;
  });

  const stateIdFilter = infoFilter?.find(
    (filter) => filter.field === "stateId"
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage, stateIdFilter?.value]);

  useEffect(() => {
    const currentFilters = [...(lazyTask?.filter as FilterLazy[])];
    const filteredArray = currentFilters.filter(
      (x) => x.field != "milestoneId"
    );

    dispatch(
      setOnChangeLazy({
        ...lazyTask,
        filter: [
          ...filteredArray,
          {
            field: "milestoneId",
            value: `${milestoneId}`,
            matchMode: "equals",
          },
        ],
      })
    );
  }, [milestoneId]);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    /**When lazyMilestones changes get new milestones */

    const isParentInArray = lazyTask?.filter?.find(
      (x) => x.field == "milestoneId"
    );

    isParentInArray && dispatch(startLoading());
    dispatch(setResetTasks());
    dispatch(fetchTaskThunk(lazyTask));
    setPage(0);
  }, [lazyTask]);

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(fetchTaskThunk({ ...lazyTask, page: page + 1 }));
  };

  const onPress = (entityId: number) => {
    dispatch(startLoadingTask());
    navigation.navigate("TaskDetail", { taskId: entityId });
    dispatch(setResetTask());
  };
  const transformDateFormat = (date: Date) => {
    return new Date(date).toDateString();
  };

  console.log("isLoading", isLoading);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: "5%",
              paddingVertical: "7%",
            }}
          >
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="arrow-back" size={RFPercentage(3.5)} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: "5%",
                marginVertical: "2%",
                fontWeight: "500",
                fontSize: RFPercentage(2.8),
              }}
            >
              My Tasks
            </Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%", backgroundColor: 'blue' }}>
            <StateFilter
              setOnChangeLazy={setOnChangeLazy}
              lazy={lazyTask}
              filterTask={false}
              elementList={tasks}
            />
          </View>
          {tasks?.data?.length > 0 ? (
            <ScrollView>
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
          ) : (
            localRecords <= 0 ||
            (localRecords === undefined && <BlankPageScreen />)
          )}

          {localRecords && (
            <DataTable style={{ alignItems: "center" }}>
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(
                  tasks.recordsCount / numberOfItemsPerPage
                )}
                onPageChange={(page) => onPageChange(page)}
                label={`${localRecords ? from + 1 : 0}-${localRecords ? to : 0} of ${tasks.recordsCount ? localRecords : 0}`}
                numberOfItemsPerPage={numberOfItemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
              />
            </DataTable>
          )}
        </View>
      )}
    </View>
  );
};
