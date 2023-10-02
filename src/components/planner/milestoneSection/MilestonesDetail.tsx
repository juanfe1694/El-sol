import { useEffect, useState } from "react";
import { View, Text} from "react-native";
import LoadingScreen from "../../../screens/LoadingScreen";
import { useAppSelector } from "../../../app/hooks";
import React from "react";
import { Milestone } from "../../../interfaces/planner/milestones/milestonesInterface";
import { commonDetailStyles } from "../styles/CommonDetailComponentStyles";
import { AvatarGroupComponent } from "../../common/AvatarGroupComponent";
import { useNavigation } from "@react-navigation/native";

interface milestoneDetailProps {
  milestone: Milestone;
}

interface RemainingTime {
  months: number;
  days: number;
  hours: number;
}

export const MilestoneDetail = ({ milestone }: milestoneDetailProps) => {
  const { isLoadingMilestoneById } = useAppSelector((state) => state.milestone);

  

  const [milestoneAssignees, setmilestoneAssignees] = useState<
    { imageProfilePath: string | undefined; label: string }[]
  >([]);
  const [remainingTime, setremainingTime] = useState<RemainingTime>({
    months: 0,
    days: 0,
    hours: 0,
  });

  const startDate = new Date(milestone?.plannedStartDate).toDateString();
  const endDate = new Date(milestone?.plannedEndDate).toDateString();

  const userName = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  useEffect(() => {
    if (milestone?.id) {
      getRemainingTime(milestone?.plannedEndDate);

      const assignees:
        | ((prevState: never[]) => never[])
        | { imageProfilePath: string | undefined; label: string }[] = [];
      milestone?.milestonesAssignees?.map((assignee) => {
        assignees.push({
          imageProfilePath: assignee.userDataResponseModel?.imageProfilePath,
          label: userName(
            assignee?.userDataResponseModel?.firstName as string,
            assignee?.userDataResponseModel?.lastName as string
          ),
        });
      });
      setmilestoneAssignees(assignees);
    }
  }, [milestone]);

  const navigation = useNavigation();

  useEffect(() => {
    // Función para cambiar el título
    const updateTitle = () => {
      if (milestone && milestone.title) {
        navigation.setOptions({
          title: milestone.title, // Cambia "milestone.name" por el campo del proyecto que desees usar como título
        });
      }
    };

    // Llama a la función para actualizar el título al cargar el componente
    updateTitle();
  }, [navigation, milestone]);

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

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 2,
      }}
    >
      {isLoadingMilestoneById ? (
        <LoadingScreen />
      ) : (
        <View style={commonDetailStyles.mainContainer}>
          <View style={[commonDetailStyles.dateContainer, { flex: 0 }]}>
            <View>
              <Text style={commonDetailStyles.generalText}>start</Text>
              <Text style={commonDetailStyles.generalText}>{startDate}</Text>
            </View>
            <View>
              <Text
                style={[commonDetailStyles.generalText, { textAlign: "right" }]}
              >
                end
              </Text>
              <Text style={commonDetailStyles.generalText}>{endDate}</Text>
            </View>
          </View>
          <View
            style={[commonDetailStyles.remainingTimeContainer, { flex: 0 }]}
          >
            <View style={commonDetailStyles.remainingTime}>
              <Text style={commonDetailStyles.remainingDateText}>
                {remainingTime.months}
              </Text>
              <Text style={commonDetailStyles.remainingDescriptionText}>
                months
              </Text>
            </View>
            <View style={commonDetailStyles.remainingTime}>
              <Text style={commonDetailStyles.remainingDateText}>
                {remainingTime.days}
              </Text>
              <Text style={commonDetailStyles.remainingDescriptionText}>
                days
              </Text>
            </View>
            <View style={commonDetailStyles.remainingTime}>
              <Text style={commonDetailStyles.remainingDateText}>
                {remainingTime.hours}
              </Text>
              <Text style={commonDetailStyles.remainingDescriptionText}>
                hours
              </Text>
            </View>
          </View>

          <View style={commonDetailStyles.workFlowSections}>
            <Text style={commonDetailStyles.sectionTitle}>Description</Text>
            <View>
              <Text style={commonDetailStyles.generalText}>
                {milestone.description}
              </Text>
            </View>
          </View>

          <View style={commonDetailStyles.workFlowSections}>
            <Text style={commonDetailStyles.sectionTitle}>Shared</Text>
            <View
              style={[
                commonDetailStyles.detailView,
                { justifyContent: "flex-start" },
              ]}
            >
              {milestoneAssignees.length > 0 ? (
                <AvatarGroupComponent avatars={milestoneAssignees} />
              ) : (
                <Text style={commonDetailStyles.generalText}>
                  Not shared yet
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
