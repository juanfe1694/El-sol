import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Dimensions, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import {
  DynamicFormRender,
} from "../../interfaces/form/formLinkInterfaces";
import { useAppSelector } from "../../app/hooks";
import { StringSchema, AnyObject } from "yup";
import {
  Options,
  General,
  FormTemplate,
  QuestionPos,
  Fields,
  ItemsResponse,
  OptionSelectedGrid,
  OptionsObject,
  FieldConfigurator,
} from "../../interfaces/form";
import * as Yup from "yup";
import { Card, RadioButton } from "react-native-paper";
import { Formik, FormikProps } from "formik";
import { InputTextComponent } from "./formik/InputTextComponent";
import { useNavigation } from "@react-navigation/native";
import { InputTextAreaComponent } from "./formik/InputTextAreaComponent";
import { InputDateComponent } from "./formik/InputDateComponent";
import { InputTimeComponent } from "./formik/InputTimeComponent";
import { InputNumberComponent } from "./formik/InputNumberComponent";
import { DropDownComponent } from "./formik/DropDownComponent";
import { Ionicons } from "@expo/vector-icons";
import { SingleOptionComponent } from "./formik/SingleOptionComponent";
import { MultipleOptionComponent } from "./formik/MultipleOptionComponent";
import { MultipleOptionGridComponent } from "./formik/MultipleOptionGridComponent";
import { SingleOptionGridComponent } from "./formik/SingleOptionGridComponent";
import { SingleScaleComponent } from "./formik/SingleScaleComponent";
import { ValorationComponent } from "./formik/ValorationComponent";
import { PhotoCaptureComponent } from "./formik/PhotoCaptureComponent";
import { CameraScreen } from "../../screens/camera/CameraScreen";
import LoadingScreen from "../../screens/LoadingScreen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SignSpaceComponent } from "./formik/SignSpaceComponent";
import { FileUploadComponent } from "./formik/FileUploadComponent";
import { VoiceRecorderComponent } from "./formik/VoiceRecorderComponent";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { PublishDocumentRequest } from "../../interfaces/documents/publishDocumentsInterface";
import { useSyncFilledForms } from "../../hooks/conectivity/useSyncFilledForms";
import { SyncStates } from "../../interfaces/functionalInterfaces";

