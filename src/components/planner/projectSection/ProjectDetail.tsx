import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Projects } from "../../../interfaces/planner/projects/projectsInterfaces";
import LoadingScreen from "../../../screens/LoadingScreen";
import { useAppSelector } from "../../../app/hooks";
import { AvatarGroupComponent } from "../../common/AvatarGroupComponent";
import { commonDetailStyles } from '../styles/CommonDetailComponentStyles';

interface ProjectDetailProps {
  project: Projects;
}

interface RemainingTime {
  months: number;
  days: number;
  hours: number;
}
interface ColorProps {
  color: string;
  background: string;
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const { isLoadingProject } = useAppSelector((state) => state.project);

  const [projectAssignees, setProjectAssignees] = useState<
  { imageProfilePath: string | undefined; label: string }[]
>([]);

  const [remainingTime, setremainingTime] = useState<RemainingTime>({
    months: 0,
    days: 0,
    hours: 0,
  });

  

  const startDate = new Date(project?.plannedStartDate).toDateString();
  const endDate = new Date(project?.plannedEndDate).toDateString();

  useEffect(() => {
    if (project?.id) {
      getRemainingTime(project?.plannedEndDate);
      const assignees: { imageProfilePath: string | undefined; label: string }[] = [];
      project?.usersInProjects?.map((assignee) => {
        assignees.push({
          imageProfilePath: assignee.userDataResponseModel?.imageProfilePath,
          label:
            assignee?.userDataResponseModel?.firstName[0] +
            assignee?.userDataResponseModel?.lastName[0],
        });
      });
      setProjectAssignees(assignees);
    }
  }, [project]);


  const navigation = useNavigation();

  useEffect(() => {
    // Función para cambiar el título
    const updateTitle = () => {
      if (project && project.projectName) {
        navigation.setOptions({
          title: project.projectName, // Cambia "project.name" por el campo del proyecto que desees usar como título
        });
      }
    };

    // Llama a la función para actualizar el título al cargar el componente
    updateTitle();
  }, [navigation, project]);

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
      {isLoadingProject ? (
        <LoadingScreen />
      ) : (
        <View style={commonDetailStyles.mainContainer}>
          <View style={[commonDetailStyles.dateContainer, {flex:0}]}>
            <View>
              <Text style={commonDetailStyles.generalText}>start</Text>
              <Text style={commonDetailStyles.generalText}>{startDate}</Text>
            </View>
            <View>
              <Text
                style={[
                  commonDetailStyles.generalText,
                  { textAlign: "right" },
                ]}
              >
                end
              </Text>
              <Text style={commonDetailStyles.generalText}>{endDate}</Text>
            </View>
          </View>
          <View style={[commonDetailStyles.remainingTimeContainer, {flex:0}]}>
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
                {project.description}
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
              {projectAssignees.length > 0 ? (
                <AvatarGroupComponent avatars={projectAssignees} />
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
