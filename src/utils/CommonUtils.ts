import { RequestService } from '@/utils/RequestUtils';
import { AuthObj } from '@/maps/AuthMap';
import RequestHelper from '@/helpers/RequestHelper.ts';

class CommonUtils {
  public setDashboardToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenResponse = await RequestService.postRequest('authNoTag', {
          userAction: 'getDashboardToken',
        }, false);
        const handleRequest = new RequestHelper(tokenResponse);
        AuthObj.setData('sessionKey', handleRequest.getData('sessionKey'));
        resolve(tokenResponse);
      } catch (error) {
        console.error(error);
        reject(error.message);
      }
    });
  }
}

export const CommonServices = new CommonUtils();