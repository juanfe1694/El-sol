import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { Fields } from "../../../interfaces/form/formInUseInterfaces";
import { Camera } from "expo-camera";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { CameraScreen } from "../../../screens/camera/CameraScreen";

type key = { [key: string]: string };
interface Props {
  name: string;
  label: string;
  description: string;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  resetpicture: () => void;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
}

export const PhotoCaptureComponent = ({
  name,
  label,
  description,
  formik,
  resetpicture,
  validaterequiredfields,
  isRequired,
}: Props) => {
  const [displayCamera, setDisplayCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [picture, setPicture] = useState<string>();
  const [photopreview, setpicturePreview] = useState("");

  useEffect(() => {
    validaterequiredfields({
      name: "picture",
      value: formik.values[name] as string,
    });
  }, [formik.values[name]]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [setHasCameraPermission]);

  return (
    <View>
      {displayCamera && hasCameraPermission != null ? (
        <CameraScreen
          name={name}
          onPhotoCapture={setPicture}
          setphotopreview={setpicturePreview}
          setDisplayCamera={setDisplayCamera}
          formik={formik}
        />
      ) : (
        <>
          <Text>
            {isRequired && <Text style={{ color: "red" }}> * </Text>}
            {description}
          </Text>
          {photopreview == "" ? (
            <View style={{ marginTop: 20 }}>
              <Button
                labelStyle={{ color: "black" }}
                icon="camera"
                mode="elevated"
                onPress={() => {
                  setDisplayCamera(true)
                }}
              >
                {label}
              </Button>
            </View>
          ) : (
            <View>
              <Image
                style={{
                  aspectRatio: 8 / 7,
                  width: "100%",
                  marginTop: 20,
                  alignSelf: "center",
                }}
                source={{ uri: photopreview }}
              />
              <Button
                labelStyle={{ color: "black" }}
                icon="close"
                mode="elevated"
                onPress={() => setpicturePreview('')}
                children={""}
              ></Button>
            </View>
          )}
        </>
      )}
    </View>
  );
};
