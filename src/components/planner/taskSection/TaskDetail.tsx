import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TaskI } from "../../../interfaces/planner/task/taskInterface";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TaskStates } from "../../../data/TaskStates";
import {
  ColorProps,
  RemainingTime,
} from "../../../interfaces/planner/common/commonPlannerInterfaces";
import { Ionicons } from "@expo/vector-icons";
import { commonDetailStyles } from "../styles/CommonDetailComponentStyles";
import { AvatarGroupComponent } from "../../common/AvatarGroupComponent";

interface TaskDetailProps {
  task: TaskI;
  taskStates: { [key: number]: string };
}

export const TaskDetail = ({ task }: TaskDetailProps) => {
  const [remainingTime, setremainingTime] = useState<RemainingTime>({
    months: 0,
    days: 0,
    hours: 0,
  });
  const [mapStates, setmapStates] = useState<{ [key: number]: string }>(
    TaskStates
  );

  const tagColorMap: { [key: string]: ColorProps } = {
    None: { color: "black", background: "#C6C5CC" },
    "In Progress": { color: "#17a5e6", background: "#33bfff1a" },
    Done: { color: "#16a34a", background: "#61c4544d" },
    "On Validation": { color: "#9333ea", background: "#f6eefe" },
    "To Do": { color: "#9333ea", background: "#f6eefe" },
    Rejected: { color: "#d81d47", background: "#cc292929" },
    Approved: { color: "#16a34a", background: "#61c4544d" },
  };

  const currentState = mapStates[task?.stateId ?? 1];
  const currentStateColor = tagColorMap[currentState]?.color;
  const currentStateBackground = tagColorMap[currentState]?.background;
  const [taskAssignees, setTaskAssignees] = useState<
  { imageProfilePath: string | undefined; label: string }[]
>([]);

const userName = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`;
};

  useEffect(() => {
    if (task?.id) {
      getRemainingTime(task?.plannedEndDate);

      const assignees: { imageProfilePath: string | undefined; label: string }[] = [];
      task?.tasksAssignees?.map((assignee) => {
        assignees.push({
          imageProfilePath: assignee.userDataResponseModel?.imageProfilePath,
          label:userName(
            assignee?.userDataResponseModel?.firstName as string, 
            assignee?.userDataResponseModel?.lastName as string)

        });
      });
      setTaskAssignees(assignees);
    }
  }, [task]);

  const startDate = new Date(task?.plannedStartDate).toDateString();
  const endDate = new Date(task?.plannedEndDate).toDateString();

  useEffect(() => {
    if (task?.id) {
      getRemainingTime(task?.plannedEndDate);
    }
  }, [task]);

  const getRemainingTime = (date: Date): void => {
    const currentDate = new Date();
    const endDate = new Date(date);

    const miliseconds = endDate.getTime() - currentDate.getTime();
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const countHours = Math.floor(minutes / 60);
    const countDays = Math.floor(countHours / 24);

    const months =
      Math.floor(countDays / 30) > 0 ? Math.floor(countDays / 30) : 0;
    const days = countDays % 30 > 0 ? countDays % 30 : 0;
    const hours = countHours % 24 > 0 ? countHours % 24 : 0;

    setremainingTime({ months, days, hours });
  };

  const percentageComplete = !isNaN(
    (task?.countFilledForms * 100) / task?.recordGoals
  )
    ? Math.ceil((task?.countFilledForms * 100) / task?.recordGoals)
    : 0;

  return (
    <View style={taskDetailStyles.mainContainer}>
      <View style={taskDetailStyles.dateContainer}>
        <View>
          <Text style={taskDetailStyles.generalText}>start</Text>
          <Text style={taskDetailStyles.generalText}>{startDate}</Text>
        </View>
        <View>
          <Text style={[taskDetailStyles.generalText, { textAlign: "right" }]}>
            end
          </Text>
          <Text style={taskDetailStyles.generalText}>{endDate}</Text>
        </View>
      </View>
      <View style={taskDetailStyles.remainingTimeContainer}>
        <View style={taskDetailStyles.remainingTime}>
          <Text style={taskDetailStyles.remainingDateText}>
            {remainingTime.months}
          </Text>
          <Text style={taskDetailStyles.remainingDescriptionText}>months</Text>
        </View>
        <View style={taskDetailStyles.remainingTime}>
          <Text style={taskDetailStyles.remainingDateText}>
            {remainingTime.days}
          </Text>
          <Text style={taskDetailStyles.remainingDescriptionText}>days</Text>
        </View>
        <View style={taskDetailStyles.remainingTime}>
          <Text style={taskDetailStyles.remainingDateText}>
            {remainingTime.hours}
          </Text>
          <Text style={taskDetailStyles.remainingDescriptionText}>hours</Text>
        </View>
      </View>

      <View style={taskDetailStyles.taskDetailContainer}>
        <View style={taskDetailStyles.detailView}>
          <View style={taskDetailStyles.cardDetailView}>
            <View style={taskDetailStyles.datailViewContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="flame-outline"
                  style={{ marginRight: 8, marginTop: 3, color: "orange" }}
                  size={RFPercentage(2)}
                />
                <Text style={taskDetailStyles.generalText}>Records Goal</Text>
              </View>
              <Text style={taskDetailStyles.generalText}>
                {task?.recordGoals}
              </Text>
            </View>
          </View>

          <View style={taskDetailStyles.cardDetailView}>
            <View style={taskDetailStyles.datailViewContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="newspaper-outline"
                  style={{ marginRight: 8, marginTop: 3, color: "orange" }}
                  size={RFPercentage(2)}
                />
                <Text style={taskDetailStyles.generalText}>Filled forms</Text>
              </View>

              <Text style={taskDetailStyles.generalText}>
                {task?.countFilledForms}
              </Text>
            </View>
          </View>

          <View style={taskDetailStyles.cardDetailView}>
            <View style={taskDetailStyles.datailViewContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="golf-outline"
                  style={{ marginRight: 8, marginTop: 3, color: "orange" }}
                  size={RFPercentage(2)}
                />
                <Text style={taskDetailStyles.generalText}>Progress</Text>
              </View>
              <Text style={taskDetailStyles.generalText}>
                {percentageComplete} %
              </Text>
            </View>
          </View>

          <View style={taskDetailStyles.cardDetailView}>
            <View style={taskDetailStyles.datailViewContainer}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="checkbox-outline"
                  style={{ marginRight: 8, marginTop: 3, color: "orange" }}
                  size={RFPercentage(2)}
                />
                <Text style={taskDetailStyles.generalText}>State</Text>
              </View>
              <Text style={taskDetailStyles.generalText}>{currentState}</Text>
            </View>
          </View>

          <View style={{marginRight: 260}}>
            <Text style={commonDetailStyles.sectionTitle}>Shared</Text>
            <View
              style={[
                commonDetailStyles.detailView,
                { justifyContent: "flex-start" },
              ]}
            >
              {taskAssignees.length > 0 ? (
                <AvatarGroupComponent avatars={taskAssignees} />
              ) : (
                <Text style={commonDetailStyles.generalText}>
                  Not shared yet
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("screen").width;

const taskDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RFPercentage(2),
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remainingTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: RFPercentage(3),
  },
  taskDetailContainer: {
    flex: 2,
    marginTop: RFPercentage(5),
    alignItems: "center",
  },
  remainingTime: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    backgroundColor: "#17a5e6",
    borderRadius: RFPercentage(3),
    justifyContent: "center",
    alignItems: "center",
  },
  generalText: {
    fontSize: RFPercentage(2.3),
  },
  remainingDateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFPercentage(4),
  },
  remainingDescriptionText: {
    color: "white",
    fontSize: RFPercentage(2.3),
  },
  detailView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetailView: {
    width: RFPercentage(20),
    margin: RFPercentage(1.2),
    padding: RFPercentage(1.5),
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardStateDetailView: {
    alignItems: "center",
    height: 50,
    paddingTop: 10,
  },
  datailViewContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
});
