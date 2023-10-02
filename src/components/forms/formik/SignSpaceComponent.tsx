import { FormikProps, useField } from "formik";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { Fields } from "../../../interfaces/form";
import { Image } from "react-native";

type key = { [key: string]: string };
interface Props {
  label: string;
  name: string;
  description: string;
  setScrollEnabled: any;
  formik: FormikProps<{ [key: string]: string | string[] | key }>;
  validaterequiredfields: (fields: Fields) => void;
  isRequired?: boolean;
}

export const SignSpaceComponent = ({
  label,
  description,
  setScrollEnabled,
  formik,
  validaterequiredfields,
  isRequired,
  name,
}: Props) => {
  const [field] = useField({ name: name });
  const [imageSrc, setImageSrc] = useState<string>("");


  //Set value input
  useEffect(() => {
    validaterequiredfields({
      name: name,
      value: formik.values[name] as string,
    });
  }, [formik.values[name]]);

  const signPad = useRef<any>();

  const handleOK = (signature: string) => {
    const imageData = signature.split(",")[1]; // Cambia el índice de 1 a 0

    if (imageData) {
      setImageSrc(imageData);
      formik.setFieldValue(name, imageData);
    } else {
      formik.validateField(name);
    }
  };

  const clearPad = () => {
    if (imageSrc) {
      setImageSrc("");
    } else {
      signPad.current.clearSignature();
    }
    formik.setFieldValue(name, "");
  };

  const handleConfirm = () => {
    signPad?.current?.readSignature();
    setScrollEnabled(true)
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        {isRequired && <Text style={{ color: "red" }}> * </Text>}
        <Text>{description}</Text>
      </View>

      {imageSrc ? (
        <View>
          <Image
            source={{ uri: `data:image/png;base64,${imageSrc}` }}
            style={styles.signatureImage}
          />
        </View>
      ) : (
        <SignatureScreen
          ref={signPad}
          onOK={handleOK}
          webStyle={style}
          onBegin={() => setScrollEnabled(false)}
          onEnd={() => setScrollEnabled(true)}
        />
      )}
      <View style={styles.row}>
        <Button title="Clear" onPress={clearPad} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-start",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  signatureImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
  },
});
