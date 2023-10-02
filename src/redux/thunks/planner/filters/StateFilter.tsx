import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { FilterLazy, Lazy } from "../../../../interfaces/functionalInterfaces";
import {
  setFilterStateValue,
  generalStateReducer,
} from "../../../slices/planner/generalStatesSlice";
import { GetTaskListWithoutLazy } from "../../../../interfaces/planner/task/taskInterface";

interface Props {
  setOnChangeLazy: any;
  lazy: any;
  filterTask?: boolean;
  resetElements?: any;
  elementList: any;
}

export const StateFilter = ({
  setOnChangeLazy,
  lazy,
  filterTask,
  resetElements,
  elementList,
}: Props) => {
  // Filtrar los elementos que coincidan con el estado typeState
  const { filterStateValue } = useAppSelector((state) => state.generalState);
  const { tasks } = useAppSelector((state) => state.task);
  const [selectedTypeState, setSelectedTypeState] = useState<string | null>(filterStateValue);
  const stateOptions = ["Backlog", "To Do", "In Process", "Done"];
  const stateOptionsTask = [
    "Backlog",
    "To Do",
    "In Process",
    "On Validation",
    "Done",
  ];

  const filterOptions = filterTask ? stateOptionsTask : stateOptions;
  const dispatch = useAppDispatch();

  const [stateFilter, setStateFilter] = useState<{
    field: string;
    value: string;
    matchMode: string;
  } | null>(null);

  const handleTypeStateChange = (newTypeState: string) => {
    if (newTypeState === selectedTypeState) {
      //dispatch(resetElements())
      // Si se selecciona el mismo estado, reinicia el filtro de estado
      setSelectedTypeState(null);
      dispatch(setFilterStateValue(null)); // Reiniciar el valor del filtro en el estado global
      const filteredLazy = {
        ...lazy,
        filter: (lazy.filter?.filter((filter: FilterLazy) => filter.field !== "stateId")),
      };

      const bodyGetTaskWitoutLazyNew = {
        ...lazy,
        state: 0
      };

      {
        filterTask
          ? dispatch(setOnChangeLazy(bodyGetTaskWitoutLazyNew))
          : dispatch(setOnChangeLazy(filteredLazy));
      }
    } else {
      // Si se selecciona un estado diferente, aplica el filtro de estado
      //dispatch(resetElements())
      setSelectedTypeState(newTypeState);
      dispatch(setFilterStateValue(newTypeState));
      const stateId =
        newTypeState === "Backlog"
          ? 1
          : newTypeState === "To Do"
          ? 2
          : newTypeState === "In Process"
          ? 3
          : newTypeState === "On Validation"
          ? 4
          : newTypeState === "Done"
          ? 5
          : 0;

      const newStateFilter = {
        field: "stateId",
        value: stateId.toString(),
        matchMode: "equals",
      };

      const filteredLazy = {
        ...lazy,
        filter: lazy.filter?.filter((filter: FilterLazy) => filter.field !== "stateId"),
      };

      if (stateId !== 0) {
        filteredLazy.filter?.push(newStateFilter);
      }

      setStateFilter(newStateFilter);

      //Filter Task state without lazy
      const bodyGetTaskWitoutLazyNew = {
        ...lazy,
        state: stateId
      };

      {
        filterTask
          ? dispatch(setOnChangeLazy(bodyGetTaskWitoutLazyNew))
          : dispatch(setOnChangeLazy(filteredLazy));
      }
    }
  };

  const stateIdCounts: { [key: number]: number } = {};

  // Supongamos que elemetList contiene la lista de elementos que proporcionaste

  if (elementList && elementList.data) {
    for (const item of elementList.data) {
      const stateId = item?.stateId;
      stateIdCounts[stateId] = (stateIdCounts[stateId] || 0) + 1;
    }
  }

  // Ahora, stateIdCounts contiene el conteo de elementos para cada stateId
 
  const stateIdMap : {[key: string]: number} = {
    "Backlog": 1,
    "To Do": 2,
    "In Process": 3,
    "On Validation": 4,
    "Done": 5,
  };

  const getStyleForState = (stateOption: string): any => {
    switch (stateOption) {
      case "Backlog":
        return style.countBacklog;
      case "To Do":
        return style.countTodo;
      case "In Process":
        return style.countProcess;
      case "On Validation":
        return style.countOnValidation;
      case "Done":
        return style.countDone;
      default:
        return {}; // Estilo por defecto si no coincide con ningún estado
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        {filterOptions.map((stateOption) => (
          <TouchableOpacity
            key={stateOption}
            style={[
              style.container,
              selectedTypeState === stateOption ? style.selected : null,
            ]}
            onPress={() => handleTypeStateChange(stateOption)}
          >
            <Text>{stateOption}</Text>
            <Text style={getStyleForState(stateOption)}>
              {stateIdCounts[stateIdMap[stateOption]] || 0}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    width: "auto",
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  selected: {
    backgroundColor: "#E6E6E6", // Color de fondo cuando está seleccionado
  },
  rowContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: RFPercentage(2),
    // color: "gray",
  },
  countBacklog: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "gray",
    borderRadius: 14,
    marginLeft: 5,
    textAlign: "center",
    padding: 3,
    color: "white",
    fontWeight: "400",
  },
  countTodo: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#a855f7",
    borderRadius: 14,
    marginLeft: 5,
    textAlign: "center",
    padding: 3,
    color: "white",
    fontWeight: "400",
  },
  countProcess: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#17a5e6",
    borderRadius: 14,
    marginLeft: 5,
    textAlign: "center",
    padding: 3,
    color: "white",
    fontWeight: "400",
  },
  countOnValidation: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#a855f7",
    borderRadius: 14,
    marginLeft: 5,
    textAlign: "center",
    padding: 3,
    color: "white",
    fontWeight: "400",
  },
  countDone: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#16a34a",
    borderRadius: 14,
    marginLeft: 5,
    textAlign: "center",
    padding: 3,
    color: "white",
    fontWeight: "400",
  },
});
