import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LoadingScreen from "../../../screens/LoadingScreen";
import { PlannerCard } from "../PlannerCard";
import { fetchWorkflowThunk } from "../../../redux/thunks/planner/workflow/workflowThunk";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { DataTable } from "react-native-paper";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import {
  DropDownComponent,
  DropDownValue,
} from "../../common/DropDownComponent";
import { fetchWorkflowTypesByWorkflowParentIdThunk } from "../../../redux/thunks/planner/workflow/workflowTypesThunk";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StateFilter } from "../../../redux/thunks/planner/filters/StateFilter";
import {
  setIsLoadingWorkflow,
  setOnChangeLazy,
  setResetWorkflows,
} from "../../../redux/slices/planner/workflow/workflowSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { priorityIdToString } from "../../../helpers/convertPriority";
import {
  FetchResponseWorkflows,
  WorkflowTypeInterface,
} from "../../../interfaces/planner/workflow/workflowInterface";
import { FilterLazy } from "../../../interfaces/functionalInterfaces";
import { paginatorStyles } from "../../styles/generalStyles";

interface WorkflowsListProps {
  projectId: number;
  overlayVisible: boolean;
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

/** `WorkflowsList` is responsible for rendering a list of workflows based on certain filters and pagination.
 * @param {number} projectId - The id of the project.
 * @param {Function} setOverlayVisible - The function that update the overlay menu visibility.
 * @param {Function} setOverlayOptions - The function that sets the menu options.
 */
export const WorkflowsList = ({
  projectId,
  setOverlayVisible,
  overlayVisible,
  setOverlayOptions,
}: WorkflowsListProps) => {
  const { workflows, isLoading, lazyWorkflows } = useAppSelector(
    (state) => state.workflow
  );
  // const [localWorkflows, setLocalWorkflows] = useState(
  //   {} as FetchResponseWorkflows
  // );

  useEffect(() => {
    console.log('lazyWorkflows' ,lazyWorkflows.filter)
      console.log('isLoading' ,isLoading)
  }, [isLoading, lazyWorkflows])
  

  const localRecords = workflows?.recordsCount;

  const [workflowType, setworkflowType] = useState<DropDownValue>({
    label: "All types",
    value: -1,
  });
  const [typesMap, settypesMap] = useState<DropDownValue[]>();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    workflows?.recordsCount
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to dispatch an action to update the `lazyWorkflows` state in the
    Redux store. */

  useEffect(() => {
    // setLocalWorkflows({}  as FetchResponseWorkflows)

    const currentFilters = [...(lazyWorkflows?.filter as FilterLazy[])];
    const filteredArray = currentFilters.filter(
      (x) => x.field != "workFlowParentId"
    );

    dispatch(
      setOnChangeLazy({
        ...lazyWorkflows,
        filter: [
          ...filteredArray,
          {
            field: "workFlowParentId",
            value: `${projectId}`,
            matchMode: "equals",
          },
        ],
      })
    );

    /* This code is dispatching an asynchronous action `fetchWorkflowTypesThunk(0,0)` to fetch
      workflow types from the database. Once the data is fetched successfully, the `then` block is
      executed. */
    dispatch(fetchWorkflowTypesByWorkflowParentIdThunk(projectId)).then(
      (data) => {
        const types: DropDownValue[] = [{ label: "None", value: -1 }];
        data?.map((x: WorkflowTypeInterface) => {
          types.push({
            label: x.workFlowType,
            value: x.id,
          });
        });
        settypesMap(types);
      }
    );

    return () => {
      dispatch(
        setOnChangeLazy({
          ...lazyWorkflows,
          filter: [...filteredArray],
        })
      );
    };
  }, []);

  /* The code snippet is performing the following tasks: */
  const infoFilter = lazyWorkflows.filter?.map((filter) => {
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
    /**When lazyWorkflows changes get new workflows */
    dispatch(setResetWorkflows())
    const isParentInArray = lazyWorkflows?.filter?.find(
      (x) => x.field == "workFlowParentId"
    );
    isParentInArray &&
      dispatch(fetchWorkflowThunk(lazyWorkflows))
    setPage(0);
  }, [lazyWorkflows]);

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(fetchWorkflowThunk({ ...lazyWorkflows, page: page + 1 }));
  };

  /**
   * The `onTypeChange` function updates the filters and workflow type based on the selected option.
   * @param {DropDownValue} option - The `option` parameter is of type `DropDownValue`.
   */
  const onTypeChange = (option: DropDownValue) => {
    const currentFilters = [...(lazyWorkflows.filter as FilterLazy[])];
    const arrayFiltered = currentFilters.filter(
      (x) => x.field != "workFlowTypeId"
    );
    const filterByType = [];
    option.value != -1 &&
      filterByType.push({
        field: "workFlowTypeId",
        value: `${option.value}`,
        matchMode: "equals",
      });

    dispatch(
      setOnChangeLazy({
        ...lazyWorkflows,
        filter: [...arrayFiltered, ...filterByType],
      })
    );

    setworkflowType(option);
  };

  /**
   * The function `transformDateFormat` takes a `Date` object as input and returns a string
   * representation of the date in the format "DayOfWeek Month Day Year".
   * @param {Date} date - The `date` parameter is of type `Date` and represents the date that needs
   * to be transformed.
   * @returns The function `transformDateFormat` returns a string representation of the date in the
   * format "DayOfWeek Month Day Year".
   */
  const transformDateFormat = (date: Date) => {
    return new Date(date).toDateString();
  };


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
              paddingTop: "10%",
            }}
          >
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="arrow-back" size={RFPercentage(3.5)} />
            </TouchableOpacity>
            {typesMap && (
              <View style={{ marginLeft: "15%" }}>
                <DropDownComponent
                  defaultValue={workflowType}
                  displayLabel={workflowType?.label}
                  optionList={typesMap as DropDownValue[]}
                  onInputChange={onTypeChange}
                />
              </View>
            )}
          </View>
          <Text
            style={{
              marginLeft: "5%",
              marginVertical: "2%",
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
          >
            My workflows
          </Text>

          <View style={{ flexDirection: "row", width: "100%", marginTop: 10 }}>
            <StateFilter
              setOnChangeLazy={setOnChangeLazy}
              lazy={lazyWorkflows}
              elementList={workflows}
            />
          </View>
          {localRecords > 0 ? (
            <ScrollView>
              {workflows?.data?.map((workflow) => (
                <PlannerCard
                  key={workflow.id}
                  title={workflow.title}
                  entityId={workflow.id}
                  priority={priorityIdToString(workflow.priorityId) as string}
                  date={transformDateFormat(workflow?.plannedEndDate)}
                  options={[
                    {
                      option: "View detail",
                      action: () => {
                        dispatch(setIsLoadingWorkflow());
                        navigation.navigate("WorkflowDetailScreen", {
                          workflowId: workflow.id,
                        });
                      },
                      icon: "eye-outline",
                    },
                  ]}
                  setOverlayOptions={setOverlayOptions}
                  setOverlayVisible={setOverlayVisible}
                />
              ))}
            </ScrollView>
          ) : isLoading ? (
            <LoadingScreen />
          ) : (
            localRecords <= 0 || localRecords === undefined
            && <BlankPageScreen />
          )}

          {localRecords && (
            <DataTable style={{ alignItems: "center", }}>
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(localRecords / numberOfItemsPerPage)}
                onPageChange={(page) => onPageChange(page)}
                label={`${localRecords ? from + 1 : 0}-${
                  localRecords ? to : 0
                } of ${localRecords ? localRecords : 0}`}
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
