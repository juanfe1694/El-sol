import * as CryptoJS from 'crypto-js';

/* decrypt the permissions of the user who is logged in */
export const decryptPermissions = (permissions:any)=>{


  var key = CryptoJS.enc.Utf8.parse('ElS0lN3c2022++@@');
  var iv = CryptoJS.enc.Utf8.parse('ElS0lN3c2022++@@');

  const encrypted=(data:any)=>{
    var encryptedData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.toString();
  }

  const decrypted=(data:any)=>{
    var decryptedData = CryptoJS.AES.decrypt(data, key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decryptedData);
  }



    const info = decrypted(permissions);

    return info;
}