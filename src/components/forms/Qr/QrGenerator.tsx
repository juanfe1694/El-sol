import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { QrGeneratorStyles } from "./QrGeneratorStyles";
import { TimeLapseComponent } from "./TimeLapseComponent";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FormLink, FormLinksRequest } from "../../../interfaces/form/formLinkInterfaces";
import { blockFormLinkThunk, fetchLinkByFormInUseThunk, generateLinkThunk } from "../../../redux/thunks/forms/formsLinksThunk";
import { TimeLapse } from "../../../interfaces/planner/forms/qrGeneratorInterfaces";
import Toast from "react-native-toast-message";

export const QrGenerator = () => {
const { formInUse, linkByFormInUse, isManualFormLink } = useAppSelector((state) => state.formLink);
const [selectedOption, setselectedOption] = useState("OneUse");
const [message, setMessage] = useState(
"This QR will be disabled when someone complete the form"
);
const [timeLapseValues, setTimeLapseValues] = useState<TimeLapse | null>(null);
const [errorMessage, setErrorMessage] = useState("");
const [currentManualForm, setcurrentManualForm] = useState<FormLink>();

const dispatch = useAppDispatch();

/** Check if there are manual forms generated */
useEffect(() => {
  dispatch(fetchLinkByFormInUseThunk(formInUse.Id))
}, [formInUse])

useEffect(() => {
    if(linkByFormInUse.length > 0){
      const manualForm = linkByFormInUse?.find(x => x.LinkUseType === "Manual" && !x.IsBlocked);
      manualForm  
        ? setcurrentManualForm(manualForm)
        : setcurrentManualForm({} as FormLink)
    }
  }, [linkByFormInUse]);

  useEffect(() => {
    if(isManualFormLink){
      setcurrentManualForm({} as FormLink)
    }
  }, [isManualFormLink]);


useEffect(() => {
timeLapseValues && checkTimSpan();
}, [timeLapseValues]);

const customBtnStyles = (item: string) => {
if (selectedOption == item)
    return {
    labelStyle: { color: "white", fontSize: RFPercentage(1.9) },
    style: QrGeneratorStyles.pressedButton,
    };

return {
    labelStyle: { color: "#0d3c61", fontSize: RFPercentage(1.9) },
    style: QrGeneratorStyles.button,
};
};

const handleChange = (item: string) => {
setselectedOption(item);
setErrorMessage("");

switch (item) {
    case "OneUse":
    setMessage("This QR will be disabled when someone complete the form");
    break;
    case "Manual":
    setMessage("This QR will only be enabled/disabled when you indicate");
    break;
    case "TimeLapse":
    setTimeLapseValues(null);
    setMessage(
        "This QR will only be enabled according to the time you indicate"
    );
    break;

    default:
    break;
}
};

const generateQR = () => {
if (selectedOption == "TimeLapse") {
    const { startDate, startTime, endDate, endTime } =
    timeLapseValues as TimeLapse;
    const formLink: FormLinksRequest = {
    FormsInUseId: formInUse.Id,
    LinkUseType: selectedOption,
    UseEndTime: joinDateTime(endDate, endTime),
    UseStartTime: joinDateTime(startDate, startTime),
    };
    dispatch(generateLinkThunk(formLink));
} else {
    const formLink: FormLinksRequest = {
    FormsInUseId: formInUse.Id,
    LinkUseType: selectedOption,
    };
    dispatch(generateLinkThunk(formLink));
}
};

const joinDateTime = (date: Date, time: Date) => {
const combinedDateTime = new Date(
    date?.getFullYear(),
    date?.getMonth(),
    date?.getDate(),
    time?.getHours(),
    time?.getMinutes()
);
return combinedDateTime;
};

const enableSendButton = () => {
const currentDate = new Date();
if (
    selectedOption == "TimeLapse" &&
    (!timeLapseValues?.startDate ||
    !timeLapseValues?.startTime ||
    !timeLapseValues?.endDate ||
    !timeLapseValues?.endTime ||
    joinDateTime(timeLapseValues?.startDate, timeLapseValues?.startTime) <
        currentDate ||
    joinDateTime(timeLapseValues?.startDate, timeLapseValues?.startTime) >=
        joinDateTime(timeLapseValues?.endDate, timeLapseValues?.endTime))
) {
    return true;
} else {
    return false;
}
};

/*
* Verify timespan for timelapse link type
*/
const checkTimSpan = () => {
const { startDate, startTime, endDate, endTime } = timeLapseValues as TimeLapse;

if (joinDateTime(startDate, startTime) < new Date()) {
    setErrorMessage("The start date cannot be less than the current date");
} else if (
    joinDateTime(startDate, startTime) >= joinDateTime(endDate, endTime)
) {
    setErrorMessage(
    "The end date cannot be less or equal than the start date"
    );
} else {
    setErrorMessage("");
}
};

/** Block form link if it exists */
const onDisableForm = () => {
    currentManualForm?.Id && dispatch(blockFormLinkThunk(currentManualForm?.Id as string))
}

return (
<View style={QrGeneratorStyles.mainContainer}>
    <View style={QrGeneratorStyles.buttonContainer}>
    <Button
        {...customBtnStyles("OneUse")}
        onPress={() => handleChange("OneUse")}
    >
        One use
    </Button>
    <Button
        {...customBtnStyles("Manual")}
        onPress={() => handleChange("Manual")}
    >
        Manual
    </Button>
    <Button
        {...customBtnStyles("TimeLapse")}
        onPress={() => handleChange("TimeLapse")}
    >
        Time
    </Button>
    </View>
    <View style={QrGeneratorStyles.messageContainer}>
    <Text style={QrGeneratorStyles.message}>
        <Ionicons size={RFPercentage(2.3)} name="alert-circle-outline" />
        {message}
    </Text>
    </View>
    {selectedOption == "TimeLapse" && (
    <TimeLapseComponent
        setTimeLapseValues={setTimeLapseValues}
        timeLapseValues={timeLapseValues}
    />
    )}
    <Text style={QrGeneratorStyles.errorText}>{errorMessage}</Text>
    {selectedOption == "Manual" 
    ? 
        currentManualForm?.Id
         ? (
            <Button
                style={{...QrGeneratorStyles.generateBtn, backgroundColor: '#C70603'}}
                labelStyle={{ color: "white" }}
                onPress={() => onDisableForm()}
            >
                Stop
            </Button>
            )
         : (
            <Button
                style={QrGeneratorStyles.generateBtn}
                labelStyle={{ color: "white" }}
                onPress={() => generateQR()}
            >
                Start
            </Button>
            ) 
    : (
    <Button
        disabled={enableSendButton()}
        style={[
        QrGeneratorStyles.generateBtn,
        enableSendButton() && QrGeneratorStyles.disabled,
        ]}
        labelStyle={{ color: "white" }}
        onPress={() => generateQR()}
    >
        Generate
    </Button>
    )}
    <Toast />
</View>
);
};
