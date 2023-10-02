import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BlankPageScreen } from "../../../screens/blank page/BlankPageScreen";
import { Button, Card } from "react-native-paper";
import { OverlayProps } from "../../../interfaces/overlay/overlayInterfaces";
import { NavigationHelpers, NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../app/hooks";
import { SyncCardComponent } from "../../../utilities/SyncCardComponent";
import { RootStackParamList, RootTabParamList } from "../../../../types";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";

interface FilledFormProps {
  setoverlayVisible: (state: boolean) => void;
  setoverlayProps: (state: OverlayProps[]) => void;
}

export const FormsToSaveList = ({
  setoverlayVisible,
  setoverlayProps,
}: FilledFormProps) => {

  const { filledForms } = useAppSelector(state => state.connection);

  const navigation = useNavigation<NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>>();

  const dateFormater = (date: Date) => {
    const currentDate = new Date(date);
    const formatedDate = currentDate.toDateString();

    return formatedDate;
  };

  const goToFormsButton = () => (
    <Button 
      labelStyle={{color: '#0d3c61'}} 
      onPress={() => navigation.navigate('FormsInUseScreen')}
    >
      <Text>Return to forms</Text>
    </Button>
  )

  return (
    <View style={filledFormsStyles.mainContainer}>
      {filledForms.length > 0 ? (
        <ScrollView>
          {filledForms.map((form, index) => (
              <SyncCardComponent
                showMenu={false}
                key={index}
                title={form.formName}
                state={form.formState}
                date={dateFormater( new Date(form.filledAt) )}
              />
          ))}
        </ScrollView>
      ) : (
        <BlankPageScreen component={goToFormsButton()} />
      )}
    </View>
  );
};

const filledFormsStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RFPercentage(2),
  },
  title: {
    fontSize: RFPercentage(2.3),
  },
  card: {
    marginVertical: RFPercentage(1),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 8,
    height: RFPercentage(12)
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
  creationDate: {
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(2),
    width: "60%",
  }
});
