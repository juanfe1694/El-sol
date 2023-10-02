import React, { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Projects } from '../../interfaces/planner/projects/projectsInterfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEncryptDecryptData } from '../auth/useEncryptDecryptData';
import { FormInUse } from '../../interfaces/form';
import { fetchUserProjectsThunk, getFormsInUseByProjectIdThunk } from '../../redux/thunks/connection/connectionThunk';
import { setForms, setProjects, startSinchronizingForms, startSinchronizingProjects, stopSinchronizingForms } from '../../redux/slices/connection/connectionSlice';

export const useCheckConnectionAndSync = () => {

  const [isConnected, setisConnected] = useState(false);
  const { forms, projects, synchronizingForms, synchronizingProjects } = useAppSelector(state => state.connection)

  const dispatch = useAppDispatch();
  const { encryptData, decryptData } = useEncryptDecryptData();

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
  is used to check the connection state and synchronize projects and forms. */
  useEffect(() => {
    
    synchronizeAll();
  }, [])

  const synchronizeAll = () => {
    checkConnectionState().then(state => {
      if (state.isConnected && !synchronizingProjects && !synchronizingForms) {
        getAndSyncProjects();
      } else if (!state.isConnected) {
        getSinchronizedProjects();
      }
    })
  }

  /** Check internet connection */
  const checkConnectionState = async () => {
    const state = await NetInfo.fetch();
    setisConnected(state.isConnected as boolean)
    return state;
  }

  /** Get projects by user */
  const getAndSyncProjects = async () => {

    try {
      /**Call API and set projects in local state */
      const projects = await dispatch(fetchUserProjectsThunk());
      
      dispatch(setProjects(projects));

      /** Encrypt project list and save in Async storage */
      const encryptedProjects = await encryptData(projects);

      await AsyncStorage.setItem('projects', encryptedProjects)

      getAndSyncForms(projects);

    } catch (error) { console.error }
  }

  /** Get forms by project */

  const getAndSyncForms = async (projects: Projects[]) => {

    let formsInUse: FormInUse[] = [];
    try {
      dispatch(startSinchronizingForms());
      /** Map projects and get forms */
      for (const project of projects) {
        const formInUseByProject = await dispatch(getFormsInUseByProjectIdThunk(project.id))
        formsInUse = [...formsInUse, ...formInUseByProject];
      }

      /** Save in Async storage */

      const encryptedForms = await encryptData(formsInUse);

      await AsyncStorage.setItem('formsInUse', encryptedForms);

      dispatch(setForms(formsInUse));

      dispatch(stopSinchronizingForms());
    } catch (error) {
      dispatch(stopSinchronizingForms());
    }
  }

  const getSinchronizedProjects = async () => {
    try {

      dispatch(startSinchronizingProjects());

      const encryptedProjects = await AsyncStorage.getItem('projects') ?? '';

      const decryptedProjects = await decryptData(encryptedProjects);
      

      dispatch(setProjects(decryptedProjects));

      getSinchronizedForms();
    } catch (error: any) { }
  }

  const getSinchronizedForms = async () => {
    
    try {
      dispatch(startSinchronizingForms());

      const encryptedForms = await AsyncStorage.getItem('formsInUse') ?? '';

      const decryptedForms = await decryptData(encryptedForms);

      dispatch(setForms(decryptedForms));

      dispatch(stopSinchronizingForms());
    } catch (error: any) { }
  }

    
    
  return { 
    isConnected, 
    forms, 
    projects, 
    synchronizingForms, 
    synchronizingProjects,
    checkConnectionState,
    getAndSyncProjects,
    getAndSyncForms,
    getSinchronizedProjects,
    getSinchronizedForms,
    synchronizeAll
  }
}