export const FormRender = ({ formInUse }: DynamicFormRender) => {
  
  const { authUserInfo } = useAppSelector((state) => state.auth);

  const { saveForm, isLoading: savingForm } = useSyncFilledForms();
  const navigation = useNavigation();

  const { FormTemplate, Name, FormOptions } = formInUse;
  const [language, setlanguage] = useState<string>("");
  const { General } = FormOptions as Options;
  const { Signature, AttachPhoto, AditionalLanguage } = General as General;
  const [showLangSelect, setshowLangSelect] = useState(AditionalLanguage);
  const [formName, setformName] = useState("");
  const [requiredMessage, setrequiredMessage] = useState("");
  const [otherOptionLabel, setotherOptionLabel] = useState("");
  const [otherOptionPlaceHolder, setotherOptionLabelPlaceHolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [fileExtension, setfileExtension] = useState<{ [key: string]: string }>({ "": "" });

  const updateFileExtension = (name: string, extension: string) => {
    setfileExtension((prevExtensions) => ({
      ...prevExtensions,
      [name]: extension,
    }));
  };

  type key = {
    [key: string]: string;
  };
  const initialValues: { [key: string]: string | string[] | key } = {};
  let initialGridValues: { [key: string]: string } = {};
  const validations: { [key: string]: any } = {};
  let gridValidations: { [key: string]: any } = {};
  const validationsPerPage: {
    [key: string]: StringSchema<
      string | undefined,
      AnyObject,
      string | undefined
    >;
  } = {};
  let gridValidationsPerPage: { [key: string]: any } = {};

  const formikRef =
    useRef<FormikProps<{ [key: string]: string | string[] | key }>>(null);

  const setFormikValues = (
    formValues: FormikProps<{ [key: string]: string | key | string[] }>
  ) => {
    setTimeout(() => {
      if (formikRef.current) {
        formikRef.current.setValues(formValues.values);
      }
    }, 10);
  };

  type options = {
    Text: string;
    DropDown: string;
    TextArea: string;
    Date: string;
    Hour: string;
    SingleScaleOption: string;
    Valoration: string;
    SignatureLabel: string;
    SignatureDescription: string;
    PhotoLabel: string;
    PhotoDescription: string;
    FileUploaderLabel: string;
    FileUploaderLabelDescription: string;
    VoiceLabel: string;
    VoiceDescription: string;
  };

  const placeHolders: { [x: string]: options } = {
    English: {
      Text: "Type your answer",
      DropDown: "Select an option",
      TextArea: "Type your answer",
      Date: "Select a date",
      Hour: "Select a time",
      SingleScaleOption: "Move the slider to the desired value",
      Valoration:
        "Select the number of stars according to your satisfaction level",
      SignatureLabel: "Signature",
      SignatureDescription: "Sign in the blank space below",
      PhotoLabel: "Photography",
      PhotoDescription:
        "Click on the camera icon below the image to capture this one.",
      FileUploaderLabel: "File Uploader",
      FileUploaderLabelDescription: "select a file",
      VoiceLabel: "Record an audio",
      VoiceDescription: "Press the button to record your voice",
    },

    Spanish: {
      Text: "Escriba su respuesta",
      DropDown: "Seleccione una opción",
      TextArea: "Escriba su respuesta",
      Date: "Seleccione una fecha",
      Hour: "Seleccione una hora",
      SingleScaleOption: "Mueve el deslizador hasta el valor deseado",
      Valoration:
        "Seleccione la cantidad de estrellas según su grado de satisfacción",
      SignatureLabel: "Firma",
      SignatureDescription: "Firme en el espacio en blanco debajo",
      PhotoLabel: "Fotografía",
      PhotoDescription:
        "Presione el icono de la cámara ubicado debajo de la imagen para capturarla.",
      FileUploaderLabel: "Cargador de archivos",
      FileUploaderLabelDescription: "Seleccione un archivo",
      VoiceLabel: "Graba un audio",
      VoiceDescription: "Presione el boton para grabar tu voz",
    },
  };

  const [formContent, setformContent] = useState<FormTemplate[]>(FormTemplate);
  const [contentPage, setContentPage] = useState<number>(0);
  const [contentFirst, setcontentFirst] = useState<FormTemplate[]>([]);
  const [pages, setpages] = useState<number>(0);
  const [prevPage, setprevPage] = useState<number>(0);
  const [nextPageEnabled, setnextPageEnabled] = useState<boolean>(false);
  const [validationSchemaPerPage, setvalidationSchemaPerPage] = useState(
    Yup.object({})
  );
  const [initialValuesPerPage, setinitialValuesPerPage] = useState<{
    [key: string]: string | string[] | key;
  }>({});
  const [showSendButton, setshowSendButton] = useState(false);
  const [picture, setPicture] = useState<string>();
  const [picturePreview, setpicturePreview] = useState("");
  const [hideControls, setHideControls] = useState(false);

  const prevReg = () => {
    if (contentPage > prevPage) {
      if (contentPage + 1 !== pages) {
        setContentPage(contentPage + 1);
      }
    } else if (contentPage < prevPage) {
      setContentPage(contentPage - 1);
    }
  };

  const paginador = () => {
    const pagina = formContent.filter((x) => x.Page == contentPage + 1);

    if (pagina?.length > 0) {
      setcontentFirst(pagina);

      let schema = Yup.string();
      let gridSchema: Yup.ArraySchema<
        string[] | undefined,
        AnyObject,
        undefined | "",
        ""
      > = Yup.array();

      const pageFields = formContent.filter(
        (x) =>
          x.Page == contentPage + 1 &&
          x.QuestionTemplate.Restrictions?.MandatoryAnswer
      );

      pageFields.map((input) => {
        if (input.QuestionTemplate.FieldType == "MultipleOptionGrid") {
          const rowName = input.QuestionTemplate.GridOptions?.find(
            (x) => x.Language == language
          )?.Rows;
          rowName?.map((r) => {
            initialGridValues[r] = "";
          });
          initialValues[input.QuestionId as string] = initialGridValues;

          if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
            gridValidations = {};
            gridValidationsPerPage = {};
            rowName?.map((r) => {
              gridSchema = gridSchema.of(
                Yup.string().required(`${requiredMessage}`)
              );
              gridValidations[r] = gridSchema;
            });
          }

          let gridObjectValidation = Yup.object({ ...gridValidations });
          gridValidationsPerPage[input.QuestionId as string] =
            gridObjectValidation;
        } else if (input.QuestionTemplate.FieldType == "SingleOptionGrid") {
          const rowName = input.QuestionTemplate.GridOptions?.find(
            (x) => x.Language == language
          )?.Rows;
          rowName?.map((r) => {
            initialGridValues[r] = "";
          });
          initialValues[input.QuestionId as string] = initialGridValues;

          if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
            gridValidations = {};
            gridValidationsPerPage = {};
            rowName?.map((r) => {
              schema = schema.required(`${requiredMessage}`);
              gridValidations[r] = schema;
            });
          }

          let gridObjectValidation = Yup.object({ ...gridValidations });
          gridValidationsPerPage[input.QuestionId as string] =
            gridObjectValidation;
        } else if (input.QuestionTemplate.FieldType == "MultipleOption") {
          gridSchema = gridSchema.of(
            Yup.string().required(`${requiredMessage}`)
          );
          gridValidationsPerPage[input.QuestionId as string] = gridSchema;
        } else if (
          input.QuestionTemplate.FieldType == "SingleOption" ||
          input.QuestionTemplate.FieldType == "DropDown"
        ) {
          if (input.QuestionTemplate?.Restrictions?.AddOptOther) {
            if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
              gridValidations = {};
              gridValidationsPerPage = {};
              schema = schema.required(`${requiredMessage}`);
              gridValidations["Value"] = schema;
              gridValidations["Other"] = schema;
              let gridObjectValidation = Yup.object({ ...gridValidations });
              gridValidationsPerPage[input.QuestionId as string] =
                gridObjectValidation;
            }
          } else {
            if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
              schema = schema.required(`${requiredMessage}`);
            }
            validationsPerPage[input.QuestionId as string] = schema;
          }
        } else {
          schema = schema.required("");
          validationsPerPage[input.QuestionId as string] = schema;
        }
      });

      const validationSchemaPerPage = Yup.object({
        ...validationsPerPage,
        ...gridValidationsPerPage,
      });
      setvalidationSchemaPerPage(validationSchemaPerPage);
    } else {
      prevReg();
    }
  };

  useEffect(() => {
    paginador();
  }, [contentPage, formContent]);

  useEffect(() => {
    setinitialValuesPerPage(initialValues);
    if (!AditionalLanguage) {
      setlanguage("English");
      confirm();
    }
    setLoading(false);
  }, [FormTemplate, Name]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => sendButton()
    });
  }, [showSendButton]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    setHideControls(true);
  };

  const handleKeyboardHide = () => {
    setHideControls(false);
  };

  const sendButton = () => (
    <Ionicons
      name="paper-plane-outline"
      onPress={() => formikRef?.current?.handleSubmit()}
      disabled={!showSendButton}
      size={RFPercentage(3)}
      style={{ color: !showSendButton ? "gray" : "black" }}
    />
  )

  formContent?.map((x) => {
    if (x.Page && x.Page > pages) {
      setpages(x.Page);
    }
  });

  const onContentPageChange = (event: number) => {
    setprevPage(contentPage);
    setContentPage(event);
  };

  
  /* The above code is using the useEffect hook in a React component. It is setting up a side effect
  that will be triggered whenever the values of `initialValuesPerPage` or `contentFirst` change. */
  useEffect(() => {
    validationSchemaPerPage
      .isValid(initialValuesPerPage)
      .then((res) => setnextPageEnabled(!res));
    validationSchema
      .isValid(initialValuesPerPage)
      .then((res) => { setshowSendButton(res) });
      
  }, [initialValuesPerPage, contentFirst]);

  const validateRequiredFields = (fieldProps: Fields) => {
    const currentValues = { ...initialValuesPerPage };
    currentValues[fieldProps.name] = fieldProps.value;
    setinitialValuesPerPage({ ...currentValues });
  };

  const shrinkFormTemplates = ({
    logicalPosition,
    questionId,
    questionArrayIndex,
  }: QuestionPos) => {
    let questionLogicalPosition = 0;
    const question = FormTemplate.find((x) => x.QuestionId == questionId);
    const questionOptions = question?.QuestionTemplate?.AnswerOptions
      ? question?.QuestionTemplate?.AnswerOptions[0]?.Options[
          questionArrayIndex
        ]
      : undefined;

    if (questionOptions)
      questionLogicalPosition = questionOptions.LogicalPosition ?? 0;

    const questionIndex = FormTemplate.indexOf(question as FormTemplate);

    const formBase = [...FormTemplate].splice(
      questionIndex + 1,
      FormTemplate?.length
    );

    const currentForm = [...formContent].splice(0, questionIndex + 1);

    const newFormContent = currentForm.concat(formBase);

    let numOfRegs = questionLogicalPosition - questionIndex;

    newFormContent.splice(questionIndex + 1, numOfRegs);

    setformContent(newFormContent);
  };

  /* Creating a validation schema for each question in the form. */
  for (const input of formContent) {
    let schema = Yup.string();
    let gridSchema: Yup.ArraySchema<
      string[] | undefined,
      AnyObject,
      undefined | "",
      ""
    > = Yup.array();

    if (input.QuestionTemplate.FieldType == "MultipleOptionGrid") {
      const rowName = input.QuestionTemplate.GridOptions?.find(
        (x) => x.Language == language
      )?.Rows;
      initialGridValues = {};

      rowName?.map((r) => {
        initialGridValues[r] = "";
      });

      initialValues[input.QuestionId as string] = initialGridValues;
      if (!input.QuestionTemplate?.Restrictions?.MandatoryAnswer) continue;

      if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
        gridValidations = {};
        rowName?.map((r) => {
          gridSchema = gridSchema.of(
            Yup.string().required(`${requiredMessage}`)
          );
          gridValidations[r] = gridSchema;
        });
      }

      let gridObjectValidation = Yup.object({ ...gridValidations });
      validations[input.QuestionId as string] = gridObjectValidation;
    } else if (input.QuestionTemplate.FieldType == "SingleOptionGrid") {
      const rowName = input.QuestionTemplate.GridOptions?.find(
        (x) => x.Language == language
      )?.Rows;
      initialGridValues = {};
      rowName?.map((r) => {
        initialGridValues[r] = "";
      });
      initialValues[input.QuestionId as string] = initialGridValues;
      if (!input.QuestionTemplate?.Restrictions?.MandatoryAnswer) continue;

      if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
        gridValidations = {};
        rowName?.map((r) => {
          schema = schema.required(`${requiredMessage}`);
          gridValidations[r] = schema;
        });
      }

      let gridObjectValidation = Yup.object({ ...gridValidations });
      validations[input.QuestionId as string] = gridObjectValidation;
    } else if (input.QuestionTemplate.FieldType == "MultipleOption") {
      initialValues[input.QuestionId as string] = "";
      if (!input.QuestionTemplate?.Restrictions?.MandatoryAnswer) continue;

      if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
        gridSchema = gridSchema.of(Yup.string().required(`${requiredMessage}`));
        validations[input.QuestionId as string] = gridSchema;
      }
    } else if (
      input.QuestionTemplate.FieldType == "SingleOption" ||
      input.QuestionTemplate.FieldType == "DropDown"
    ) {
      if (input.QuestionTemplate?.Restrictions?.AddOptOther) {
        initialGridValues = {};
        initialGridValues["Value"] = "";
        initialGridValues["Other"] = "";
        initialValues[input.QuestionId as string] = initialGridValues;

        if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
          gridValidations = {};
          schema = schema.required(`${requiredMessage}`);
          gridValidations["Value"] = schema;
          gridValidations["Other"] = schema;
          let gridObjectValidation = Yup.object({ ...gridValidations });
          validations[input.QuestionId as string] = gridObjectValidation;
        }
      } else {
        initialValues[input.QuestionId as string] = "";
        if (!input.QuestionTemplate?.Restrictions?.MandatoryAnswer) continue;

        if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
          schema = schema.required(`${requiredMessage}`);
        }
        validations[input.QuestionId as string] = schema;
      }
    } else {
      initialValues[input.QuestionId as string] = "";
      //if(!input.QuestionTemplate?.Restrictions?.MandatoryAnswer) continue;

      if (input.QuestionTemplate?.Restrictions?.MandatoryAnswer) {
        schema = schema.required(`${requiredMessage}`);
      }

      validations[input.QuestionId as string] = schema;
    }
  }

  /* Creating a validation schema using the Yup library. */
  const validationSchema = Yup.object({ ...validations });

  /**
   * When the user selects a language, the form name changes to the language selected, and the labels of
   * the form change to the language selected.
   */
  const confirm = (lang = language) => {
    setshowLangSelect(false);
    const formName = Name.find((x) => x.Language == lang)?.Text as string;

    setformName(formName);
    navigation.setOptions({ title: formName ?? '' });
    switch (language) {
      case "English":
        setrequiredMessage("Mandatory answer");
        setotherOptionLabel("Other");
        setotherOptionLabelPlaceHolder("Which one?");
        break;

      case "Spanish":
        setrequiredMessage("Pregunta obligatoria");
        setotherOptionLabel("Otro");
        setotherOptionLabelPlaceHolder("¿Cuál?");
        break;

      default:
        break;
    }
  };

  const resetPicture = () => {
    setPicture("");
    setpicturePreview("");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Toast />
      {
      loading || savingForm 
      ?<LoadingScreen />
      :showLangSelect ? (
        <View
          style={{ 
            flex: 1, 
            backgroundColor: "white", 
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center", 
          }}
        >
          <Card>
            <RadioButton.Group
              onValueChange={(newValue) => {setlanguage(newValue); confirm(newValue)}}
              value={language}
            >
              {Name.map((x) => {
                if (x.Language == "Spanish" && !AditionalLanguage) return;
                return (
                  <View
                    style={{
                      backgroundColor:'white',
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    key={x.Language}
                  >
                    <RadioButton.Item
                      label={x.Language as string}
                      value={x.Language as string}
                      color="#0d3c61"
                    />
                  </View>
                );
              })}
            </RadioButton.Group>
          </Card>
        </View>
      )
        :(
        <View
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            backgroundColor: "white",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
          >
            <View
              style={{
                width: Dimensions.get("window").width * 0.9,
                backgroundColor: "white",
                marginTop: 20,
                padding: 20,
              }}
            >
              <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount={false}
                onSubmit={async (values) => {
                  let ItemsResponses: ItemsResponse[] = [];

                  for (const input of formContent) {
                    let itemsResponse: ItemsResponse = {
                      IsReportable: input.IsReportable,
                      FieldType: input.QuestionTemplate.FieldType,
                      Label: input.QuestionTemplate?.Label.find(
                        (x) => x.Language == language
                      )?.Text as string,
                      QuestionId: input.QuestionId as string,
                      OptionSelected: [],
                      OptionSelectedGrid: [],
                    };

                    if(input.QuestionTemplate.FieldType == 'VoiceRecorder' && values[`${input.QuestionId}`] != ''){
                      const document : PublishDocumentRequest = {
                        name: `${input.QuestionId}`,
                        extension: fileExtension[input.QuestionId as string],
                        contentFile: values[`${input.QuestionId}`] as string
                      }
        
                      itemsResponse.DocumentProperties = document;
                      ItemsResponses.push(itemsResponse);
                      continue
                    }
                    if(input.QuestionTemplate.FieldType == 'FileUploader' && values[`${input.QuestionId}`] != ''){

                      const document : PublishDocumentRequest = {
                        name: `${input.QuestionId}`,
                        extension: fileExtension[input.QuestionId as string],
                        contentFile: values[`${input.QuestionId}`] as string
                      }
        
                      itemsResponse.DocumentProperties = document;
                      ItemsResponses.push(itemsResponse);
                      continue
                    }

                    if(input.QuestionTemplate.FieldType == 'SignSpace' && values[`${input.QuestionId}`] != ''){
              
                      const document : PublishDocumentRequest = {
                        name: `${input.QuestionId}`,
                        contentFile: values[`${input.QuestionId}`] as string
                      }
        
                      itemsResponse.DocumentProperties = document;
                      ItemsResponses.push(itemsResponse);
        
                      continue
                    }

                    if(input.QuestionTemplate.FieldType == 'PhotoSpace' && values[`${input.QuestionId}`] != ''){

                      const document : PublishDocumentRequest = {
                        name: `${input.QuestionId}`,
                        contentFile: values[`${input.QuestionId}`] as string
                      }
        
                      itemsResponse.DocumentProperties = document;
                      ItemsResponses.push(itemsResponse);
                      continue;
                    }

                    if (typeof values[`${input.QuestionId}`] == "object") {
                      /** Check if length >= 0 */
                      if (values[`${input.QuestionId}`]?.length) {
                        const itemValues = Object.values(
                          values[`${input.QuestionId}`]
                        );
                        itemValues.forEach((item) => {
                          itemsResponse.OptionSelected?.push(item);
                        });

                        ItemsResponses.push(itemsResponse);
                      } else if (
                        values[`${input.QuestionId}`]?.length == undefined
                      ) {
                        if (input.QuestionTemplate.FieldType == "Date") {
                          const fullDate = new Date(
                            values[`${input.QuestionId}`] as string
                          );

                          const refactDate =
                            fullDate.getUTCMonth() +
                            1 +
                            "/" +
                            fullDate.getUTCDate() +
                            "/" +
                            fullDate.getFullYear();
                          itemsResponse.OptionSelected?.push(refactDate);
                        }

                        if (input.QuestionTemplate.FieldType == "Hour") {
                          const time = new Date(
                            values[`${input.QuestionId}`] as string
                          );
                          const hour =
                            time.getHours() + ":" + time.getMinutes();
                          itemsResponse.OptionSelected?.push(hour);
                        }
                        if (
                          input.QuestionTemplate.FieldType == "SingleOption" ||
                          input.QuestionTemplate.FieldType == "DropDown"
                        ) {
                          const otherValues = Object.values(
                            values[`${input.QuestionId}`]
                          );

                          if (otherValues[0] == "Other") {
                            itemsResponse.OptionSelected?.push(otherValues[1]);
                          } else {
                            itemsResponse.OptionSelected?.push(otherValues[0]);
                          }
                        } else {
                          const rows = Object.getOwnPropertyNames(
                            values[`${input.QuestionId}`]
                          );
                          const rowsValues = Object.values(
                            values[`${input.QuestionId}`]
                          );

                          rows.forEach((x: string, index: number) => {
                            let optionSelected: OptionSelectedGrid = {
                              Row: [x],
                              Column:
                                typeof rowsValues[index] == "string"
                                  ? [rowsValues[index]]
                                  : rowsValues[index]?.length > 0
                                  ? rowsValues[index]
                                  : undefined,
                            };

                            itemsResponse.OptionSelectedGrid?.push(
                              optionSelected
                            );
                          });
                        }
                        ItemsResponses.push(itemsResponse);
                      }
                    } else {
                      itemsResponse.OptionSelected?.push(
                        values[`${input.QuestionId}`] as string
                      );
                      ItemsResponses.push(itemsResponse);
                    }
                  }
                  saveForm({
                    formState: SyncStates.Pending,
                    formName: formName,
                    counter: 0,
                    form: ItemsResponses, 
                    formsInUseId: formInUse.Id, 
                    filledBy: authUserInfo.id,
                    filledAt: new Date().getTime()
                   }).then(() => {
                    navigation.navigate('FormsToSaveScreen')
                   })
                }}
              >
                {(formik) => (
                  <View>
                    {contentFirst.map(({ QuestionTemplate, QuestionId }) => {
                      switch (QuestionTemplate?.FieldType) {
                        case "Text":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <InputTextComponent
                                name={QuestionId as string}
                                formik={formik}
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                placeholder={
                                  placeHolders[`${language}`]["Text"]
                                }
                              />
                            </View>
                          );
                        case "TextArea":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <InputTextAreaComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                placeholder={
                                  placeHolders[`${language}`]["TextArea"]
                                }
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );
                        case "Date":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <InputDateComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                placeholder={
                                  placeHolders[`${language}`]["Date"]
                                }
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );
                        case "Hour":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <InputTimeComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                placeholder={
                                  placeHolders[`${language}`]["Hour"]
                                }
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );

                        case "Number":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <InputNumberComponent
                                key={QuestionId}
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );
                        case "DropDown":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <DropDownComponent
                                key={QuestionId}
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  placeHolders[`${language}`]["DropDown"]
                                }
                                options={
                                  QuestionTemplate.AnswerOptions?.find(
                                    (x) => x.Language == language
                                  )?.Options as OptionsObject[]
                                }
                                shrinkFormTemplates={shrinkFormTemplates}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                other={
                                  QuestionTemplate.Restrictions?.AddOptOther
                                }
                                otheroptionlabel={otherOptionLabel}
                                otheroptionlabelplaceholder={
                                  otherOptionPlaceHolder
                                }
                                formik={formik}
                              />
                            </View>
                          );

                        case "SingleOption":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <SingleOptionComponent
                                key={QuestionId}
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  QuestionTemplate.Description.find(
                                    (x) => x.Language == language
                                  )?.Text
                                }
                                options={
                                  QuestionTemplate.AnswerOptions?.find(
                                    (x) => x.Language == language
                                  )?.Options as OptionsObject[]
                                }
                                shrinkFormTemplates={shrinkFormTemplates}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                other={
                                  QuestionTemplate.Restrictions?.AddOptOther
                                }
                                otheroptionlabel={otherOptionLabel}
                                otheroptionlabelplaceholder={
                                  otherOptionPlaceHolder
                                }
                                formik={formik}
                              />
                            </View>
                          );
                        case "MultipleOption":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <MultipleOptionComponent
                                key={QuestionId}
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  QuestionTemplate.Description.find(
                                    (x) => x.Language == language
                                  )?.Text
                                }
                                options={
                                  QuestionTemplate.AnswerOptions?.find(
                                    (x) => x.Language == language
                                  )?.Options
                                }
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );

                        case "MultipleOptionGrid":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <MultipleOptionGridComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  QuestionTemplate.Description.find(
                                    (x) => x.Language == language
                                  )?.Text
                                }
                                options={QuestionTemplate.GridOptions?.find(
                                  (x) => x.Language == language
                                )}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                                validations={validationSchema}
                              />
                            </View>
                          );

                        case "SingleOptionGrid":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <SingleOptionGridComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  QuestionTemplate.Description.find(
                                    (x) => x.Language == language
                                  )?.Text
                                }
                                options={QuestionTemplate.GridOptions?.find(
                                  (x) => x.Language == language
                                )}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                formik={formik}
                              />
                            </View>
                          );

                        case "Range":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <SingleScaleComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  placeHolders[`${language}`][
                                    "SingleScaleOption"
                                  ]
                                }
                                fieldConfiguration={
                                  QuestionTemplate.FieldConfigurator as FieldConfigurator
                                }
                                type={"range"}
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                              />
                            </View>
                          );

                        case "Valoration":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <ValorationComponent
                                label={
                                  QuestionTemplate?.Label.find(
                                    (x) => x.Language == language
                                  )?.Text as string
                                }
                                name={QuestionId as string}
                                description={
                                  placeHolders[`${language}`]["Valoration"]
                                }
                                fieldConfiguration={
                                  QuestionTemplate.FieldConfigurator
                                }
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                              />
                            </View>
                          );

                        case "PhotoSpace":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <PhotoCaptureComponent
                              name={QuestionId as string}
                                label={
                                  placeHolders[`${language}`]["PhotoLabel"]
                                }
                                description={
                                  placeHolders[`${language}`][
                                    "PhotoDescription"
                                  ]
                                }
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                resetpicture={resetPicture}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                              />
                            </View>
                          );

                        case "SignSpace":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <SignSpaceComponent
                                name={QuestionId as string}
                                label={
                                  placeHolders[`${language}`]["SignatureLabel"]
                                }
                                description={
                                  placeHolders[`${language}`][
                                    "SignatureDescription"
                                  ]
                                }
                                setScrollEnabled={setScrollEnabled}
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                              />
                            </View>
                          );

                        case "FileUploader":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <FileUploadComponent
                                name={QuestionId as string}
                                label={
                                  placeHolders[`${language}`][
                                    "FileUploaderLabel"
                                  ]
                                }
                                description={
                                  placeHolders[`${language}`][
                                    "FileUploaderLabelDescription"
                                  ]
                                }
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                setfileExtension={setfileExtension}
                              />
                            </View>
                          );

                        case "VoiceRecorder":
                          return (
                            <View key={QuestionId} style={{ marginTop: 20 }}>
                              <VoiceRecorderComponent
                                name={QuestionId as string}
                                label={
                                  placeHolders[`${language}`]["VoiceLabel"]
                                }
                                description={
                                  placeHolders[`${language}`][
                                    "SignatureDescription"
                                  ]
                                }
                                setScrollEnabled={setScrollEnabled}
                                formik={formik}
                                validaterequiredfields={validateRequiredFields}
                                isRequired={
                                  QuestionTemplate.Restrictions?.MandatoryAnswer
                                }
                                setfileExtension={updateFileExtension}
                              />
                            </View>
                          );

                        default:
                          return null;
                      }
                    })}
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
          <KeyboardAvoidingView
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"} 
          >
              {
                !hideControls &&
                  <View style={{ flexDirection: "row" }}>
                      <Ionicons
                          name="chevron-back-outline"
                          size={20}
                          style={{ margin: 20 }}
                          disabled={contentPage === 0}
                          color={contentPage === 0 ? "gray" : "black"}
                          onPress={() => onContentPageChange(contentPage - 1)}
                      />
                      <Ionicons
                          name="chevron-forward-outline"
                          size={20}
                          style={{ margin: 20 }}
                          disabled={
                            contentPage + 1 === pages || nextPageEnabled
                          }
                          color={
                            contentPage + 1 === pages || nextPageEnabled
                                ? "gray"
                                : "black"
                            }
                          onPress={() => onContentPageChange(contentPage + 1)}
                      />
                  </View>
              }
          </KeyboardAvoidingView>
      </View>
      )}
      <Toast />
    </View>
  );
};
