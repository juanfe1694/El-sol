import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { resetStates } from "../../helpers/resetStates";
import { UseFetchFavorite } from "../../hooks/UseFetchFavorite";
import { UseLazyLoadDinamic } from "../../hooks/UseLazyLoadDinamic";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setLazyProjects,
  setResetProjects,
} from "../../redux/slices/planner/projects/projectsSlice";
import {
  setOnChangeLazy,
  setOnChangeWorkflowLazyDetail,
  setResetWorkflows,
} from "../../redux/slices/planner/workflow/workflowSlice";
import {
  onChangeLazyMilestones,
  onChangeLazyMilestonesDetail,
  setResetMilestones,
} from "../../redux/slices/planner/milestones/milestoneSlice";
import {
  setOnChangeTaskLazyDetail,
  setResetTasks,
} from "../../redux/slices/planner/task/taskSlice";
import { fetchUsersThunk } from "../../redux/thunks/userThunk";
import { resetUsersList } from "../../redux/slices/userSlice";
import { DatePickerInput } from "react-native-paper-dates";
import { DialogDown } from "../dialogs/DialogDown";
import { Searchbar } from "react-native-paper";

interface SearcherProps {
  typeItem:
    | "users"
    | "project"
    | "workflow"
    | "workflowByProject"
    | "milestoneByWorkflow"
    | "milestone"
    | "taskByMilestone"
    | "task"
    | "subTask";
  parentId?: string | undefined;
  activeWorkflowTypePlus?: number | undefined;
  lazyOrderProp?: string;
  isLoading: boolean;
}

