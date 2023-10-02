import React, { useEffect, useState } from 'react'
import { QrGenerator } from '../../../components/forms/Qr/QrGenerator'
import { QrComponent } from '../../../components/forms/Qr/QrComponent'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Config from 'react-native-config'
import LoadingScreen from '../../LoadingScreen'
import { FormLink } from '../../../interfaces/form/formLinkInterfaces'
import { resetSelectUserForm } from '../../../redux/slices/planner/caseFamilyGroup/caseFamilyGroupSlice'
import ToastComponent from '../../../utilities/ToastComponent'
import { View } from 'react-native'

export const QrGeneratorScreen = () => {

  const webApp = Config.APP_WEB_URL ?? 'https://elsonnecerpdev.azurewebsites.net'; 

  const { generateForm: generatedForm, isLoading, error } = useAppSelector(state => state.formLink)
  const { selectUserForm, isFromAssignCaseFilledForm } = useAppSelector(
    (state) => state.caseFamilyGroup
  );

  const caseFamilyIds = selectUserForm?.map(
    (casefamilyId: { id: any }) => casefamilyId.id
  );
 
  const [formLink, setformLink] = useState("Url to form");
  const [currentForm, setCurrentForm] = useState({} as FormLink)
  const [localLoading, setlocalLoading] = useState(true)

  const dispatch = useAppDispatch();

useEffect(() => {
    if (generatedForm?.FormsInUseId) {
      const formLink = isFromAssignCaseFilledForm
      ? `${webApp}/forms/formLink?Id=${generatedForm?.Id}&caseFamilyGroupsId=${caseFamilyIds}`
      : `${webApp}/forms/formLink?Id=${generatedForm?.Id}`;

    setformLink(formLink);
    setCurrentForm(generatedForm);
    if (isFromAssignCaseFilledForm) {
      dispatch(resetSelectUserForm());
    }
  }
  
  }, [generatedForm]);

  useEffect(() => {
    setlocalLoading(isLoading);
  }, [isLoading])
  

  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
  <ToastComponent
            type={"error"}
            text1={"QR generation error"}
            text2={"The QR code was not generated correctly"}
            error={error}/>
    {
      localLoading
        ? <LoadingScreen />
        : currentForm.Id
          ? <QrComponent url={formLink} formLinkId={currentForm.Id} />
          : <QrGenerator />
    }
  </View>
  )
}
