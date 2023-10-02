import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LoadingScreen from "../../../screens/LoadingScreen";
import { PlannerCard } from "../PlannerCard";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { DataTable } from "react-native-paper";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StateFilter } from "../../../redux/thunks/planner/filters/StateFilter";
import { useNavigation } from "@react-navigation/native";
import { priorityIdToString } from "../../../helpers/convertPriority";

import { fetchMilestonesThunk } from "../../../redux/thunks/planner/milestones/milestonesThunk";
import {
  onChangeLazyMilestones,
  setResetMilestone,
  starLoadingMilestoneById,
  startLoading,
} from "../../../redux/slices/planner/milestones/milestoneSlice";
import { Ionicons } from "@expo/vector-icons";
import {
  FetchResponseMilestone,
  Milestone,
} from "../../../interfaces/planner/milestones/milestonesInterface";
import { FilterLazy } from "../../../interfaces/functionalInterfaces";
import { paginatorStyles } from "../../styles/generalStyles";

interface MilestonesListProps {
  workflowId: number;
  setOverlayVisible: (displayOverlay: boolean) => void;
  setOverlayOptions: (overlayOptions: OverlayProps[]) => void;
}

export const MilestonesList = ({
  workflowId,
  setOverlayVisible,
  setOverlayOptions,
}: MilestonesListProps) => {
  const { milestones, isLoading, lazyMilestones } = useAppSelector(
    (state) => state.milestone
  );
  const [localMilestones, setLocalMilestones] = useState(
    {} as FetchResponseMilestone
  );

  const localRecords = localMilestones?.recordsCount;

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    milestones?.recordsCount
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to dispatch an action to update the `lazyMilestones` state in the
    Redux store. */
  useEffect(() => {
    const currentFilters = [...(lazyMilestones?.filter as FilterLazy[])];
    const filteredArray = currentFilters.filter((x) => x.field != "workflowId");

    dispatch(
      onChangeLazyMilestones({
        ...lazyMilestones,
        filter: [
          ...filteredArray,
          {
            field: "workflowId",
            value: `${workflowId}`,
            matchMode: "equals",
          },
        ],
      })
    );

    return () => {
      dispatch(
        onChangeLazyMilestones({
          ...lazyMilestones,
          filter: [...filteredArray],
        })
      );
    };
  }, [workflowId]);

  /* The code snippet is filtering the `lazyMilestones` array to find the filter object with the
  `field` property equal to "stateId". It then assigns the value of this filter object to the
  `stateIdFilter` variable. */
  const infoFilter = lazyMilestones.filter?.map((filter) => {
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
    /**When lazyMilestones changes get new milestones */

    const isParentInArray = lazyMilestones?.filter?.find(
      (x) => x.field == "workflowId"
    );
    isParentInArray &&
      dispatch(fetchMilestonesThunk(lazyMilestones))
        .then((data) => {
          setLocalMilestones(data as FetchResponseMilestone);
        })
        .catch((err) => {
          setLocalMilestones({} as FetchResponseMilestone);
        });
    setPage(0);
  }, [lazyMilestones]);

  const onPageChange = (page: number) => {
    setPage(page);
    dispatch(fetchMilestonesThunk({ ...lazyMilestones, page: page + 1 }));
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
              My milestones
            </Text>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <StateFilter
              setOnChangeLazy={onChangeLazyMilestones}
              lazy={lazyMilestones}
              elementList={milestones}
            />
          </View>
          {localRecords > 0 ? (
            <ScrollView>
              {localMilestones?.data?.map((milestone) => (
                <PlannerCard
                  key={milestone.id}
                  title={milestone.title}
                  entityId={milestone.id}
                  priority={priorityIdToString(milestone.priorityId) as string}
                  date={transformDateFormat(milestone?.plannedEndDate)}
                  options={[
                    {
                      option: "View detail",
                      action: () => {
                        dispatch(starLoadingMilestoneById());
                        dispatch(setResetMilestone());
                        navigation.navigate("MilestoneDetail", {
                          milestoneId: milestone.id,
                        });
                      },
                    },
                  ]}
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