export const Searcher = ({
  typeItem,
  isLoading,
  activeWorkflowTypePlus,
  lazyOrderProp,
  parentId,
}: SearcherProps) => {
  const dispatch = useAppDispatch();

  const { filterBy, users } = useAppSelector((state) => state.user);

  // helper to reset state
  const {
    resetProjects,
    resetWorkflowByProject,
    resetWorkflows,
    resetMilestonesByWorkflow,
    resetMilestones,
    resetTasksByMilestone,
    resetUsers,
  } = resetStates();

  //Custom Hook fetch favorite
  const {
    fetchProject,
    fetchWorkflowChild,
    fetchWorkflow,
    fetchMilestonesChild,
    fetchMilestones,
    fetchTaskChild,
  } = UseFetchFavorite();

  //Custom Hook de lazy load
  const { lazyElementDetail, lazyElementLayout } = UseLazyLoadDinamic(
    typeItem,
    activeWorkflowTypePlus,
    lazyOrderProp as string
  );

  const onSearch = (text: string) => {
    const titleItem = text;
    //Validamos la iformacion que le vamos a enviar al lazy load, se hace de manera dinamica segun el typeItem cambiamos el fielName y si el valor el numero o string.
    const isNumeric = /^\d+$/.test(titleItem.toString());

    const fieldName = isNumeric
      ? "id"
      : typeItem === "project"
      ? "projectName"
      : typeItem === "users"
      ? filterBy
      : "title";

    const matchMode = isNumeric ? "equals" : "contains";

    const filter = {
      field: fieldName,
      value: titleItem,
      matchMode: matchMode,
    };

    ;

    //*Lazy para Elementos
    const existingFilters = (lazyElementLayout.filter || []).filter(
      (f) =>
        f.field !== "id" && f.field !== "projectName" && f.field !== "title"
    );

    //Lazy Layout
    const lazyLayout = {
      ...lazyElementLayout,
      filter: [...existingFilters, filter],
    };

    //*Lazy para detalles de projects, workflow y milestones

    const existingFiltersDetail = (lazyElementDetail.filter || []).filter(
      (f) =>
        f.field !== "id" && f.field !== "projectName" && f.field !== "title"
    );

    //Lazy Detail
    let lazyDetailElements = {
      ...lazyElementDetail,
      filter: [...existingFiltersDetail, filter],
    };

    let lazyDetailSubTask = {
      field: "taskParentId",
      value: parentId!,
      matchMode: "equals",
    };

    //Cases for the search in the different views of the application
    if (titleItem.length >= 1) {
      switch (typeItem) {
        case "users":
          dispatch(resetUsersList());
          dispatch(fetchUsersThunk(lazyLayout));

          break;

        case "project":
          dispatch(setResetProjects());
          dispatch(setLazyProjects(lazyLayout));
          dispatch(fetchProject(lazyLayout));

          break;

        case "workflowByProject":
          if (activeWorkflowTypePlus !== undefined) {
            dispatch(setResetWorkflows());
            dispatch(setOnChangeWorkflowLazyDetail(lazyDetailElements));
            dispatch(fetchWorkflowChild(lazyDetailElements));
          }

          break;

        case "workflow":
          dispatch(setResetWorkflows());
          dispatch(setOnChangeLazy(lazyLayout));
          dispatch(fetchWorkflow(lazyLayout));
          break;

        case "milestoneByWorkflow":
          dispatch(setResetMilestones());
          dispatch(onChangeLazyMilestonesDetail(lazyDetailElements));
          dispatch(fetchMilestonesChild(lazyDetailElements));

          break;

        case "milestone":
          dispatch(setResetMilestones());
          dispatch(onChangeLazyMilestones(lazyLayout));
          dispatch(fetchMilestones(lazyLayout));

          break;

        case "taskByMilestone":
          dispatch(setResetTasks());
          dispatch(setOnChangeTaskLazyDetail(lazyDetailElements));
          dispatch(fetchTaskChild(lazyDetailElements));

          break;

        case "subTask":
          dispatch(setResetTasks());
          //dispatch(setOnChangeTaskLazyDetail(lazyDetailElements));
          //dispatch(fetchTaskChild(lazyDetailElements));

          break;

        default:
          // Realizar acción predeterminada
          null;
          break;
      }
    } else if (titleItem.length === 0 || !titleItem) {
      switch (typeItem) {
        case "users":
          resetUsers();
          break;

        case "project":
          resetProjects();
          break;

        case "workflowByProject":
          resetWorkflowByProject(parentId!);
          break;

        case "workflow":
          resetWorkflows();
          break;

        case "milestoneByWorkflow":
          resetMilestonesByWorkflow(parentId!);
          break;

        case "milestone":
          resetMilestones();
          break;

        case "taskByMilestone":
          resetTasksByMilestone(parentId!);
          break;

        //TODO: Add task searcher
        // case "task":
        //   dispatch(setResetSummaryItem());
        //   dispatch(fetchTaskThunk(lazyTask));
        //   break;

        // case "subTask":
        //   dispatch(setResetSummaryItem());
        //   dispatch(
        //     fetchTaskThunk({ ...lazyTask, filter: [{ ...lazyDetailSubTask }] })
        //   );
        //   break;

        default:
          null;
          break;
      }
    }
  };

  //Date Input
  const [date, setDate] = useState<Date>();

  ;

  //Change format Date structure to filter the users
  const onChangeDate = (d: Date) => {
    setDate(d);
    ;
    let fechaOriginal = new Date(d);
    let anio = fechaOriginal.getFullYear();
    let mes = ("0" + (fechaOriginal.getMonth() + 1)).slice(-2);
    let dia = ("0" + fechaOriginal.getDate()).slice(-2);
    let fechaFormateada = anio + "-" + mes + "-" + dia;
    onSearch(fechaFormateada);

    if (!fechaFormateada) {
      resetUsers();
    }
  };

  //Show input date
  const [inputDate, setInputDate] = useState(false);

  //value input email and name
  const [text, setText] = useState("");

  //on submit input enter
  useEffect(() => {
    if(text.length >= 3) {
    onSearch(text);
    }
  }, [text])
  


  return (
    <View style={styles.searchContainer}>
      {inputDate ? (
        <DatePickerInput
          locale="en"
          //label={""}
          value={date}
          onChange={(d) => onChangeDate(d as Date)}
          inputMode="start"
          style={{ backgroundColor: "white", height: 55 }}
        />
      ) : (
        <View style={styles.searcher}>
          <Searchbar
            value={text}
            onChangeText={setText}
            placeholder={
              filterBy === "fullName"
                ? "Search by Name"
                : filterBy === "email"
                ? "Search by Email"
                : filterBy === "creationDate"
                ? "Search by Creation Date"
                : "Search"
            }
            //keyboardType="email-address"
            //autoCapitalize="none"
            //autoCorrect={false}
            style={{backgroundColor: 'white'}}
          />
        </View>
      )}
      <DialogDown setInputDate={setInputDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  searcher: {
    flexDirection: "row",
    //backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#F7F8FA",
    backgroundColor: 'trasnparent'
  },
  filterBy: {
    marginLeft: 20,
  },
});
