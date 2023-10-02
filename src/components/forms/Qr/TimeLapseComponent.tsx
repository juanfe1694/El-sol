import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { QrGeneratorStyles } from "./QrGeneratorStyles";
import {
  TimeLapse,
  TimeLapseProps,
} from "../../../interfaces/planner/forms/qrGeneratorInterfaces";
import { useDateTimeFormater } from "../../../hooks/useDateTimeFormater";

const initialFormatedDate = {
  startDate: "Date",
  startTime: "Time",
  endDate: "Date",
  endTime: "Time",
};

const initialShowDatePickerValues = {
  startDate: false,
  startTime: false,
  endDate: false,
  endTime: false,
};

export const TimeLapseComponent = ({
  setTimeLapseValues,
  timeLapseValues,
}: TimeLapseProps) => {
  const [formatedDate, setformatedDate] = useState(initialFormatedDate);
  const [showDatePicker, setshowDatePicker] = useState( initialShowDatePickerValues );

  const { convertTo12HourFormat } = useDateTimeFormater();

  const dataValues = (dataField: string) => {
    switch (dataField) {
      case "Start date":
        return {
          //   minimumDate: new Date(),
          value: timeLapseValues?.startDate ?? new Date(),
          mode: "date",
          onChange: (event: any, selectedDate: Date) => {
            setshowDatePicker({ ...showDatePicker, startDate: false });
            setTimeLapseValues({
              ...(timeLapseValues as TimeLapse),
              startDate: selectedDate,
            });
            setformatedDate({
              ...formatedDate,
              startDate: selectedDate.toDateString(),
            });
          },
        };

      case "Start time":
        return {
          //   minimumDate: new Date(),
          value: timeLapseValues?.startTime ?? new Date(),
          mode: "time",
          is24Hour: false,
          onChange: (event: any, selectedDate: Date) => {
            selectedDate.setMinutes(selectedDate.getMinutes() + 1);
            setshowDatePicker({ ...showDatePicker, startTime: false });
            setTimeLapseValues({
              ...(timeLapseValues as TimeLapse),
              startTime: selectedDate,
            });
            setformatedDate({
              ...formatedDate,
              startTime: convertTo12HourFormat(selectedDate.toString()),
            });
          },
        };
      case "End date":
        return {
          minimumDate: timeLapseValues?.startDate,
          value: timeLapseValues?.endDate ?? new Date(),
          mode: "date",
          onChange: (event: any, selectedDate: Date) => {
            setshowDatePicker({ ...showDatePicker, endDate: false });
            setTimeLapseValues({
              ...(timeLapseValues as TimeLapse),
              endDate: selectedDate,
            });
            setformatedDate({
              ...formatedDate,
              endDate: selectedDate.toDateString(),
            });
          },
        };
      case "End time":
        return {
          minimumDate: timeLapseValues?.startDate,
          value: timeLapseValues?.endTime ?? new Date(),
          mode: "time",
          is24Hour: false,
          onChange: (event: any, selectedDate: Date) => {
            selectedDate.setMinutes(selectedDate.getMinutes() + 1);
            setshowDatePicker({ ...showDatePicker, endTime: false });
            setTimeLapseValues({
              ...(timeLapseValues as TimeLapse),
              endTime: selectedDate,
            });
            setformatedDate({
              ...formatedDate,
              endTime: convertTo12HourFormat(selectedDate.toString()),
            });
          },
        };
      default:
        break;
    }
  };

  return (
    <View style={QrGeneratorStyles.timeStampMainContainer}>
      <View style={QrGeneratorStyles.timestampContainer}>
        <Text>Start</Text>
        <TouchableOpacity
          style={QrGeneratorStyles.timestampContainer}
          activeOpacity={0.9}
          onPress={() =>
            setshowDatePicker({ ...showDatePicker, startDate: true })
          }
        >
          <Ionicons name={"calendar-outline"} size={20} color={"black"} />
          <Text> {formatedDate.startDate} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={QrGeneratorStyles.timestampContainer}
          activeOpacity={0.9}
          onPress={() =>
            setshowDatePicker({ ...showDatePicker, startTime: true })
          }
        >
          <Ionicons name={"time-outline"} size={20} color={"black"} />
          <Text> {formatedDate.startTime} </Text>
        </TouchableOpacity>
      </View>
      <View style={QrGeneratorStyles.timestampContainer}>
        <Text>End</Text>
        <TouchableOpacity
          disabled={formatedDate.startDate == "Date"}
          style={[
            QrGeneratorStyles.timestampContainer,
            formatedDate.startDate == "Date" && QrGeneratorStyles.disabled,
          ]}
          activeOpacity={0.9}
          onPress={() =>
            setshowDatePicker({ ...showDatePicker, endDate: true })
          }
        >
          <Ionicons name={"calendar-outline"} size={20} color={"black"} />
          <Text> {formatedDate.endDate} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={formatedDate.startDate == "Date"}
          style={[
            QrGeneratorStyles.timestampContainer,
            formatedDate.startDate == "Date" && QrGeneratorStyles.disabled,
          ]}
          activeOpacity={0.9}
          onPress={() =>
            setshowDatePicker({ ...showDatePicker, endTime: true })
          }
        >
          <Ionicons name={"time-outline"} size={20} color={"black"} />
          <Text> {formatedDate.endTime} </Text>
        </TouchableOpacity>
      </View>
      {showDatePicker.startDate && (
        <DateTimePicker
          value={timeLapseValues?.startDate ?? new Date()}
          mode={"date"}
          minimumDate={new Date()}
          onChange={
            (event: any, selectedDate: Date | undefined) => {
              setshowDatePicker({ ...showDatePicker, startDate: false });
              setTimeLapseValues({
                ...(timeLapseValues as TimeLapse),
                startDate: selectedDate as Date,
              });
              setformatedDate({
                ...formatedDate,
                startDate: (selectedDate as Date).toDateString(),
              });
            }
          }
        />
      )}
      {showDatePicker.startTime && (
        <DateTimePicker
          value={timeLapseValues?.startTime ?? new Date()}
          mode={"time"}
          onChange={
            (event: any, selectedDate: Date | undefined) => {
              setshowDatePicker({ ...showDatePicker, startTime: false });
              setTimeLapseValues({
                ...(timeLapseValues as TimeLapse),
                startTime: selectedDate as Date,
              });
              setformatedDate({
                ...formatedDate,
                startTime: convertTo12HourFormat((selectedDate as Date).toString()),
              });
            }
          }
        />
      )}
      {showDatePicker.endDate && (
        <DateTimePicker
          value={timeLapseValues?.endDate ?? new Date()}
          mode={"date"}
          minimumDate={timeLapseValues?.startDate}
          onChange={
            (event: any, selectedDate: Date | undefined) => {
              setshowDatePicker({ ...showDatePicker, endDate: false });
              setTimeLapseValues({
                ...(timeLapseValues as TimeLapse),
                endDate: selectedDate as Date,
              });
              setformatedDate({
                ...formatedDate,
                endDate: (selectedDate as Date).toDateString(),
              });
            }
          }
        />
      )}
      {showDatePicker.endTime && (
        <DateTimePicker
          value={timeLapseValues?.endTime ?? new Date()}
          mode={"time"}
          onChange={
            (event: any, selectedDate: Date | undefined) => {
              setshowDatePicker({ ...showDatePicker, endTime: false });
              setTimeLapseValues({
                ...(timeLapseValues as TimeLapse),
                endTime: selectedDate as Date,
              });
              setformatedDate({
                ...formatedDate,
                endTime: convertTo12HourFormat((selectedDate as Date).toString()),
              });
            }
          }
        />
      )}
    </View>
  );
}
