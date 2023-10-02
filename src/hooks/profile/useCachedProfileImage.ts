import * as FileSystem from 'expo-file-system';
import { useAppSelector } from '../../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCachedProfileImage = () => {

    const { authUserInfo } = useAppSelector(state => state.auth);
    
    const downloadImage = async () => {

        if(authUserInfo?.imageProfilePath){
            const url = authUserInfo?.imageProfilePath;
            const splitPath =  url.split('datacontainer/', 2);
            const image = splitPath[1]?.split('.', 2);
            const timeStamp = new Date().getTime();
            const imageName = image[0] + timeStamp;
            const imageExt = image[1];
            const localUri = `${FileSystem.cacheDirectory}${imageName}.${imageExt}`;
            const { exists, isDirectory } = await FileSystem.getInfoAsync(FileSystem.cacheDirectory as string);

            if (!exists || !isDirectory) {
                await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory as string, { intermediates: true });
            }
            //download the image and save it in cache
            await FileSystem.downloadAsync(url, localUri);
            await AsyncStorage.setItem('userProfileImagePath', localUri);
            return localUri;
        }
    }

    const deleteImage = async (uri: string) => {
        const { exists: fileExists } = await FileSystem.getInfoAsync(uri);
        if (fileExists) {
            //remove image cache and local storage
            await FileSystem.deleteAsync(uri, { idempotent: true });
            await AsyncStorage.removeItem('userProfileImagePath');
          }
    }

  return  { downloadImage, deleteImage } 
};
