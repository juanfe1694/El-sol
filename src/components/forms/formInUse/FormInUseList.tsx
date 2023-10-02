import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchFormsRelatedThunk } from "../../../redux/thunks/planner/forms/formsRelatedThunks";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { IconButton } from "react-native-paper";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../../screens/LoadingScreen";
import { fetchFilledFormsThunk } from "../../../redux/thunks/forms/filledFormThunk";
import { Form, GetFilledFormsRequest } from "../../../interfaces/form";
import { fetchFormInUseById } from "../../../redux/slices/forms/filledFormSlice";
import {
  fetchFormInUse,
  resetFormInUse,
} from "../../../redux/slices/forms/formsLinksSlice";

interface FormInUseProps {
  taskId: number;
  setoverlayVisible: (state: boolean) => void;
  setoverlayProps: (state: OverlayProps[]) => void;
}

export const FormInUseList = ({
  taskId,
  setoverlayVisible,
  setoverlayProps,
}: FormInUseProps) => {
  const { formsToTask, loadingFormRelate } = useAppSelector(
    (state) => state.formRelated
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchFormsRelatedThunk(taskId));
  }, [taskId]);

  const fillForm = (formId: string) => {
    dispatch(resetFormInUse());
    navigation.navigate("FormRendererScreen", {
      formInUseId: formId,
    });
  };

  const viewFilledForms = (formInUse: Form) => {
    const getFilledFormsQueryParameters: GetFilledFormsRequest = {
      FormsInUseId: formInUse.Id as string,
    };

    dispatch(fetchFilledFormsThunk(getFilledFormsQueryParameters));
    dispatch(fetchFormInUseById(formInUse));

    navigation.navigate("FilledFormScreen", {
      formName: formInUse?.Name[0]?.Text as string
    });
  };

  const generateQr = (formInUse: Form) => {
    dispatch(fetchFormInUse(formInUse));
    navigation.navigate("QrGeneratorScreen");
  };

  const displayOverlay = (formInUse: Form, countfilledForms: number) => {
    setoverlayVisible(true);
    const overlayOptions: OverlayProps[] = [
      {
        option: "Generate QR",
        action: () => generateQr(formInUse),
      },
    ];

    countfilledForms > 0 &&
      overlayOptions.push({
        option: "View filled forms",
        action: () => viewFilledForms(formInUse),
      });

    setoverlayProps(overlayOptions);
  };

  

  return (
    <View style={formInUseStyles.mainContainer}>
      <Text style={formInUseStyles.title}>Forms related</Text>
      {loadingFormRelate ? (
        <LoadingScreen />
      ) : formsToTask.length > 0 ? (
        <ScrollView>
          {formsToTask.map((form) => (
            <View key={form?.FormsInUse.Id} style={formInUseStyles.card}>
              <View style={formInUseStyles.cardContainer}>
                <View style={{width: '90%'}}>
                  <Text style={formInUseStyles.cardText}>{form.title}</Text>
                </View>
                <IconButton
                  icon="dots-vertical"
                  size={RFPercentage(3)}
                  onPress={() =>
                    displayOverlay(form.FormsInUse, form.CountfilledForms)
                  }
                  style={{ borderRadius: RFPercentage(1), marginHorizontal: 1 }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <BlankPageScreen />
      )}
    </View>
  );
};

const formInUseStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RFPercentage(2),
    marginTop: RFPercentage(20),
  },
  title: {
    fontSize: RFPercentage(2.3),
  },
  card: {
    marginVertical: RFPercentage(1),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 8
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: RFPercentage(2.2),
    marginLeft: RFPercentage(2.5),
  },
});
