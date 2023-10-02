import * as CryptoJS from 'crypto-js';
import * as SecureStore from 'expo-secure-store';
import * as ExpoCrypto from 'expo-crypto';
import { Projects } from '../../interfaces/planner/projects/projectsInterfaces';
import { FormInUse, LocalForm } from '../../interfaces/form';

type Data =  Projects[] | FormInUse[] | LocalForm[];

export const useEncryptDecryptData = () => {

    /** Generate and save key */
    const generateKey = async () => {
      // Key length in bytes
      const keyLengthBytes = 32; // 256 bits
    
      try {
        // Generate random bytes
        const randomBytes = await ExpoCrypto.getRandomBytesAsync(keyLengthBytes);
    
        // Convert random bytes to a hex string
        const keyHex = randomBytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    
        return keyHex;
      } catch (error) {
        console.error('Error generating random key:', error);
        return '';
      }
    };
    
    const saveKeySecureStore = async () => {
        const key = await getSecureKey();
        if(key == null){
            const newKey = await generateKey();
            setSecureKey(newKey);
        }
    }
    

    /**
     * The function `setSecureKey` saves an encryption key securely using the `SecureStore` API in
     * TypeScript.
     * @param {string} key - The `key` parameter is a string that represents the encryption key that
     * you want to save securely.
     */
    const setSecureKey = async(key: string) => {
        try {
          await SecureStore.setItemAsync('secured_key', key);
          ;
        } catch (error) {
          console.error('Error saving encryption key:', error);
        }
      }
    
    
    /**
     * The function `getSecureKey` retrieves a secure key from the device's storage using the
     * `SecureStore` API in TypeScript, and returns the key if it exists, otherwise it returns null.
     * @returns The function `getSecureKey` returns the value of the `secured_key` stored in the
     * SecureStore if it exists, otherwise it returns `null`.
     */
    const getSecureKey = async() => {
        try {
          const key = await SecureStore.getItemAsync('secured_key');
          if (key) { return key } 
          else {  return null }
        } catch (error) {  return null }
      }
    

      const encryptData = async (data: Data) => {
        /** Get secured key */
        const securedKey = await getSecureKey();
      
        /** Convert data to JSON string */
        const jsonData = JSON.stringify(data);
      
        /** Get key */
        const key = CryptoJS.enc.Utf8.parse(securedKey as string);
      
        /** Encrypt data */
        const encryptedData = CryptoJS.AES.encrypt(jsonData, key, {
          keySize: 128 / 8,
          iv: key,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
      
        /** Return encrypted data */
        return encryptedData.toString();
      }

      const decryptData = async (data : string) => {
        
        const securedKey = await getSecureKey();
        const key = CryptoJS.enc.Utf8.parse(securedKey as string);

        const decryptedData = CryptoJS.AES.decrypt(data, key,
        {
          keySize: 128 / 8,
          iv: key,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        const decryptedObjects = decryptedData.toString(CryptoJS.enc.Utf8);
        
        /** Parse JSON and return */
        return JSON.parse(decryptedObjects);
      }
    
    return { saveKeySecureStore, setSecureKey, getSecureKey, encryptData, decryptData }

}