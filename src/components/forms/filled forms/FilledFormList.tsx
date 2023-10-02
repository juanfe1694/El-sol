import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useAppSelector } from "../../../app/hooks";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { Card } from "react-native-paper";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { useNavigation } from "@react-navigation/native";
import { SyncCardComponent } from "../../../utilities/SyncCardComponent";
import { SyncStates } from "../../../interfaces/functionalInterfaces";

interface FilledFormProps {
  setoverlayVisible: (state: boolean) => void;
  setoverlayProps: (state: OverlayProps[]) => void;
}

export const FilledFormList = ({
  setoverlayVisible,
  setoverlayProps,
}: FilledFormProps) => {
  const { forms } = useAppSelector((state) => state.filledForms);
  
  const navigation = useNavigation();

  const dateFormater = (date: Date) => {
    const currentDate = new Date(date);
    const formatedDate = currentDate.toDateString();

    return formatedDate;
  };

  const viewFilledForms = (filledFormId: string) => {
    navigation.navigate("FilledFormDetailScreen", {
      formId: filledFormId,
    });
  };

  return (
    <View style={formInUseStyles.mainContainer}>
      {forms.Data ? (
        <ScrollView>
          {forms.Data.map((form) => (
            <TouchableOpacity 
              key={form?.Id}
              activeOpacity={0.8} 
              onPress={() => viewFilledForms(form?.Id as string)}
            >
              <SyncCardComponent    
                showMenu={false}
                title={ "Filled at" }
                state={ SyncStates.Synchronized }
                date={ dateFormater(form.FilledAt as Date) }
              /> 
            </TouchableOpacity>
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
  },
  title: {
    fontSize: RFPercentage(2.3),
  },
  card: {
    marginVertical: RFPercentage(2.5),
    backgroundColor: "white",
    padding: RFPercentage(2.5),
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: RFPercentage(2.5),
    marginLeft: RFPercentage(2.5),
  },
});
