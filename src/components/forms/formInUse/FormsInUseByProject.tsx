import { useEffect, useState } from "react";
import { PlannerCard } from "../../planner/PlannerCard";
import { IconButton } from "react-native-paper";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../../screens/LoadingScreen";
import { priorityIdToString } from "../../../helpers/convertPriority";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFilledFormsThunk } from "../../../redux/thunks/forms/filledFormThunk";
import {
  Form,
  FormInUse,
  GetFilledFormsRequest,
} from "../../../interfaces/form";
import {
  fetchFormInUse,
  resetFormInUse,
} from "../../../redux/slices/forms/formsLinksSlice";
import { titleStyles } from "../../planner/styles/titleStyles";
import { useCheckConnectionAndSync } from "../../../hooks/conectivity/useCheckConnectionAndSync";
import NetInfo from "@react-native-community/netinfo";
import { Projects } from "../../../interfaces/planner/projects/projectsInterfaces";
import { fetchFormInUseById, startLoading } from "../../../redux/slices/forms/filledFormSlice";
import { getFormsInUseByProjectIdThunk } from "../../../redux/thunks/connection/connectionThunk";
import {
  resetForms,
  setIsLoading,
  stopSetIsLoading,
} from "../../../redux/slices/connection/connectionSlice";
import { Ionicons } from "@expo/vector-icons";
interface FormByProjectListProps {
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const FormsInUseByProject = ({
  setOverlayVisible,
  setOverlayOptions,
}: FormByProjectListProps) => {

  const {
    projects,
    lazyProjects,
    isLoading: isLoadingProject,
  } = useAppSelector((state) => state.project);

  const { isLoading: isLoadingForms, synchronizingProjects } = useAppSelector(
    (state) => state.connection
  );

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {
    projects: projectsConnection,
    forms: formsConnection,
    synchronizingForms,
    synchronizeAll,
    getSinchronizedForms,
    getAndSyncProjects,
  } = useCheckConnectionAndSync();

  const [localProjects, setLocalProjects] = useState<Projects[]>([]);
  const [localForms, setLocalForms] = useState<FormInUse[]>([]);
  const [showProject, setshowProject] = useState(false);
  const [entityId, setEntityId] = useState<number | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  //Set projects to async storage
  /*NetInfo module listen for
  changes in the device's network connectivity. It is adding an event listener that will call the
  `handleConnectivityChange` function whenever the connectivity state changes. */
  useEffect(() => {
    getAndSyncProjects();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected as boolean);
      if (entityId !== undefined) {
        synchronizeAll();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /* The above code is checking if the `entityId` is not undefined and if the length of the
  `localForms` array is greater than or equal to 1. If both conditions are true, then the
  `isValidListForm` variable will be set to `true`. */
  const isValidListForm = entityId !== undefined && localForms.length >= 1;

  /**
   * The function `areFormsEqual` compares two forms based on their `FormBankId` property and returns a
   * boolean value indicating whether they are equal.
   * @param {FormInUse} form1 - FormInUse object representing the first form being compared.
   * @param {FormInUse} form2 - The `form2` parameter is of type `FormInUse`.
   * @returns a boolean value indicating whether the `FormBankId` property of `form1` is equal to the
   * `FormBankId` property of `form2`.
   */
  const areFormsEqual = (form1: FormInUse, form2: FormInUse) => {
    return form1.FormBankId === form2.FormBankId;
  };

  // Initialize an array to store the results of each form
  const formResults: any = [];

  // Iterate through the first array and check if each form is in the second array
  formsConnection.forEach((form) => {
    const isFormInLocal = localForms.some((localForm) =>
      areFormsEqual(form, localForm)
    );

    // Based on the result, assign the corresponding icon and color for this form
    const formIcon = isFormInLocal
      ? "checkmark-circle-outline"
      : "refresh-outline";
    const formColor = isFormInLocal ? "green" : "#ffcc32";

    // Add the result to the list of results
    formResults.push({
      form: form,
      isFormInLocal: isFormInLocal,
      icon: formIcon,
      color: formColor,
    });
  });

  /**
   * The function onPressProjects sets various states and async storage values, and dispatches an
   * action to fetch form data based on the provided entityId.
   * @param {number} entityId - The entityId parameter is a number that represents the unique
   * identifier of a project entity.
   * @param {string} projectTitleToForm - The project title is a string that represents the title of a
   * project.
   */
  const filterFormLocal = (projectIdToForm: number) => {
    return formsConnection.filter((form) => form.projectId === projectIdToForm);
  };

  //Get projects Local
  useEffect(() => {
    setLocalProjects(projectsConnection);
  }, [projectsConnection]);

  //Get Forms
  useEffect(() => {
    if (isConnected && entityId !== undefined) {
      setLocalForms(filterFormLocal(entityId));
    } else if (!isConnected && entityId !== undefined) {
      setLocalForms(filterFormLocal(entityId));
    }
  }, [formsConnection]);

  //Change state loading form in use
  useEffect(() => {
    if (localForms.length >= 1) {
      dispatch(stopSetIsLoading());
    }
  }, [localForms]);

  /**
   * The function `handleConnectivityChange` handles changes in connectivity by dispatching actions,
   * fetching and synchronizing projects, and logging messages.
   * @param {boolean} isConnected - The `isConnected` parameter is a boolean value that indicates
   * whether the device is currently connected to the internet or not.
   */

  const transformDateFormat = (date: Date) => {
    return new Date(date).toDateString();
  };

  useEffect(() => {
    /* The above code is creating an array called `types` with an initial object containing a label and
    value. It then checks if a variable `isConnected` is true. */
    const types = [{ label: "Select Project", value: -1 }];

    if (isConnected) {
      projects?.data?.map((project: { projectName: string; id: number }) => {
        types.push({
          label: project.projectName,
          value: project.id,
        });
      });
    }
  }, []);

  //Select project
  const onPressProjects = async (
    entityId: number,
    projectTitleToForm: string
  ) => {
    setLocalForms([]);
    dispatch(setIsLoading());
    setOverlayVisible(false);
    setshowProject(!showProject);
    setEntityId(entityId);

    try {
      await AsyncStorage.setItem("projectIdToForm", entityId.toString());
      await AsyncStorage.setItem("projectTitleToForm", projectTitleToForm);

      //Validation connection mode and get forms
      if (isConnected) {
        dispatch(getFormsInUseByProjectIdThunk(entityId));
      } else {
        getSinchronizedForms().then(() => {
          setLocalForms(filterFormLocal(entityId));
        });
        setTimeout(() => {
          dispatch(stopSetIsLoading());
        }, 1000);
      }
    } catch (error) {}
  };

  /**
   * The function `resetTitle` resets the project title and ID in AsyncStorage and dispatches a reset
   * action.
   */
  const resetTitle = async () => {
    setLocalForms([]);
    setEntityId(undefined);
    await AsyncStorage.setItem("projectTitleToForm", "Select Project");
    await AsyncStorage.setItem("projectIdToForm", "-1");
  };

  useEffect(() => {
    resetTitle();

    return () => {
      resetTitle();
      setProjectTitle("Select Project");
    };
  }, []);

  useEffect(() => {
    if (entityId) {
      getProjectTitle();
    }
  }, []);

  const [projectTitleToForm, setProjectTitle] = useState("Select Project...");

  const [projectIsSelect, setprojectIsSelect] = useState<string>("-1");

  let titleReplace = "";
  if (projectTitleToForm) {
    titleReplace =
      projectTitleToForm?.length > 25
        ? projectTitleToForm?.substring(0, 25) + "..."
        : projectTitleToForm;
  }

  /*It is setting up a side effect that will be triggered whenever the onPressProjects variable changes. The side effect
  is calling the getProjectTitle function. */
  useEffect(() => {
    getProjectTitle();
  }, [onPressProjects]);

  const getProjectTitle = async () => {
    try {
      const projectTitleToForm = await AsyncStorage.getItem(
        "projectTitleToForm"
      );
      const projectIdToForm = await AsyncStorage.getItem("projectIdToForm");
      if (projectTitleToForm !== null) {
        setProjectTitle(projectTitleToForm);
      }

      if (projectIdToForm !== null) {
        setprojectIsSelect(projectIdToForm);
      }
    } catch (error) {}
  };

  /**
   * The function `onShowProjects` toggles the visibility of projects and retrieves local forms if an
   * `entityId` is provided.
   */
  const onShowProjects = () => {
    setshowProject(!showProject);
    //get local projects
    if (entityId !== undefined) {
      setLocalForms(filterFormLocal(entityId));
    }
  };

  //Forms logic
  const fillForm = (formId: string) => {
    dispatch(resetFormInUse());
    navigation.navigate("FormRendererScreen", {
      formInUseId: formId,
    });
  };

  const generateQr = (formInUse: Form) => {
    dispatch(fetchFormInUse(formInUse));
    navigation.navigate("QrGeneratorScreen");
  };

  const viewFilledForms = (formInUse: Form) => {
    const getFilledFormsQueryParameters: GetFilledFormsRequest = {
      FormsInUseId: formInUse?.Id as string,
    };
    dispatch(startLoading())
    dispatch(fetchFilledFormsThunk(getFilledFormsQueryParameters));
    dispatch(fetchFormInUseById(formInUse));

    navigation.navigate("FilledFormScreen", {
      formName: formInUse.Name[0].Text as string,
    });
  };

  const displayOverlay = (formInUse: any) => {
    setOverlayVisible(true);
    const overlayOptions: OverlayProps[] = [];

    isConnected &&
      overlayOptions.push({
        option: "Generate QR",
        action: () => generateQr(formInUse),
      });

    formInUse &&
      isConnected &&
      overlayOptions.push({
        option: "View filled forms",
        action: () => viewFilledForms(formInUse),
      });

    !isConnected &&
      overlayOptions.push({
        option: "Fill form",
        action: () => fillForm(formInUse?.Id as string),
      });

    setOverlayOptions(overlayOptions);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoadingProject || synchronizingProjects ? (
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
                style={[
                  titleStyles.subTitle,
                  {
                    marginRight: RFPercentage(1),
                  },
                ]}
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
                style={{
                  marginLeft: "5%",
                  marginVertical: "2%",
                  fontWeight: "500",
                  fontSize: RFPercentage(3),
                }}
              >
                {isConnected ? "My Projects" : "My Projects without connection"}
              </Text>
              {synchronizingProjects ? (
                <View style={{ marginTop: 150 }}>
                  <LoadingScreen />
                </View>
              ) : (
                <ScrollView style={{ height: 580 }}>
                  {localProjects.map((project: any) => (
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
                </ScrollView>
              )}
            </View>
          ) : (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <Text style={titleStyles.title}>My Forms</Text>

              {isValidListForm ? (
                <View style={{ paddingHorizontal: 15 }}>
                  <ScrollView style={{ height: 580 }}>
                    {localForms.map((form: FormInUse) => {
                      // Encuentra el resultado correspondiente al formulario actual en formResults
                      const result = formResults.find(
                        (result: any) =>
                          result.form.FormBankId === form.FormBankId
                      );

                      return (
                        <View key={form?.Id} style={formInUseStyles.card}>
                          <View style={formInUseStyles.cardContainer}>
                            <View
                              style={{
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignContent: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={formInUseStyles.cardText}>
                                  {
                                    form.Name.find(
                                      (desc) => desc.Language === "English"
                                    )?.Text
                                  }
                                </Text>

                                <IconButton
                                  icon="dots-horizontal"
                                  size={RFPercentage(3)}
                                  onPress={() => displayOverlay(form)}
                                  style={{
                                    borderRadius: RFPercentage(1),
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text style={formInUseStyles.creationDate}>
                                  <Ionicons
                                    name="calendar-outline"
                                    size={RFPercentage(2.5)}
                                  />{" "}
                                  {transformDateFormat(form.CreatedAt)}
                                </Text>
                                <Ionicons
                                  name={result?.icon} // Utiliza el icono del resultado correspondiente
                                  size={RFPercentage(3)}
                                  style={{
                                    marginRight: RFPercentage(1.5),
                                    color: result?.color, // Utiliza el color del resultado correspondiente
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : isLoadingForms ? (
                <View style={{ marginTop: 150 }}>
                  <LoadingScreen />
                </View>
              ) : (
                localForms.length <= 0 && (
                  <View style={{ height: "85%" }}>
                    <BlankPageScreen />
                  </View>
                )
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const formInUseStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RFPercentage(2),
    marginTop: RFPercentage(22),
  },
  title: {
    fontSize: RFPercentage(2.3),
  },
  card: {
    marginVertical: RFPercentage(1),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 8,
    height: RFPercentage(12),
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
  },
  cardText: {
    fontSize: RFPercentage(2.2),
    marginLeft: RFPercentage(2.5),
    marginTop: RFPercentage(1),
    flexWrap: "wrap",
    width: "80%",
    height: "auto",
  },
  creationDate: {
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(2),
    width: "60%",
  },
});
