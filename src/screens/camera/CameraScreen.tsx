import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { FormikProps } from "formik";
import { useNavigation } from "@react-navigation/native";

type key = { [key: string]: string };
type FormikFormValue = FormikProps<{ [key: string]: string | string[] | key }>;

interface Props {
  name: string;
  onPhotoCapture: (photo: any) => void;
  setDisplayCamera: (state: boolean) => void;
  setphotopreview: (state: string) => void;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
}

export const CameraScreen: React.FC<Props> = ({
  name,
  onPhotoCapture,
  setDisplayCamera,
  setphotopreview,
  formik,
}) => {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    navigation.setOptions({ headerShown: false });
  }, [setDisplayCamera]);

  const handleReturn = () => {
    setphotopreview("");
    onPhotoCapture("");
    setDisplayCamera(false);
    navigation.setOptions({ headerShown: true });
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const compresedImg = await compressImage(photo.uri);
      const binary = compresedImg?.base64?.replace(
        /^data:image\/(png|png);base64,/,
        ""
      );
      setphotopreview(photo.uri);
      onPhotoCapture(binary);
      setDisplayCamera(false);
      formik.setFieldValue(name, binary);
      navigation.setOptions({ headerShown: true });
    }
  };

  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return manipResult;
  };

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={cameraRef} type={cameraType} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            top: 0,
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(2),
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            onPress={handleReturn}
            size={RFPercentage(4)}
            color="white"
          />
          <Ionicons
            name="camera-reverse-outline"
            onPress={toggleCameraType}
            size={RFPercentage(4)}
            color="white"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            bottom: 0,
            paddingVertical: RFPercentage(2),
            backgroundColor: "rgba(0,0,0, 0.5)",
          }}
        >
          <Ionicons
            name="aperture-outline"
            onPress={takePhoto}
            size={RFPercentage(4)}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    width: "100%"
  },
  camera: {
    flex: 1,
    backgroundColor: "blue",
    width: "100%",
    height: windowHeight - 140,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
