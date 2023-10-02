import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text } from "react-native";
import { FormikProps } from "formik";
import { Fields } from "../../../interfaces/form";
import * as DocumentPicker from "expo-document-picker";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FormRenderStyles } from "../../styles/FormRenderStyles";
import * as FileSystem from "expo-file-system";

type key = { [key: string]: string };
type map = { [key: string]: string };
interface Props {
  label: string;
  name: string;
  description?: string;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  validaterequiredfields: (fields: Fields) => void;
  setfileExtension: (file: map) => void;
  isRequired?: boolean;
}

export const FileUploadComponent = ({
  label,
  name,
  description,
  formik,
  validaterequiredfields,
  isRequired,
  setfileExtension,
}: Props) => {
  //Save data input
  useEffect(() => {
    validaterequiredfields({
      name: name,
      value: formik.values[name] as string,
    });
  }, [formik.values[name]]);

  const [selectedImage, setSelectedImage] = useState<string>();

  const openImagePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      const document = result.assets[0];
      const fileSizeInBytes = document.size !== undefined ? document.size : 1000;
      const maxSizeInBytes = 1024 * 1024;

      if(fileSizeInBytes <= maxSizeInBytes) {

        setSelectedImage(document?.uri);

        const fileType = document.uri.split(".").pop();

        setfileExtension({ [`${name}`]: fileType as string });

        const fileData64 = await FileSystem.readAsStringAsync(result?.assets[0]?.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formik.setFieldValue(name, fileData64);
      } else {
        alert("File size exceeded");
        setSelectedImage('')
      }
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        <Text style={FormRenderStyles.textStyle}>{label}</Text>
      </View>
      <Button title={description as string} onPress={openImagePicker} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{
            width: 315,
            height: 250,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#F0F0F0",
          }}
        />
      )}
    </View>
  );
};
