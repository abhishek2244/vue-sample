import CryptoJS from 'crypto-js';

class EncryptUtils {
  public encryptData(encryptionKey: string, inputData: object): object {
    return new Promise((resolve, reject)  => {
      try {
        let key = encryptionKey ? this.convertToHex(encryptionKey) : '';
        key = CryptoJS.enc.Hex.parse(key);
        const iv = CryptoJS.lib.WordArray.random(16);
        const padMsg = this.padString(JSON.stringify(inputData));
        const cipherText = CryptoJS.AES.encrypt(padMsg, key, {
          iv,
          mode: CryptoJS.mode.CBC,
        });
        const encryptedData = (cipherText.ciphertext).toString();
        resolve({
          payLoad: iv.toString() + encryptedData,
        });
      } catch (error) {
        console.error(error);
        reject({
          responseCode: 400,
          description: error.message,
        });
      }
    });
  }
  private convertToHex(data: string) {
    let hex = '';
    for (let i = 0; i < data.length; i++) {
      hex += '' + data.charCodeAt(i).toString(16);
    }
    return hex;
  }
  
  private padString(data: string) {
    const paddingChar = ' ';
    const size = 16;
    const x = data.length % size;
    const padLength = size - x;
    for (let i = 0; i < padLength; i++) {
      data += paddingChar;
    }
    return data;
  }
  
}

export const EncryptService = new EncryptUtils();