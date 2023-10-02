import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Sharing from 'expo-sharing';
import { QrGeneratorStyles } from './QrGeneratorStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface QrComponentProps {
  url: string;
  formLinkId: string;
}

export const QrComponent = ({ url, formLinkId }: QrComponentProps) => {

  const [qrSvgRef, setqrSvgRef] = useState<any>(null)

  const showToast = (type: string, title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2:  message
    });
  }

  const saveQrToDisk = async () => {
    if (!qrSvgRef) {
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          showToast('error', 'Error', 'Storage access denied');
        return;
        }
  
    const svgData : string = await new Promise((resolve) => {
      qrSvgRef.toDataURL(resolve);
    });
  try{
    const filePath = FileSystem.cacheDirectory + `/${formLinkId}.png`;
    await FileSystem.writeAsStringAsync(filePath, svgData, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    await MediaLibrary.saveToLibraryAsync(filePath);
  
    showToast('success', 'Success', 'Saved to gallery !!');
  }catch(error){
    showToast('error', 'Error', 'Failed to save QR code');
  }
  };

  const shareQRCode = async () => {
    if (!qrSvgRef) {
      return;
    }
  
    const svgData : string = await new Promise((resolve) => {
      qrSvgRef.toDataURL(resolve);
    });
  
    const filePath = FileSystem.cacheDirectory + `/${formLinkId}.png`;
    await FileSystem.writeAsStringAsync(filePath, svgData, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    const localUri = FileSystem.cacheDirectory + `/${formLinkId}.png`;
  
    try {
      await Sharing.shareAsync(localUri);
    } catch (error) {
        showToast('error', 'Error', 'Failed to share QR code');
    }
  };
  

  return (
    <View style={QrGeneratorStyles.mainContainer}>
      <QRCode
          size={RFPercentage(30)}
          value={url}
          getRef={(c) => setqrSvgRef(c)}
      />
      <View style={QrGeneratorStyles.qrButtonsContainer}>
          <TouchableOpacity onPress={saveQrToDisk}>
            <Ionicons name='copy-outline' size={RFPercentage(5)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareQRCode}>
            <Ionicons 
                name='share-social-outline' 
                size={RFPercentage(5)}  />
          </TouchableOpacity>
      </View>
    <Toast />
    </View>
  )
}
