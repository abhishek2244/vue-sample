import axios, { AxiosResponse } from 'axios';
import FPUtils from '@/utils/FingerprintUtils.ts';
import { EncryptService } from '@/utils/EncryptUtils';
import { url } from '@/constants/AppConst.ts';
import { AuthObj } from '@/maps/AuthMap.ts';

interface CustomObj {
  [key: string]: any
}
class RequestUtils {
  private fp!: string;

  constructor() {
    const FPObj = new FPUtils();
    this.fp = FPObj.getFP;
  }

  public async postRequest(endpoint: string, jsonData: CustomObj, encrypt: boolean = true): Promise<AxiosResponse> {
    const headers: {
      [key: string]: string,
    } = {
      'X-Auth-User' : this.fp,
      'Content-Type' : 'application/json',
    };
    let finalData: object = jsonData;
    const authTag = AuthObj.getData(this.fp);
    
    if (encrypt) {
      finalData = await EncryptService.encryptData(AuthObj.getData('sessionKey'), jsonData);
    }
    if (authTag && jsonData.userAction !== 'getDashboardToken') {
      headers['X-Authentication-Tag'] = authTag;
    }
    return axios({
      method: 'POST',
      url: url + endpoint,
      data: finalData,
      headers,
    });
  }
  
  public getFP(): string {
    return this.fp;
  }
  

}

export const RequestService = new RequestUtils();