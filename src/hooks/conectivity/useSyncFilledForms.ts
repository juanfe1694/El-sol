import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useEncryptDecryptData } from '../auth/useEncryptDecryptData';
import { FilledForm, FormSyncState, ItemsResponse, LocalForm } from '../../interfaces/form';
import { usePublishDocument } from '../form/usePublishDocument';
import { saveFilledFormThunk } from '../../redux/thunks/forms/filledFormThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { SyncStates } from '../../interfaces/functionalInterfaces';
import { setFilledForms } from '../../redux/slices/connection/connectionSlice';


export const useSyncFilledForms = () => {
    const { filledForms } = useAppSelector(state => state.connection);
    const [isLoading, setisLoading] = useState(false);
    const [savedForms, setSavedForms] = useState<LocalForm[]>([]);
    const [syncState, setsyncState] = useState<FormSyncState[]>([]);
    const [saveForms, setsaveForms] = useState(false);

    const { encryptData, decryptData } = useEncryptDecryptData();
    const { publishDocuments } = usePublishDocument();
    const dispatch = useAppDispatch();

    useEffect(() => {
      saveForms && persistentSave();
    }, [saveForms])
    
    const saveForm = async (form: LocalForm) => {
        try{
            setisLoading(true);
            /** Encrypt form */
            const encryptedForm = await encryptData([form]);
            /** Get current forms */
            const currentForms = await AsyncStorage.getItem('filledForms')
      
            if(currentForms){
                /** Decrypt current forms */
                const decryptedForms = await decryptData(currentForms);
                /** Add new encrypted form to array */
                decryptedForms.push(form)
                /** Encrypt new forms */
                const encryptedForms = await encryptData(decryptedForms);
                /** Set forms into async storage */
                await AsyncStorage.setItem('filledForms', encryptedForms);
                await getSavedForms()
          }else{
            /** Set form into async storage */
            await AsyncStorage.setItem('filledForms', encryptedForm);
          }
                 
        }catch(error: any){ ; }
        finally {setisLoading(false); }
      }
  
      const getSavedForms = async () => {
        try{ 
            setisLoading(true);
            const forms = await AsyncStorage.getItem('filledForms');
            if(forms){
              const formsDecrypted = await decryptData(forms as string)
              dispatch(setFilledForms(formsDecrypted)); 
              return formsDecrypted;
          }else{
            const emptyForms: LocalForm[] = [];
            return emptyForms;
          }
        }catch(error: any){}
        finally{setisLoading(false);}
      }

      const syncFilledForms = async () => {
   
        try{
            /** Get ip address */
            const ipAddress = (await axios.get("https://api.ipify.org?format=json")).data.ip ?? '0.0.0.0';
            /** Get saved forms */
            let localForms = await getSavedForms();
            const maxAttempts = 15;
            /** Loop through the forms array */
            for (const x of localForms)  {
              let questionOrder = 1;
                /** Update sync state to synchronizing */
                await updateSyncState(localForms, x.formsInUseId, SyncStates.Synchronizing);
                /** If counter equals to 15, jump to next iteration */
                if(x.counter == maxAttempts) {
                  /** Remove form from array */
                  const newForms = filterArray(localForms, x.formsInUseId);
                  localForms = newForms;
                   dispatch(setFilledForms(newForms));
                  continue;
                }
                
                const itemResponses : ItemsResponse[] = [];
                /** Loop through the item responses array */
                for(let z of x.form ) {
                  
                  let form : ItemsResponse = { ...z, QuestionOrder: questionOrder }
                  let localMaxAttempts = maxAttempts;
                    /** If there is document to upload */
                    if(z.DocumentProperties){
                        /** Persist document upload */
                        while(localMaxAttempts > 0){
                          /** Upload the file */
                          try {
                            const document = await publishDocuments({
                              name: z.DocumentProperties.name,
                              contentFile: z.DocumentProperties.contentFile
                            })
                            form.DocumentUploaded = { DocumentId: document?.id as number }
                            form.DocumentProperties = undefined
                            localMaxAttempts = 0;
                          } catch (error) {
                            if(localMaxAttempts == 1)  form = {} as ItemsResponse
                              /** Set form undefined */
                              localMaxAttempts --;
                          }                    
                        }
                    }

                    if(form.QuestionId){
                      itemResponses.push(form);
                      questionOrder ++;
                    }
                }

                /** Save response */
                const formValues : FilledForm = {
                    FormsInUseId: x.formsInUseId,
                    ItemsResponses: itemResponses,
                    OriginIP: ipAddress,
                    FilledAt: x.filledAt,
                    FilledBy: x.filledBy,
                    ImgStorageURL: '',
                    SignatureStorageURL: ''  
                }
                const newForms = await saveResponses(localForms, formValues);
                localForms = newForms ?? [];
                dispatch(setFilledForms(newForms));
            }

            const encryptedForms = await encryptData(localForms);
            await AsyncStorage.setItem('filledForms', encryptedForms);

            /** If there are forms to update, restart */
            localForms.length > 0 && syncFilledForms();
            
        }catch(error){
          setsaveForms(true);
        }
      }

      const persistentSave = async () => {
        try {
          const encryptedForms = await encryptData(filledForms);
            await AsyncStorage.setItem('filledForms', encryptedForms);
        } catch (error) {
          ;
        }finally{ setsaveForms(false) }
      }

      const saveResponses = async (localForms: LocalForm[], formValues : FilledForm) => {
        try {
           await dispatch(saveFilledFormThunk(formValues, false))
           await updateSyncState(localForms, formValues.FormsInUseId, SyncStates.Synchronized);
            /** Delete form */
            const newForms = filterArray(localForms, formValues.FormsInUseId);
            return newForms;
        } catch (error: any) {
           /** Update counter */
          const currentForm = localForms.find(x => x.formsInUseId == formValues.FormsInUseId);
          if(currentForm) { 
            const newForm = {
              ...currentForm, 
              formState: SyncStates.Error, 
              counter:  currentForm.counter + 1
            }
            const filteredForms = localForms.filter(x => x.formsInUseId != formValues.FormsInUseId);
            filteredForms.push(newForm);
            return(filteredForms);
          }
        }
      }

      const filterArray = (localForms: LocalForm[], formsInUseId : string) => {
        const filteredForms = localForms.filter(x => x.formsInUseId != formsInUseId);
        return(filteredForms);
      }

      const updateSyncState = async (localForms : LocalForm[], formId: string, state: SyncStates) => {
        const formToUpdate = await localForms.find(x => x.formsInUseId == formId);

        if(formToUpdate){
          const newFormState = {...formToUpdate, formState: state};
          const filteredArray = await localForms.filter(x => x.formsInUseId != formId);
          dispatch(setFilledForms([ newFormState, ...filteredArray ]));
        }
      }

      const getSyncState = (formId: string) => {
        const currentForm = syncState.find(x => x.formId == formId);
        if(currentForm) return currentForm.state;
        return null;
      }

  return { isLoading, savedForms, saveForm, getSavedForms, syncFilledForms, getSyncState, syncState }
}
