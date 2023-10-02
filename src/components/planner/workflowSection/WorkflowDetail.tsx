import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { WorkFlowI } from "../../../interfaces/planner/workflow/workflowInterface";
import { RemainingTime } from "../../../interfaces/planner/common/commonPlannerInterfaces";
import { useDateTimeFormater } from "../../../hooks/useDateTimeFormater";
import { commonDetailStyles } from "../styles/CommonDetailComponentStyles";
import { AvatarGroupComponent } from "../../common/AvatarGroupComponent";
import { useAppSelector } from "../../../app/hooks";
import LoadingScreen from "../../../screens/LoadingScreen";

interface WorkflowDetailProps {
  workflow: WorkFlowI;
}
export const WorkflowDetail = ({ workflow }: WorkflowDetailProps) => {
  const [workflowAssignees, setWorkflowAssignees] = useState<
    { imageProfilePath: string | undefined; label: string }[]
  >([]);

  const { isLoadingWorkFlow, error } = useAppSelector(
    (state) => state.workflow
  );

  const [remainingTime, setremainingTime] = useState<RemainingTime>({
    months: 0,
    days: 0,
    hours: 0,
  });

  const startDate = new Date(workflow?.plannedStartDate).toDateString();
  const endDate = new Date(workflow?.plannedEndDate).toDateString();

  const userName = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  useEffect(() => {
    if (workflow?.id) {
      setremainingTime(getRemainingTime(workflow?.plannedEndDate));
      const assignees: {
        imageProfilePath: string | undefined;
        label: string;
      }[] = [];
      workflow?.workFlowsAssignees?.map((assignee) => {
        assignees.push({
          imageProfilePath: assignee?.userDataResponseModel?.imageProfilePath,
          label: userName(
            assignee?.userDataResponseModel?.firstName as string,
            assignee?.userDataResponseModel?.lastName as string
          ),
        });
      });
      setWorkflowAssignees(assignees);
    }
  }, [workflow]);

  const { getRemainingTime } = useDateTimeFormater();
  return (
    <View style={{ backgroundColor: "white", flex: 2 }}>
      {isLoadingWorkFlow ? (
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
                {workflow.description}
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
              {workflowAssignees.length > 0 ? (
                <AvatarGroupComponent avatars={workflowAssignees} />
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
