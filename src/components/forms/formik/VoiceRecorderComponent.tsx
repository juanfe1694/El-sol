import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { FormikProps } from "formik";
import { Fields } from "../../../interfaces/form";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Label } from "../../../interfaces/form/formInterfaces";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as FileSystem from "expo-file-system";

type key = { [key: string]: string };
interface Props {
  label: string;
  description: string;
  name: string;
  setScrollEnabled: any;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  validaterequiredfields: (fields: Fields) => void;
  setfileExtension: (name: string, extension: string) => void;
  isRequired?: boolean;
}

export const VoiceRecorderComponent = ({
  label,
  description,
  setScrollEnabled,
  formik,
  validaterequiredfields,
  isRequired,
  setfileExtension,
  name,
}: Props) => {
  const [recording, setRecording] = useState<any>();
  const [recordings, setRecordings] = useState<any>([]);
  const [base64Image, setBase64Image] = useState<any>("");

  const [isPlaying, setIsPlaying] = useState(false);

  //TODO: DEBO ENVIAR EL ARCHIVO Y PASARLO A FORMAT 64
  /* The code is creating an array called `filesArray` by mapping over the `recordings` array and
  extracting the `file` property from each object in the array. This is done using the `map`
  function. */
  const filesArray = recordings.map(
    (recording: { file: any }) => recording.file
  );

  const filePath = filesArray[0];

  /* The `useEffect` hook is triggered whenever the `formik.values[name]` state variable changes and validate if question was answered. */
  //Save data input
  useEffect(() => {
    validaterequiredfields({
      name: name,
      value: formik.values[name] as string,
    });
  }, [formik.values[name]]);

  const startRecording = async () => {
    try {
      setRecordings([]);
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  /**
   * The function `convertFileToBase64` takes a file path as input, checks if the file exists, converts
   * the file to Base64 encoding, logs the converted data, sets a form field value, sets a file
   * extension, and returns the Base64 data.
   * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
   * file that you want to convert to Base64. It should be the absolute path to the file on the
   * device's file system.
   * @returns The function `convertFileToBase64` returns the base64 representation of the file data.
   */
  const convertFileToBase64 = async (filePath: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (!fileInfo.exists) {
        return;
      }

      const fileData64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      formik.setFieldValue(name, fileData64);
      setfileExtension(`${name}`, "wav");

      return fileData64;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    if (filePath !== undefined) {
      convertFileToBase64(filePath);
    }
  }, [filePath]);

 /**
  * The `stopRecording` function stops the recording, unloads it, creates a loaded sound, and adds it
  * to the list of recordings.
  */
  const stopRecording = async () => {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(allRecordings);
  };

  const getDurationFormatted = (milliseconds: any) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };

  /**
   * The function `playAudio` plays a recording line's sound and sets an event listener to monitor the
   * playback status.
   * @param {any} recordingLine - The `recordingLine` parameter is an object that represents a
   * recording line. It likely contains properties such as `sound`, which is an audio file or sound
   * object that can be played.
   */
  const playAudio = (recordingLine: any) => {
    recordingLine.sound
      .replayAsync()
      .then((status: any) => {
        // Here, you set an event listener to monitor playback status updates.
        recordingLine.sound.setOnPlaybackStatusUpdate((playbackStatus: any) => {
          if (playbackStatus.didJustFinish) {
            setIsPlaying(false); // Set isPlaying to false when audio finishes playing
          }
        });
      })
      .catch((error: any) => {
        console.error("Error playing audio:", error);
      });

    setIsPlaying(true);
  };

  const pauseAudio = async (recordingLine: any) => {
    if (isPlaying) {
      await recordingLine.sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  /**
   * The function `getRecordingLines` returns an array of JSX elements representing a list of
   * recordings, with each element displaying the recording index, duration, and a play/pause button.
   * @returns The `getRecordingLines` function is returning an array of JSX elements. Each element
   * represents a recording line and includes a `View` component with a `key` prop, a `Text` component
   * displaying the recording number and duration, and a `TouchableOpacity` component with an `onPress`
   * event handler. Inside the `TouchableOpacity`, there is an `Ionicons` component that displays
   * either a "
   */
  const getRecordingLines = () => {
    return recordings.map((recordingLine: any, index: any) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine?.duration}
          </Text>

          <TouchableOpacity
            onPress={() => {
              isPlaying ? pauseAudio(recordingLine) : playAudio(recordingLine);
            }}
            aria-label="Play"
          >
            <Ionicons
              name={isPlaying ? "pause-outline" : "play-outline"}
              size={RFPercentage(3.5)}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  const clearRecordings = () => {
    setRecordings([]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        <Text>{!recording ? `${label}` : "Stop Recording"}</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{ flexDirection: "row" }}
          aria-label={recording ? "Stop Recording" : "Start Recording"}
        >
          <Ionicons
            name={!recording ? "mic-outline" : "mic-circle-outline"}
            size={RFPercentage(3.5)}
          />
        </TouchableOpacity>

        {getRecordingLines()}

        {recordings.length > 0 && (
          <TouchableOpacity
            aria-label={recordings.length > 0 ? "\n\n\nClear Recordings" : ""}
            onPress={clearRecordings}
          >
            <Ionicons name={"close-outline"} size={RFPercentage(3.5)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 40,
  },
  fill: {
    flex: 1,
    margin: 15,
  },
});
